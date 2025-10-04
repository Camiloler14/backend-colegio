import {
  crearDocenteServicio,
  obtenerDocentesServicio,
  obtenerDocentePorDocumentoServicio,
  actualizarDocenteServicio,
  eliminarDocenteServicio,
} from "../services/docente.service.js";

import { DocenteRepository } from "../repositories/docente.repository.js";

describe("DocenteServicio", () => {
  const mockDatos = { nombre: "Juan", documento: "12345" };

  beforeEach(() => {
    jest.restoreAllMocks(); // resetea todos los mocks antes de cada test
  });

  test("crearDocenteServicio llama a crearDocente", async () => {
    const spy = jest
      .spyOn(DocenteRepository.prototype, "crearDocente")
      .mockResolvedValue(mockDatos);

    const res = await crearDocenteServicio(mockDatos);

    expect(spy).toHaveBeenCalledWith(mockDatos);
    expect(res).toEqual(mockDatos);
  });

  test("obtenerDocentesServicio llama a obtenerDocentes", async () => {
    const spy = jest
      .spyOn(DocenteRepository.prototype, "obtenerDocentes")
      .mockResolvedValue([mockDatos]);

    const res = await obtenerDocentesServicio();

    expect(spy).toHaveBeenCalled();
    expect(res).toEqual([mockDatos]);
  });

  test("obtenerDocentePorDocumentoServicio llama a obtenerDocentePorDocumento", async () => {
    const spy = jest
      .spyOn(DocenteRepository.prototype, "obtenerDocentePorDocumento")
      .mockResolvedValue(mockDatos);

    const res = await obtenerDocentePorDocumentoServicio("12345");

    expect(spy).toHaveBeenCalledWith("12345");
    expect(res).toEqual(mockDatos);
  });

  test("actualizarDocenteServicio llama a actualizarDocente", async () => {
    const spy = jest
      .spyOn(DocenteRepository.prototype, "actualizarDocente")
      .mockResolvedValue(mockDatos);

    const res = await actualizarDocenteServicio("12345", mockDatos);

    expect(spy).toHaveBeenCalledWith("12345", mockDatos);
    expect(res).toEqual(mockDatos);
  });

  test("eliminarDocenteServicio llama a eliminarDocente", async () => {
    const spy = jest
      .spyOn(DocenteRepository.prototype, "eliminarDocente")
      .mockResolvedValue(true);

    const res = await eliminarDocenteServicio("12345");

    expect(spy).toHaveBeenCalledWith("12345");
    expect(res).toBe(true);
  });
});
