import * as docenteService from "../services/docente.service.js";
import * as docenteRepo from "../repositories/docente.repository.js";

describe("Docente Service", () => {
  const docenteMock = {
    codDocente: "D001",
    primerNombre: "Juan",
    primerApellido: "Pérez",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("crearDocenteService debe crear un docente", async () => {
    jest.spyOn(docenteRepo, "crearDocente").mockResolvedValue(docenteMock);

    const result = await docenteService.crearDocenteService(docenteMock);

    expect(docenteRepo.crearDocente).toHaveBeenCalledWith(docenteMock);
    expect(result).toEqual(docenteMock);
  });

  test("obtenerDocentePorCodigoService debe retornar un docente", async () => {
    jest.spyOn(docenteRepo, "obtenerDocentePorCodigo").mockResolvedValue(docenteMock);

    const result = await docenteService.obtenerDocentePorCodigoService("D001");

    expect(docenteRepo.obtenerDocentePorCodigo).toHaveBeenCalledWith("D001");
    expect(result).toEqual(docenteMock);
  });

  test("obtenerTodosDocentesService debe retornar un arreglo de docentes", async () => {
    jest.spyOn(docenteRepo, "obtenerTodosDocentes").mockResolvedValue([docenteMock]);

    const result = await docenteService.obtenerTodosDocentesService();

    expect(docenteRepo.obtenerTodosDocentes).toHaveBeenCalled();
    expect(result).toEqual([docenteMock]);
  });

  test("actualizarDocenteService debe actualizar un docente", async () => {
    const updatedDocente = { ...docenteMock, primerNombre: "Pedro" };
    jest.spyOn(docenteRepo, "actualizarDocente").mockResolvedValue(updatedDocente);

    const result = await docenteService.actualizarDocenteService("D001", { primerNombre: "Pedro" });

    expect(docenteRepo.actualizarDocente).toHaveBeenCalledWith("D001", { primerNombre: "Pedro" });
    expect(result).toEqual(updatedDocente);
  });

  test("eliminarDocenteService debe eliminar un docente", async () => {
    jest.spyOn(docenteRepo, "eliminarDocente").mockResolvedValue(true);

    const result = await docenteService.eliminarDocenteService("D001");

    expect(docenteRepo.eliminarDocente).toHaveBeenCalledWith("D001");
    expect(result).toBe(true);
  });
});
