// src/tests/estudiante.repository.test.js

// --- Mocks antes de importar el repository ---
jest.mock("../models/estudiante.model.js", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  destroy: jest.fn(),
  belongsTo: jest.fn(), // evita errores de asociaciones
}));

jest.mock("../models/usuario.model.js", () => ({
  findByPk: jest.fn(),
  update: jest.fn(),
}));

import EstudianteRepository from "../repositories/estudiante.repository.js";
import Estudiante from "../models/estudiante.model.js";
import Usuario from "../models/usuario.model.js";

describe("EstudianteRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("crear", () => {
    it("debería crear un estudiante si existe el usuario", async () => {
      const data = {
        usuarioCodigo: "u123",
        identificacion: "1001",
        primerNombre: "Juan",
        primerApellido: "Lerma",
        edad: 15,
        genero: "M",
        fechaNacimiento: "2010-01-01",
        acudiente1: "Padre",
        telefonoAcudiente1: "1234567",
        direccion: "Calle 1",
        barrio: "Centro",
        ciudad: "Cali",
        fechaMatricula: "2025-01-01",
        fechaIngreso: "2025-01-01",
        grado: "10",
        estado: "Activo",
      };

      Usuario.findByPk.mockResolvedValue({ codigo: data.usuarioCodigo });
      Estudiante.create.mockResolvedValue(data);

      const result = await EstudianteRepository.crear(data);

      expect(Usuario.findByPk).toHaveBeenCalledWith(data.usuarioCodigo);
      expect(Estudiante.create).toHaveBeenCalledWith(expect.objectContaining({
        usuarioCodigo: data.usuarioCodigo,
        primerNombre: "Juan",
      }));
      expect(result.success).toBe(true);
      expect(result.data).toEqual(data);
    });

    it("debería devolver error si no existe el usuario", async () => {
      Usuario.findByPk.mockResolvedValue(null);
      const result = await EstudianteRepository.crear({ usuarioCodigo: "x123" });
      expect(result.success).toBe(false);
      expect(result.message).toContain("No existe un usuario con código x123");
    });
  });

  describe("actualizarPorIdentificacion", () => {
    it("debería actualizar estudiante y nombre de usuario", async () => {
      const estudianteMock = {
        identificacion: "1001",
        primerNombre: "Juan",
        primerApellido: "Lerma",
        usuarioCodigo: "u123",
        update: jest.fn().mockResolvedValue(true),
      };
      const usuarioMock = { update: jest.fn().mockResolvedValue(true) };

      Estudiante.findOne.mockResolvedValue(estudianteMock);
      Usuario.findByPk.mockResolvedValue(usuarioMock);

      const result = await EstudianteRepository.actualizarPorIdentificacion("1001", {
        primerNombre: "Carlos",
      });

      expect(estudianteMock.update).toHaveBeenCalled();
      expect(usuarioMock.update).toHaveBeenCalledWith({ nombre: "Carlos Lerma" });
      expect(result.success).toBe(true);
    });

    it("debería devolver error si no encuentra estudiante", async () => {
      Estudiante.findOne.mockResolvedValue(null);
      const result = await EstudianteRepository.actualizarPorIdentificacion("9999", {});
      expect(result.success).toBe(false);
      expect(result.message).toBe("Estudiante no encontrado");
    });
  });

  describe("eliminarPorIdentificacion", () => {
    it("debería eliminar estudiante", async () => {
      const estudianteMock = { destroy: jest.fn().mockResolvedValue(true) };
      Estudiante.findOne.mockResolvedValue(estudianteMock);

      const result = await EstudianteRepository.eliminarPorIdentificacion("1001");

      expect(estudianteMock.destroy).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.message).toBe("Estudiante eliminado correctamente");
    });

    it("debería devolver error si no encuentra estudiante", async () => {
      Estudiante.findOne.mockResolvedValue(null);
      const result = await EstudianteRepository.eliminarPorIdentificacion("9999");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Estudiante no encontrado");
    });
  });

  describe("obtenerTodos", () => {
    it("debería devolver todos los estudiantes", async () => {
      const estudiantesMock = [{ identificacion: "1001" }, { identificacion: "1002" }];
      Estudiante.findAll.mockResolvedValue(estudiantesMock);

      const result = await EstudianteRepository.obtenerTodos();

      expect(Estudiante.findAll).toHaveBeenCalledWith({
        include: [{ model: Usuario, as: "usuario" }],
      });
      expect(result.success).toBe(true);
      expect(result.data).toEqual(estudiantesMock);
    });
  });

  describe("obtenerPorIdentificacion", () => {
    it("debería devolver un estudiante existente", async () => {
      const estudianteMock = { identificacion: "1001" };
      Estudiante.findOne.mockResolvedValue(estudianteMock);

      const result = await EstudianteRepository.obtenerPorIdentificacion("1001");

      expect(result.success).toBe(true);
      expect(result.data).toBe(estudianteMock);
    });

    it("debería devolver error si no encuentra estudiante", async () => {
      Estudiante.findOne.mockResolvedValue(null);
      const result = await EstudianteRepository.obtenerPorIdentificacion("9999");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Estudiante no encontrado");
    });
  });
});