jest.mock("../models/estudianteMateria.model.js", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
}));

import { EstudianteMateriaRepository } from "../repositories/estudianteMateria.repository.js";
import EstudianteMateria from "../models/estudianteMateria.model.js";

describe("EstudianteMateriaRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("inscribir", () => {
    it("debería crear un registro de estudianteMateria", async () => {
      const datos = { codigoEstudiante: "E1", codigoMateria: "M1", nota: 5 };
      EstudianteMateria.create.mockResolvedValue(datos);

      const result = await EstudianteMateriaRepository.inscribir(datos);

      expect(EstudianteMateria.create).toHaveBeenCalledWith(datos);
      expect(result).toEqual(datos);
    });
  });

  describe("obtenerPorEstudiante", () => {
    it("debería devolver registros por estudiante", async () => {
      const registros = [{ codigoMateria: "M1" }, { codigoMateria: "M2" }];
      EstudianteMateria.findAll.mockResolvedValue(registros);

      const result = await EstudianteMateriaRepository.obtenerPorEstudiante("E1");

      expect(EstudianteMateria.findAll).toHaveBeenCalledWith({ where: { codigoEstudiante: "E1" } });
      expect(result).toEqual(registros);
    });
  });

  describe("obtenerPorMateria", () => {
    it("debería devolver registros por materia", async () => {
      const registros = [{ codigoEstudiante: "E1" }, { codigoEstudiante: "E2" }];
      EstudianteMateria.findAll.mockResolvedValue(registros);

      const result = await EstudianteMateriaRepository.obtenerPorMateria("M1");

      expect(EstudianteMateria.findAll).toHaveBeenCalledWith({ where: { codigoMateria: "M1" } });
      expect(result).toEqual(registros);
    });
  });

  describe("actualizarNotas", () => {
    it("debería actualizar un registro existente", async () => {
      const registroMock = { update: jest.fn().mockResolvedValue({ nota: 9 }) };
      EstudianteMateria.findOne.mockResolvedValue(registroMock);

      const result = await EstudianteMateriaRepository.actualizarNotas("E1", "M1", { nota: 9 });

      expect(EstudianteMateria.findOne).toHaveBeenCalledWith({ where: { codigoEstudiante: "E1", codigoMateria: "M1" } });
      expect(registroMock.update).toHaveBeenCalledWith({ nota: 9 });
      expect(result).toEqual({ nota: 9 });
    });

    it("debería devolver null si no existe el registro", async () => {
      EstudianteMateria.findOne.mockResolvedValue(null);

      const result = await EstudianteMateriaRepository.actualizarNotas("E1", "M1", { nota: 9 });

      expect(result).toBeNull();
    });
  });

  describe("eliminar", () => {
    it("debería eliminar un registro existente", async () => {
      const registroMock = { destroy: jest.fn().mockResolvedValue(true) };
      EstudianteMateria.findOne.mockResolvedValue(registroMock);

      const result = await EstudianteMateriaRepository.eliminar("E1", "M1");

      expect(EstudianteMateria.findOne).toHaveBeenCalledWith({ where: { codigoEstudiante: "E1", codigoMateria: "M1" } });
      expect(registroMock.destroy).toHaveBeenCalled();
      expect(result).toBe(registroMock);
    });

    it("debería devolver null si no existe el registro", async () => {
      EstudianteMateria.findOne.mockResolvedValue(null);

      const result = await EstudianteMateriaRepository.eliminar("E1", "M1");

      expect(result).toBeNull();
    });
  });
});