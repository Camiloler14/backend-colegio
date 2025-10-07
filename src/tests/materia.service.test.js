import MateriaService from "../services/materia.service.js";
import MateriaRepository from "../repositories/materia.repository.js";

jest.mock("../repositories/materia.repository.js");

describe("MateriaService", () => {
  const materiaMock = { codigoMateria: "M001", nombre: "Matemáticas" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("crearMateria crea una materia si no existe", async () => {
    MateriaRepository.obtenerMateriaPorCodigo.mockResolvedValue(null);
    MateriaRepository.crearMateria.mockResolvedValue(materiaMock);

    const result = await MateriaService.crearMateria(materiaMock);

    expect(MateriaRepository.obtenerMateriaPorCodigo).toHaveBeenCalledWith("M001");
    expect(MateriaRepository.crearMateria).toHaveBeenCalledWith(materiaMock);
    expect(result).toEqual(materiaMock);
  });

  test("crearMateria lanza error si la materia ya existe", async () => {
    MateriaRepository.obtenerMateriaPorCodigo.mockResolvedValue(materiaMock);

    await expect(MateriaService.crearMateria(materiaMock))
      .rejects
      .toThrow("La materia ya existe");
  });

  test("obtenerMaterias devuelve todas las materias", async () => {
    MateriaRepository.obtenerMaterias.mockResolvedValue([materiaMock]);

    const result = await MateriaService.obtenerMaterias();

    expect(MateriaRepository.obtenerMaterias).toHaveBeenCalled();
    expect(result).toEqual([materiaMock]);
  });

  test("obtenerMateriaPorCodigo devuelve la materia si existe", async () => {
    MateriaRepository.obtenerMateriaPorCodigo.mockResolvedValue(materiaMock);

    const result = await MateriaService.obtenerMateriaPorCodigo("M001");

    expect(MateriaRepository.obtenerMateriaPorCodigo).toHaveBeenCalledWith("M001");
    expect(result).toEqual(materiaMock);
  });

  test("obtenerMateriaPorCodigo lanza error si no existe", async () => {
    MateriaRepository.obtenerMateriaPorCodigo.mockResolvedValue(null);

    await expect(MateriaService.obtenerMateriaPorCodigo("M001"))
      .rejects
      .toThrow("Materia no encontrada");
  });

  test("actualizarMateria actualiza la materia si existe", async () => {
    MateriaRepository.obtenerMateriaPorCodigo.mockResolvedValue(materiaMock);
    MateriaRepository.actualizarMateria.mockResolvedValue([1]);

    const result = await MateriaService.actualizarMateria("M001", { nombre: "Fisica" });

    expect(MateriaRepository.actualizarMateria).toHaveBeenCalledWith("M001", { nombre: "Fisica" });
    expect(result).toEqual({ mensaje: "Materia actualizada correctamente" });
  });

  test("actualizarMateria lanza error si no existe", async () => {
    MateriaRepository.obtenerMateriaPorCodigo.mockResolvedValue(null);

    await expect(MateriaService.actualizarMateria("M001", {}))
      .rejects
      .toThrow("Materia no encontrada");
  });

  test("eliminarMateria elimina la materia si existe", async () => {
    MateriaRepository.obtenerMateriaPorCodigo.mockResolvedValue(materiaMock);
    MateriaRepository.eliminarMateria.mockResolvedValue(1);

    const result = await MateriaService.eliminarMateria("M001");

    expect(MateriaRepository.eliminarMateria).toHaveBeenCalledWith("M001");
    expect(result).toEqual({ mensaje: "Materia eliminada correctamente" });
  });

  test("eliminarMateria lanza error si no existe", async () => {
    MateriaRepository.obtenerMateriaPorCodigo.mockResolvedValue(null);

    await expect(MateriaService.eliminarMateria("M001"))
      .rejects
      .toThrow("Materia no encontrada");
  });
});
