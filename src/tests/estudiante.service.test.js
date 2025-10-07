import * as estudianteService from "../services/estudiante.service.js";
import * as estudianteRepo from "../repositories/estudiante.repository.js";
import { Usuario, Estudiante } from "../models/asociaciones.js";

jest.mock("../repositories/estudiante.repository.js");
jest.mock("../models/asociaciones.js");

describe("Estudiante Service", () => {
  const estudianteMock = { codEstudiante: "E001", nombre: "Juan" };
  const usuarioMock = { codUsuario: "E001", rol: "estudiante" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Crear estudiante
  test("crearEstudianteService crea un estudiante si el usuario existe y es estudiante", async () => {
    Usuario.findOne.mockResolvedValue(usuarioMock);
    estudianteRepo.crearEstudiante.mockResolvedValue(estudianteMock);

    const result = await estudianteService.crearEstudianteService(estudianteMock);

    expect(Usuario.findOne).toHaveBeenCalledWith({ where: { codUsuario: "E001" } });
    expect(estudianteRepo.crearEstudiante).toHaveBeenCalledWith(estudianteMock);
    expect(result).toEqual(estudianteMock);
  });

  test("crearEstudianteService lanza error si usuario no existe", async () => {
    Usuario.findOne.mockResolvedValue(null);

    await expect(estudianteService.crearEstudianteService(estudianteMock))
      .rejects.toThrow("El usuario no existe. Crea primero el usuario.");
  });

  test("crearEstudianteService lanza error si usuario no es estudiante", async () => {
    Usuario.findOne.mockResolvedValue({ ...usuarioMock, rol: "docente" });

    await expect(estudianteService.crearEstudianteService(estudianteMock))
      .rejects.toThrow("El usuario no tiene rol de estudiante.");
  });

  // Obtener todos los estudiantes
  test("obtenerTodosEstudiantesService devuelve estudiantes con usuario", async () => {
    Estudiante.findAll.mockResolvedValue([estudianteMock]);

    const result = await estudianteService.obtenerTodosEstudiantesService();

    expect(Estudiante.findAll).toHaveBeenCalledWith({ include: [{ model: Usuario, as: "usuario" }] });
    expect(result).toEqual([estudianteMock]);
  });

  // Obtener estudiante por código
  test("obtenerEstudiantePorCodigoService devuelve estudiante si existe", async () => {
    Estudiante.findByPk.mockResolvedValue(estudianteMock);

    const result = await estudianteService.obtenerEstudiantePorCodigoService("E001");

    expect(Estudiante.findByPk).toHaveBeenCalledWith("E001", { include: [{ model: Usuario, as: "usuario" }] });
    expect(result).toEqual(estudianteMock);
  });

  test("obtenerEstudiantePorCodigoService lanza error si no existe", async () => {
    Estudiante.findByPk.mockResolvedValue(null);

    await expect(estudianteService.obtenerEstudiantePorCodigoService("E001"))
      .rejects.toThrow("Estudiante no encontrado");
  });

  // Actualizar estudiante
  test("actualizarEstudianteService actualiza estudiante correctamente", async () => {
    Usuario.findOne.mockResolvedValue(usuarioMock);
    estudianteRepo.actualizarEstudiante.mockResolvedValue([1]); // Sequelize update devuelve [affectedRows]

    const result = await estudianteService.actualizarEstudianteService("E001", { nombre: "Pedro" });

    expect(result).toEqual([1]);
  });

  test("actualizarEstudianteService lanza error si usuario no existe", async () => {
    Usuario.findOne.mockResolvedValue(null);

    await expect(estudianteService.actualizarEstudianteService("E001", { nombre: "Pedro" }))
      .rejects.toThrow("El usuario asignado no existe.");
  });

  test("actualizarEstudianteService lanza error si usuario no es estudiante", async () => {
    Usuario.findOne.mockResolvedValue({ ...usuarioMock, rol: "docente" });

    await expect(estudianteService.actualizarEstudianteService("E001", { nombre: "Pedro" }))
      .rejects.toThrow("El usuario no tiene rol de estudiante.");
  });

  test("actualizarEstudianteService lanza error si estudiante no existe", async () => {
    Usuario.findOne.mockResolvedValue(usuarioMock);
    estudianteRepo.actualizarEstudiante.mockResolvedValue([0]);

    await expect(estudianteService.actualizarEstudianteService("E001", { nombre: "Pedro" }))
      .rejects.toThrow("Estudiante no encontrado.");
  });

  // Eliminar estudiante
  test("eliminarEstudianteService elimina correctamente", async () => {
    estudianteRepo.eliminarEstudiante.mockResolvedValue(true);

    const result = await estudianteService.eliminarEstudianteService("E001");

    expect(result).toBe(true);
  });

  test("eliminarEstudianteService lanza error si estudiante no existe", async () => {
    estudianteRepo.eliminarEstudiante.mockResolvedValue(false);

    await expect(estudianteService.eliminarEstudianteService("E001"))
      .rejects.toThrow("Estudiante no encontrado.");
  });
});
