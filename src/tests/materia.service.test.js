import { MateriaService } from "../services/materia.service.js";
import { MateriaRepository } from "../repositories/materia.repository.js";

jest.mock("../repositories/materia.repository.js");

describe("MateriaService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("crearMateria llama a MateriaRepository.crear", async () => {
    const datos = { nombre: "Matemáticas" };
    MateriaRepository.crear.mockResolvedValue({ id: 1, ...datos });

    const res = await MateriaService.crearMateria(datos);

    expect(MateriaRepository.crear).toHaveBeenCalledWith(datos);
    expect(res).toEqual({ id: 1, ...datos });
  });

  test("listarMaterias llama a MateriaRepository.obtenerTodas", async () => {
    const materiasMock = [{ id: 1, nombre: "Matemáticas" }];
    MateriaRepository.obtenerTodas.mockResolvedValue(materiasMock);

    const res = await MateriaService.listarMaterias();

    expect(MateriaRepository.obtenerTodas).toHaveBeenCalled();
    expect(res).toEqual(materiasMock);
  });

  test("obtenerMateria llama a MateriaRepository.obtenerPorId", async () => {
    const materiaMock = { id: 1, nombre: "Matemáticas" };
    MateriaRepository.obtenerPorId.mockResolvedValue(materiaMock);

    const res = await MateriaService.obtenerMateria(1);

    expect(MateriaRepository.obtenerPorId).toHaveBeenCalledWith(1);
    expect(res).toEqual(materiaMock);
  });

  test("actualizarMateria llama a MateriaRepository.actualizar", async () => {
    const datos = { nombre: "Física" };
    const updatedMock = { id: 1, nombre: "Física" };
    MateriaRepository.actualizar.mockResolvedValue(updatedMock);

    const res = await MateriaService.actualizarMateria(1, datos);

    expect(MateriaRepository.actualizar).toHaveBeenCalledWith(1, datos);
    expect(res).toEqual(updatedMock);
  });

  test("eliminarMateria llama a MateriaRepository.eliminar", async () => {
    MateriaRepository.eliminar.mockResolvedValue(true);

    const res = await MateriaService.eliminarMateria(1);

    expect(MateriaRepository.eliminar).toHaveBeenCalledWith(1);
    expect(res).toBe(true);
  });
});