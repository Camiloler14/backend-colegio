import { EstudianteMateriaService } from "../services/estudianteMateria.service.js";
import { EstudianteMateriaRepository } from "../repositories/estudianteMateria.repository.js";

jest.mock("../repositories/estudianteMateria.repository.js");

describe("EstudianteMateriaService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("inscribirEstudiante llama a EstudianteMateriaRepository.inscribir", async () => {
    const datos = { codigoEstudiante: "1001", codigoMateria: "MAT01" };
    EstudianteMateriaRepository.inscribir.mockResolvedValue(datos);

    const res = await EstudianteMateriaService.inscribirEstudiante(datos);

    expect(EstudianteMateriaRepository.inscribir).toHaveBeenCalledWith(datos);
    expect(res).toEqual(datos);
  });

  test("obtenerMateriasDeEstudiante llama a EstudianteMateriaRepository.obtenerPorEstudiante", async () => {
    const materiasMock = [{ codigo: "MAT01" }];
    EstudianteMateriaRepository.obtenerPorEstudiante.mockResolvedValue(materiasMock);

    const res = await EstudianteMateriaService.obtenerMateriasDeEstudiante("1001");

    expect(EstudianteMateriaRepository.obtenerPorEstudiante).toHaveBeenCalledWith("1001");
    expect(res).toEqual(materiasMock);
  });

  test("obtenerEstudiantesDeMateria llama a EstudianteMateriaRepository.obtenerPorMateria", async () => {
    const estudiantesMock = [{ codigoEstudiante: "1001" }];
    EstudianteMateriaRepository.obtenerPorMateria.mockResolvedValue(estudiantesMock);

    const res = await EstudianteMateriaService.obtenerEstudiantesDeMateria("MAT01");

    expect(EstudianteMateriaRepository.obtenerPorMateria).toHaveBeenCalledWith("MAT01");
    expect(res).toEqual(estudiantesMock);
  });

  test("actualizarNotas llama a EstudianteMateriaRepository.actualizarNotas", async () => {
    const datos = { nota: 5.0 };
    const updatedMock = { codigoEstudiante: "1001", codigoMateria: "MAT01", nota: 5.0 };
    EstudianteMateriaRepository.actualizarNotas.mockResolvedValue(updatedMock);

    const res = await EstudianteMateriaService.actualizarNotas("1001", "MAT01", datos);

    expect(EstudianteMateriaRepository.actualizarNotas).toHaveBeenCalledWith(
      "1001",
      "MAT01",
      datos
    );
    expect(res).toEqual(updatedMock);
  });

  test("eliminarInscripcion llama a EstudianteMateriaRepository.eliminar", async () => {
    EstudianteMateriaRepository.eliminar.mockResolvedValue(true);

    const res = await EstudianteMateriaService.eliminarInscripcion("1001", "MAT01");

    expect(EstudianteMateriaRepository.eliminar).toHaveBeenCalledWith("1001", "MAT01");
    expect(res).toBe(true);
  });
});
