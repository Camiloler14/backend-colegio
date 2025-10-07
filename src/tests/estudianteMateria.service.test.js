import { EstudianteMateriaService } from "../services/estudianteMateria.service.js";
import { EstudianteMateriaRepository } from "../repositories/estudianteMateria.repository.js";

jest.mock("../repositories/estudianteMateria.repository.js");

describe("EstudianteMateriaService", () => {
  const inscripcionMock = { codEstudiante: "E001", codMateria: "M001", nota: 5 };
  const materiasMock = [{ codMateria: "M001", nombre: "Matemáticas" }];
  const estudiantesMock = [{ codEstudiante: "E001", nombre: "Juan" }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("inscribirEstudiante llama al repositorio y devuelve resultado", async () => {
    EstudianteMateriaRepository.inscribir.mockResolvedValue(inscripcionMock);

    const result = await EstudianteMateriaService.inscribirEstudiante(inscripcionMock);

    expect(EstudianteMateriaRepository.inscribir).toHaveBeenCalledWith(inscripcionMock);
    expect(result).toEqual(inscripcionMock);
  });

  test("obtenerMateriasDeEstudiante devuelve las materias de un estudiante", async () => {
    EstudianteMateriaRepository.obtenerPorEstudiante.mockResolvedValue(materiasMock);

    const result = await EstudianteMateriaService.obtenerMateriasDeEstudiante("E001");

    expect(EstudianteMateriaRepository.obtenerPorEstudiante).toHaveBeenCalledWith("E001");
    expect(result).toEqual(materiasMock);
  });

  test("obtenerEstudiantesDeMateria devuelve los estudiantes de una materia", async () => {
    EstudianteMateriaRepository.obtenerPorMateria.mockResolvedValue(estudiantesMock);

    const result = await EstudianteMateriaService.obtenerEstudiantesDeMateria("M001");

    expect(EstudianteMateriaRepository.obtenerPorMateria).toHaveBeenCalledWith("M001");
    expect(result).toEqual(estudiantesMock);
  });

  test("actualizarNotas llama al repositorio y devuelve resultado", async () => {
    EstudianteMateriaRepository.actualizarNotas.mockResolvedValue([1]);

    const result = await EstudianteMateriaService.actualizarNotas("E001", "M001", { nota: 4 });

    expect(EstudianteMateriaRepository.actualizarNotas).toHaveBeenCalledWith("E001", "M001", { nota: 4 });
    expect(result).toEqual([1]);
  });

  test("eliminarInscripcion llama al repositorio y devuelve resultado", async () => {
    EstudianteMateriaRepository.eliminar.mockResolvedValue(true);

    const result = await EstudianteMateriaService.eliminarInscripcion("E001", "M001");

    expect(EstudianteMateriaRepository.eliminar).toHaveBeenCalledWith("E001", "M001");
    expect(result).toBe(true);
  });
});
