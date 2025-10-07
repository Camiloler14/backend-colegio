// src/tests/estudiante.repository.test.js
import * as EstudianteRepo from "../repositories/estudiante.repository.js";
import Estudiante from "../models/estudiante.model.js";
import Usuario from "../models/usuario.model.js";

// Mock de Sequelize
jest.mock("../models/estudiante.model.js");

describe("Estudiante Repository", () => {
  const estudianteMock = {
    codEstudiante: "E001",
    primerNombre: "Juan",
    primerApellido: "Pérez",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("crearEstudiante llama a Estudiante.create y retorna el estudiante", async () => {
    Estudiante.create.mockResolvedValue(estudianteMock);

    const result = await EstudianteRepo.crearEstudiante(estudianteMock);
    expect(Estudiante.create).toHaveBeenCalledWith(estudianteMock);
    expect(result).toEqual(estudianteMock);
  });

  test("obtenerTodosEstudiantes llama a Estudiante.findAll e incluye usuario", async () => {
    Estudiante.findAll.mockResolvedValue([estudianteMock]);

    const result = await EstudianteRepo.obtenerTodosEstudiantes();
    expect(Estudiante.findAll).toHaveBeenCalledWith({
      include: [
        {
          model: Usuario,
          as: "usuarioAsociado",
          attributes: ["codUsuario", "nombre", "rol"],
        },
      ],
    });
    expect(result).toEqual([estudianteMock]);
  });

  test("obtenerEstudiantePorCodigo llama a Estudiante.findOne e incluye usuario", async () => {
    Estudiante.findOne.mockResolvedValue(estudianteMock);

    const result = await EstudianteRepo.obtenerEstudiantePorCodigo("E001");
    expect(Estudiante.findOne).toHaveBeenCalledWith({
      where: { codEstudiante: "E001" },
      include: [
        {
          model: Usuario,
          as: "usuarioAsociado",
          attributes: ["codUsuario", "nombre", "rol"],
        },
      ],
    });
    expect(result).toEqual(estudianteMock);
  });

  test("actualizarEstudiante llama a Estudiante.update con los datos correctos", async () => {
    Estudiante.update.mockResolvedValue([1]);

    const result = await EstudianteRepo.actualizarEstudiante("E001", { primerNombre: "Pedro" });
    expect(Estudiante.update).toHaveBeenCalledWith(
      { primerNombre: "Pedro" },
      { where: { codEstudiante: "E001" } }
    );
    expect(result).toEqual([1]);
  });

  test("eliminarEstudiante llama a Estudiante.destroy con cod correcto", async () => {
    Estudiante.destroy.mockResolvedValue(1);

    const result = await EstudianteRepo.eliminarEstudiante("E001");
    expect(Estudiante.destroy).toHaveBeenCalledWith({ where: { codEstudiante: "E001" } });
    expect(result).toEqual(1);
  });
});
