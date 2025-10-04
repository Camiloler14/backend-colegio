// src/tests/usuario.service.test.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UsuarioService from "../services/usuario.service.js";
import UsuarioRepositorio from "../repositories/usuario.repository.js";

jest.mock("../repositories/usuario.repository.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("UsuarioService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    test("debe retornar token si usuario y contraseña son correctos", async () => {
      const mockUsuario = { codigo: "1001", nombre: "Juan", rol: "admin", contraseña: "hashed" };
      UsuarioRepositorio.buscarPorCodigo.mockResolvedValue(mockUsuario);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token123");

      const res = await UsuarioService.login("1001", "12345");

      expect(UsuarioRepositorio.buscarPorCodigo).toHaveBeenCalledWith("1001");
      expect(bcrypt.compare).toHaveBeenCalledWith("12345", "hashed");
      expect(jwt.sign).toHaveBeenCalledWith(
        { codigo: "1001", nombre: "Juan", rol: "admin" },
        expect.any(String),
        { expiresIn: "1h" }
      );
      expect(res).toEqual({ token: "token123", rol: "admin", nombre: "Juan" });
    });

    test("lanza error si el usuario no existe", async () => {
      UsuarioRepositorio.buscarPorCodigo.mockResolvedValue(null);

      await expect(UsuarioService.login("9999", "12345")).rejects.toEqual({
        status: 404,
        message: "El usuario no se encuentra registrado."
      });
    });

    test("lanza error si la contraseña es incorrecta", async () => {
      const mockUsuario = { codigo: "1001", nombre: "Juan", rol: "admin", contraseña: "hashed" };
      UsuarioRepositorio.buscarPorCodigo.mockResolvedValue(mockUsuario);
      bcrypt.compare.mockResolvedValue(false);

      await expect(UsuarioService.login("1001", "wrongpass")).rejects.toEqual({
        status: 401,
        message: "La contraseña ingresada es incorrecta."
      });
    });
  });

  describe("crearUsuario", () => {
    test("debe crear usuario con contraseña hasheada", async () => {
      const datos = { codigo: "1002", nombre: "Ana", contraseña: "12345", rol: "estudiante" };
      bcrypt.hash.mockResolvedValue("hashed12345");
      UsuarioRepositorio.crear.mockResolvedValue({ ...datos, contraseña: "hashed12345" });

      const res = await UsuarioService.crearUsuario(datos);

      expect(bcrypt.hash).toHaveBeenCalledWith("12345", 10);
      expect(UsuarioRepositorio.crear).toHaveBeenCalledWith({ ...datos, contraseña: "hashed12345" });
      expect(res.contraseña).toBe("hashed12345");
    });
  });

  describe("obtenerUsuarios", () => {
    test("debe llamar a obtenerTodos del repositorio", async () => {
      const usuarios = [{ codigo: "1001" }, { codigo: "1002" }];
      UsuarioRepositorio.obtenerTodos.mockResolvedValue(usuarios);

      const res = await UsuarioService.obtenerUsuarios();

      expect(UsuarioRepositorio.obtenerTodos).toHaveBeenCalled();
      expect(res).toEqual(usuarios);
    });
  });

  describe("actualizarUsuario", () => {
    test("debe actualizar usuario y hashear contraseña si se proporciona", async () => {
      const datos = { nombre: "Ana", contraseña: "newpass" };
      bcrypt.hash.mockResolvedValue("hashedNewPass");
      UsuarioRepositorio.actualizar.mockResolvedValue({ ...datos, contraseña: "hashedNewPass" });

      const res = await UsuarioService.actualizarUsuario("1002", datos);

      expect(bcrypt.hash).toHaveBeenCalledWith("newpass", 10);
      expect(UsuarioRepositorio.actualizar).toHaveBeenCalledWith("1002", { ...datos, contraseña: "hashedNewPass" });
      expect(res.contraseña).toBe("hashedNewPass");
    });
  });

  describe("eliminarUsuario", () => {
    test("debe llamar a eliminar del repositorio", async () => {
      UsuarioRepositorio.eliminar.mockResolvedValue(true);

      const res = await UsuarioService.eliminarUsuario("1002");

      expect(UsuarioRepositorio.eliminar).toHaveBeenCalledWith("1002");
      expect(res).toBe(true);
    });
  });
});