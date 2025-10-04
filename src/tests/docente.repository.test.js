jest.mock("../models/docente.model.js", () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    belongsTo: jest.fn(), // evita que Sequelize haga asociaciones reales
  };
});

jest.mock("../models/usuario.model.js", () => ({
  create: jest.fn(),
  findByPk: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

import DocenteRepository from "../repositories/docente.repository.js";
import Docente from "../models/docente.model.js";
import Usuario from "../models/usuario.model.js";
import bcrypt from "bcrypt";

describe("DocenteRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("crearDocente", () => {
    it("debería crear un docente y usuario correctamente", async () => {
      const datos = {
        codigo: "123",
        primerNombre: "Juan",
        primerApellido: "Lerma",
        contraseña: "pass123",
        barrio: "Centro",
        ciudad: "Cali",
        documento: "1001",
      };

      bcrypt.hash.mockResolvedValue("hashedPass");
      Usuario.create.mockResolvedValue({ codigo: datos.codigo });
      Docente.create.mockResolvedValue({ ...datos });

      const result = await DocenteRepository.crearDocente(datos);

      expect(bcrypt.hash).toHaveBeenCalledWith("pass123", 10);
      expect(Usuario.create).toHaveBeenCalledWith({
        codigo: datos.codigo,
        nombre: "Juan Lerma",
        contraseña: "hashedPass",
        rol: "docente",
        barrio: "Centro",
        ciudad: "Cali",
      });
      expect(Docente.create).toHaveBeenCalledWith({
        ...datos,
        codigo: datos.codigo,
      });
      expect(result).toEqual({ success: true, data: { ...datos } });
    });

    it("debería manejar errores al crear docente", async () => {
      const datos = { codigo: "123" };
      Usuario.create.mockRejectedValue(new Error("Error DB"));

      const result = await DocenteRepository.crearDocente(datos);

      expect(result.success).toBe(false);
      expect(result.message).toContain("Error creando docente");
    });
  });

  describe("obtenerDocentes", () => {
    it("debería devolver una lista de docentes", async () => {
      const docentesMock = [{ documento: "1001" }, { documento: "1002" }];
      Docente.findAll.mockResolvedValue(docentesMock);

      const result = await DocenteRepository.obtenerDocentes();

      expect(Docente.findAll).toHaveBeenCalledWith({ attributes: { exclude: ["id"] } });
      expect(result).toEqual({ success: true, data: docentesMock });
    });

    it("debería manejar errores al obtener docentes", async () => {
      Docente.findAll.mockRejectedValue(new Error("DB error"));

      const result = await DocenteRepository.obtenerDocentes();

      expect(result.success).toBe(false);
      expect(result.message).toContain("Error obteniendo docentes");
    });
  });

  describe("obtenerDocentePorDocumento", () => {
    it("debería devolver un docente existente", async () => {
      const docenteMock = { documento: "1001" };
      Docente.findOne.mockResolvedValue(docenteMock);

      const result = await DocenteRepository.obtenerDocentePorDocumento("1001");

      expect(Docente.findOne).toHaveBeenCalledWith({
        where: { documento: "1001" },
        attributes: { exclude: ["id"] },
      });
      expect(result).toEqual({ success: true, data: docenteMock });
    });

    it("debería devolver mensaje si no existe", async () => {
      Docente.findOne.mockResolvedValue(null);

      const result = await DocenteRepository.obtenerDocentePorDocumento("9999");

      expect(result.success).toBe(false);
      expect(result.message).toBe("Docente no encontrado");
    });
  });

  describe("actualizarDocente", () => {
    it("debería actualizar docente y usuario", async () => {
      const docenteMock = {
        documento: "1001",
        primerNombre: "Juan",
        primerApellido: "Lerma",
        update: jest.fn().mockResolvedValue(true),
        codigo: "123",
      };
      const usuarioMock = {
        update: jest.fn().mockResolvedValue(true),
      };

      Docente.findOne.mockResolvedValue(docenteMock);
      Usuario.findByPk.mockResolvedValue(usuarioMock);
      bcrypt.hash.mockResolvedValue("hashedNew");

      const datos = { primerNombre: "Carlos", contraseña: "newPass" };
      const result = await DocenteRepository.actualizarDocente("1001", datos);

      expect(docenteMock.update).toHaveBeenCalledWith(datos);
      expect(usuarioMock.update).toHaveBeenCalledWith({
        nombre: "Carlos Lerma",
        contraseña: "hashedNew",
      });
      expect(result.success).toBe(true);
      expect(result.data).toBe(docenteMock);
    });

    it("debería devolver mensaje si no encuentra docente", async () => {
      Docente.findOne.mockResolvedValue(null);
      const result = await DocenteRepository.actualizarDocente("999", {});
      expect(result.success).toBe(false);
      expect(result.message).toBe("Docente no encontrado");
    });
  });

  describe("eliminarDocente", () => {
    it("debería eliminar docente y usuario", async () => {
      const docenteMock = { documento: "1001", codigo: "123", destroy: jest.fn() };
      const usuarioMock = { destroy: jest.fn() };

      Docente.findOne.mockResolvedValue(docenteMock);
      Usuario.findByPk.mockResolvedValue(usuarioMock);

      const result = await DocenteRepository.eliminarDocente("1001");

      expect(usuarioMock.destroy).toHaveBeenCalled();
      expect(docenteMock.destroy).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.message).toBe("Docente eliminado correctamente");
    });

    it("debería devolver mensaje si no encuentra docente", async () => {
      Docente.findOne.mockResolvedValue(null);

      const result = await DocenteRepository.eliminarDocente("999");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Docente no encontrado");
    });
  });
});