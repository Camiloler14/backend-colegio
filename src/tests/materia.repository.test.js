// src/tests/materia.repository.test.js

// --- Mocks antes de importar el repository ---
jest.mock("../models/materia.model.js", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));

import { MateriaRepository } from "../repositories/materia.repository.js";
import Materia from "../models/materia.model.js";

describe("MateriaRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("crear", () => {
    it("debería crear una materia", async () => {
      const datos = { nombre: "Matemáticas" };
      Materia.create.mockResolvedValue(datos);

      const result = await MateriaRepository.crear(datos);

      expect(Materia.create).toHaveBeenCalledWith(datos);
      expect(result).toEqual(datos);
    });
  });

  describe("obtenerTodas", () => {
    it("debería devolver todas las materias", async () => {
      const materiasMock = [{ id: 1, nombre: "Matemáticas" }, { id: 2, nombre: "Física" }];
      Materia.findAll.mockResolvedValue(materiasMock);

      const result = await MateriaRepository.obtenerTodas();

      expect(Materia.findAll).toHaveBeenCalled();
      expect(result).toEqual(materiasMock);
    });
  });

  describe("obtenerPorId", () => {
    it("debería devolver una materia existente", async () => {
      const materiaMock = { id: 1, nombre: "Matemáticas" };
      Materia.findByPk.mockResolvedValue(materiaMock);

      const result = await MateriaRepository.obtenerPorId(1);

      expect(Materia.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(materiaMock);
    });

    it("debería devolver null si no existe la materia", async () => {
      Materia.findByPk.mockResolvedValue(null);

      const result = await MateriaRepository.obtenerPorId(999);

      expect(result).toBeNull();
    });
  });

  describe("actualizar", () => {
    it("debería actualizar una materia existente", async () => {
      const materiaMock = { update: jest.fn().mockResolvedValue({ nombre: "Física" }) };
      Materia.findByPk.mockResolvedValue(materiaMock);

      const result = await MateriaRepository.actualizar(1, { nombre: "Física" });

      expect(Materia.findByPk).toHaveBeenCalledWith(1);
      expect(materiaMock.update).toHaveBeenCalledWith({ nombre: "Física" });
      expect(result).toEqual({ nombre: "Física" });
    });

    it("debería devolver null si no existe la materia", async () => {
      Materia.findByPk.mockResolvedValue(null);

      const result = await MateriaRepository.actualizar(999, { nombre: "Física" });

      expect(result).toBeNull();
    });
  });

  describe("eliminar", () => {
    it("debería eliminar una materia existente", async () => {
      const materiaMock = { destroy: jest.fn().mockResolvedValue(true) };
      Materia.findByPk.mockResolvedValue(materiaMock);

      const result = await MateriaRepository.eliminar(1);

      expect(Materia.findByPk).toHaveBeenCalledWith(1);
      expect(materiaMock.destroy).toHaveBeenCalled();
      expect(result).toBe(materiaMock);
    });

    it("debería devolver null si no existe la materia", async () => {
      Materia.findByPk.mockResolvedValue(null);

      const result = await MateriaRepository.eliminar(999);

      expect(result).toBeNull();
    });
  });
});