import { verificarToken } from "../middlewares/verificarToken";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("Middleware verificarToken", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("debe devolver 401 si no hay token", () => {
    verificarToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Token no proporcionado" });
  });

  it("debe devolver 401 si el token está mal formado", () => {
    req.headers.authorization = "BearerMalFormato";
    verificarToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: "Token mal formado. Debe ser: Bearer <token>",
    });
  });

  it("debe llamar a next si el token es válido", () => {
    req.headers.authorization = "Bearer valido123";
    jwt.verify.mockReturnValue({ id: 1, nombre: "Juan" });

    verificarToken(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("valido123", "open system");
    expect(req.usuario).toEqual({ id: 1, nombre: "Juan" });
    expect(next).toHaveBeenCalled();
  });

  it("debe devolver 403 si el token está expirado", () => {
    req.headers.authorization = "Bearer expirado123";
    jwt.verify.mockImplementation(() => {
      const error = new Error("Token expired");
      error.name = "TokenExpiredError";
      throw error;
    });

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: "Token expirado. Inicia sesión nuevamente.",
    });
  });

  it("debe devolver 403 si el token es inválido", () => {
    req.headers.authorization = "Bearer invalido123";
    jwt.verify.mockImplementation(() => {
      throw new Error("Token inválido");
    });

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Token inválido." });
  });
});
