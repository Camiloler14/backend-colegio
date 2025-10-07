import { EstudianteMateriaRepository } from "../repositories/estudianteMateria.repository.js";
import EstudianteMateria from "../models/estudianteMateria.model.js";

jest.mock("../models/estudianteMateria.model.js");

describe("EstudianteMateriaRepository", () => {
  const registroMock = {
    codigoEstudiante: 1,
    codigoMateria: 101,
    notaPeriodo1: 4.5,
    notaPeriodo2: 5.0,
    update: jest.fn().mockResolvedValue(true),
    destroy: jest.fn().mockResolvedValue(true),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("inscribir crea un registro", async () => {
    EstudianteMateria.create.mockResolvedValue(registroMock);

    const result = await EstudianteMateriaRepository.inscribir({
      codigoEstudiante: 1,
      codigoMateria: 101,
    });

    expect(EstudianteMateria.create).toHaveBeenCalledWith({
      codigoEstudiante: 1,
      codigoMateria: 101,
    });
    expect(result).toEqual(registroMock);
  });

  test("obtenerPorEstudiante retorna registros filtrados por estudiante", async () => {
    EstudianteMateria.findAll.mockResolvedValue([registroMock]);

    const result = await EstudianteMateriaRepository.obtenerPorEstudiante(1);
    expect(EstudianteMateria.findAll).toHaveBeenCalledWith({ where: { codigoEstudiante: 1 } });
    expect(result).toEqual([registroMock]);
  });

  test("obtenerPorMateria retorna registros filtrados por materia", async () => {
    EstudianteMateria.findAll.mockResolvedValue([registroMock]);

    const result = await EstudianteMateriaRepository.obtenerPorMateria(101);
    expect(EstudianteMateria.findAll).toHaveBeenCalledWith({ where: { codigoMateria: 101 } });
    expect(result).toEqual([registroMock]);
  });

  test("actualizarNotas actualiza un registro existente", async () => {
    EstudianteMateria.findOne.mockResolvedValue(registroMock);

    const datos = { notaPeriodo1: 5.0 };
    const result = await EstudianteMateriaRepository.actualizarNotas(1, 101, datos);

    expect(EstudianteMateria.findOne).toHaveBeenCalledWith({ where: { codigoEstudiante: 1, codigoMateria: 101 } });
    expect(registroMock.update).toHaveBeenCalledWith(datos);
    expect(result).toBe(true);
  });

  test("actualizarNotas retorna null si no existe registro", async () => {
    EstudianteMateria.findOne.mockResolvedValue(null);

    const result = await EstudianteMateriaRepository.actualizarNotas(1, 101, { notaPeriodo1: 5 });
    expect(result).toBeNull();
  });

  test("eliminar destruye un registro existente", async () => {
    EstudianteMateria.findOne.mockResolvedValue(registroMock);

    const result = await EstudianteMateriaRepository.eliminar(1, 101);

    expect(EstudianteMateria.findOne).toHaveBeenCalledWith({ where: { codigoEstudiante: 1, codigoMateria: 101 } });
    expect(registroMock.destroy).toHaveBeenCalled();
    expect(result).toEqual(registroMock);
  });

  test("eliminar retorna null si no existe registro", async () => {
    EstudianteMateria.findOne.mockResolvedValue(null);

    const result = await EstudianteMateriaRepository.eliminar(1, 101);
    expect(result).toBeNull();
  });
});