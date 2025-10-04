jest.mock("../models/usuario.model.js", () => ({
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

import UsuarioRepositorio from "../repositories/usuario.repository.js";
import Usuario from "../models/usuario.model.js";

describe("UsuarioRepositorio", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("buscarPorCodigo", () => {
    it("debería devolver un usuario existente", async () => {
      const usuarioMock = { codigo: "U1", nombre: "Juan" };
      Usuario.findOne.mockResolvedValue(usuarioMock);

      const result = await UsuarioRepositorio.buscarPorCodigo("U1");

      expect(Usuario.findOne).toHaveBeenCalledWith({ where: { codigo: "U1" } });
      expect(result).toEqual(usuarioMock);
    });
  });

  describe("obtenerTodos", () => {
    it("debería devolver todos los usuarios", async () => {
      const usuariosMock = [{ codigo: "U1" }, { codigo: "U2" }];
      Usuario.findAll.mockResolvedValue(usuariosMock);

      const result = await UsuarioRepositorio.obtenerTodos();

      expect(Usuario.findAll).toHaveBeenCalled();
      expect(result).toEqual(usuariosMock);
    });
  });

  describe("crear", () => {
    it("debería crear un usuario", async () => {
      const datos = { codigo: "U1", nombre: "Juan" };
      Usuario.create.mockResolvedValue(datos);

      const result = await UsuarioRepositorio.crear(datos);

      expect(Usuario.create).toHaveBeenCalledWith(datos);
      expect(result).toEqual(datos);
    });
  });

  describe("actualizar", () => {
    it("debería actualizar un usuario existente", async () => {
      Usuario.update.mockResolvedValue([1]); // 1 fila editada
      Usuario.findOne.mockResolvedValue({ codigo: "U1", nombre: "Carlos" });

      const result = await UsuarioRepositorio.actualizar("U1", { nombre: "Carlos" });

      expect(Usuario.update).toHaveBeenCalledWith({ nombre: "Carlos" }, { where: { codigo: "U1" } });
      expect(result).toEqual({ codigo: "U1", nombre: "Carlos" });
    });

    it("debería lanzar error si no encuentra usuario", async () => {
      Usuario.update.mockResolvedValue([0]); // ninguna fila editada

      await expect(
        UsuarioRepositorio.actualizar("U999", { nombre: "Carlos" })
      ).rejects.toThrow("Usuario no encontrado");
    });
  });

  describe("eliminar", () => {
    it("debería eliminar un usuario existente", async () => {
      Usuario.destroy.mockResolvedValue(1);

      const result = await UsuarioRepositorio.eliminar("U1");

      expect(Usuario.destroy).toHaveBeenCalledWith({ where: { codigo: "U1" } });
      expect(result).toBe(true);
    });

    it("debería lanzar error si no encuentra usuario", async () => {
      Usuario.destroy.mockResolvedValue(0);

      await expect(UsuarioRepositorio.eliminar("U999")).rejects.toThrow("Usuario no encontrado");
    });
  });
});