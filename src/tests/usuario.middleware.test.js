import { verificarToken } from "../middlewares/usuario.middleware.js";
import jwt from "jsonwebtoken";

// Mock del objeto next
const next = jest.fn();

// Helper para crear res falso
const createResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Middleware verificarToken", () => {
  const payload = { codigo: "1001", rol: "admin" };
  const token = jwt.sign(payload, "open system", { expiresIn: "1h" });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Token válido llama a next y agrega req.usuario", () => {
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = createResponse();

    verificarToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.usuario).toHaveProperty("codigo", "1001");
    expect(req.usuario).toHaveProperty("rol", "admin");
  });

  test("Sin token retorna 401", () => {
    const req = { headers: {} };
    const res = createResponse();

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Token no proporcionado" });
    expect(next).not.toHaveBeenCalled();
  });

  test("Token mal formado retorna 401", () => {
    const req = { headers: { authorization: "Token123" } };
    const res = createResponse();

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: "Token mal formado. Debe ser: Bearer <token>",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("Token inválido retorna 403", () => {
    const req = { headers: { authorization: "Bearer invalidtoken" } };
    const res = createResponse();

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Token inválido." });
    expect(next).not.toHaveBeenCalled();
  });

  test("Token expirado retorna 403 con mensaje de expiración", () => {
    const expiredToken = jwt.sign(payload, "open system", { expiresIn: "-10s" });
    const req = { headers: { authorization: `Bearer ${expiredToken}` } };
    const res = createResponse();

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: "Token expirado. Inicia sesión nuevamente.",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
