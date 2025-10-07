import * as usuarioController from "../controllers/usuario.controller.js";
import * as usuarioService from "../services/usuario.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("usuario.controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("crearUsuario - éxito", async () => {
    req.body = { codUsuario: "1", nombre: "Camilo" };
    const usuarioMock = { codUsuario: "1", nombre: "Camilo" };
    jest.spyOn(usuarioService, "crearUsuarioService").mockResolvedValue(usuarioMock);

    await usuarioController.crearUsuario(req, res);

    expect(usuarioService.crearUsuarioService).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(usuarioMock);
  });

  it("crearUsuario - error", async () => {
    req.body = { codUsuario: "1" };
    const error = new Error("Error creación");
    jest.spyOn(usuarioService, "crearUsuarioService").mockRejectedValue(error);

    await usuarioController.crearUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("obtenerUsuarioPorCodigo - éxito", async () => {
    req.params = { codUsuario: "1" };
    const usuarioMock = { codUsuario: "1", nombre: "Camilo" };
    jest.spyOn(usuarioService, "obtenerUsuarioPorCodigoService").mockResolvedValue(usuarioMock);

    await usuarioController.obtenerUsuarioPorCodigo(req, res);

    expect(usuarioService.obtenerUsuarioPorCodigoService).toHaveBeenCalledWith("1");
    expect(res.json).toHaveBeenCalledWith(usuarioMock);
  });

  it("obtenerUsuarioPorCodigo - no encontrado", async () => {
    req.params = { codUsuario: "1" };
    jest.spyOn(usuarioService, "obtenerUsuarioPorCodigoService").mockResolvedValue(null);

    await usuarioController.obtenerUsuarioPorCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuario no encontrado" });
  });

  it("obtenerUsuarioPorCodigo - error", async () => {
    req.params = { codUsuario: "1" }; 
    const error = new Error("Error interno");
    jest.spyOn(usuarioService, "obtenerUsuarioPorCodigoService").mockRejectedValue(error);

    await usuarioController.obtenerUsuarioPorCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("obtenerTodosUsuarios - éxito", async () => {
    const usuariosMock = [{ codUsuario: "1", nombre: "Camilo" }];
    jest.spyOn(usuarioService, "obtenerTodosUsuariosService").mockResolvedValue(usuariosMock);

    await usuarioController.obtenerTodosUsuarios(req, res);

    expect(res.json).toHaveBeenCalledWith(usuariosMock);
  });

  it("obtenerTodosUsuarios - error", async () => {
    const error = new Error("Error interno");
    jest.spyOn(usuarioService, "obtenerTodosUsuariosService").mockRejectedValue(error);

    await usuarioController.obtenerTodosUsuarios(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("actualizarUsuario - éxito", async () => {
    req.params = { codUsuario: "1" };
    req.body = { nombre: "Nuevo nombre" };
    jest.spyOn(usuarioService, "actualizarUsuarioService").mockResolvedValue([1]);

    await usuarioController.actualizarUsuario(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "Usuario actualizado correctamente" });
  });

  it("actualizarUsuario - no encontrado", async () => {
    req.params = { codUsuario: "1" };
    req.body = { nombre: "Nuevo nombre" };
    jest.spyOn(usuarioService, "actualizarUsuarioService").mockResolvedValue([0]);

    await usuarioController.actualizarUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuario no encontrado" });
  });

  it("actualizarUsuario - error", async () => {
    req.params = { codUsuario: "1" }; 
    req.body = { nombre: "Nuevo nombre" };
    const error = new Error("Error actualización");
    jest.spyOn(usuarioService, "actualizarUsuarioService").mockRejectedValue(error);

    await usuarioController.actualizarUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("eliminarUsuario - éxito", async () => {
    req.params = { codUsuario: "1" };
    jest.spyOn(usuarioService, "eliminarUsuarioService").mockResolvedValue(true);

    await usuarioController.eliminarUsuario(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "Usuario eliminado correctamente" });
  });

  it("eliminarUsuario - no encontrado", async () => {
    req.params = { codUsuario: "1" };
    jest.spyOn(usuarioService, "eliminarUsuarioService").mockResolvedValue(false);

    await usuarioController.eliminarUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuario no encontrado" });
  });

  it("eliminarUsuario - error", async () => {
    req.params = { codUsuario: "1" }; 
    const error = new Error("Error eliminación");
    jest.spyOn(usuarioService, "eliminarUsuarioService").mockRejectedValue(error);

    await usuarioController.eliminarUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("loginUsuario - éxito", async () => {
    req.body = { codUsuario: "1", contraseña: "12345" };
    const usuarioMock = { codUsuario: "1", contraseña: "hash", rol: "admin" };
    jest.spyOn(usuarioService, "obtenerUsuarioPorCodigoService").mockResolvedValue(usuarioMock);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("token_mock");

    await usuarioController.loginUsuario(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith("12345", "hash");
    expect(jwt.sign).toHaveBeenCalledWith({ codUsuario: "1", rol: "admin" }, expect.any(String), { expiresIn: "2h" });
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Login exitoso", token: "token_mock" });
  });

  it("loginUsuario - usuario no encontrado", async () => {
    req.body = { codUsuario: "1", contraseña: "12345" };
    jest.spyOn(usuarioService, "obtenerUsuarioPorCodigoService").mockResolvedValue(null);

    await usuarioController.loginUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Usuario no encontrado" });
  });

  it("loginUsuario - contraseña incorrecta", async () => {
    req.body = { codUsuario: "1", contraseña: "12345" };
    const usuarioMock = { codUsuario: "1", contraseña: "hash", rol: "admin" };
    jest.spyOn(usuarioService, "obtenerUsuarioPorCodigoService").mockResolvedValue(usuarioMock);
    bcrypt.compare.mockResolvedValue(false);

    await usuarioController.loginUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Contraseña incorrecta" });
  });

  it("loginUsuario - error interno", async () => {
    req.body = { codUsuario: "1", contraseña: "12345" };
    const error = new Error("Error interno");
    jest.spyOn(usuarioService, "obtenerUsuarioPorCodigoService").mockRejectedValue(error);

    await usuarioController.loginUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Error interno del servidor" });
  });
});
