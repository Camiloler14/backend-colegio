import { EstudianteMateriaController } from "../controllers/estudianteMateria.controller.js";
import { EstudianteMateriaService } from "../services/estudianteMateria.service.js";

describe("EstudianteMateriaController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("inscribir - éxito", async () => {
    req.body = { codigoEstudiante: 1, codigoMateria: 101 };
    const registroMock = { codigoEstudiante: 1, codigoMateria: 101 };
    jest.spyOn(EstudianteMateriaService, "inscribirEstudiante").mockResolvedValue(registroMock);

    await EstudianteMateriaController.inscribir(req, res);

    expect(EstudianteMateriaService.inscribirEstudiante).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(registroMock);
  });

  it("inscribir - error", async () => {
    const error = new Error("Error interno");
    jest.spyOn(EstudianteMateriaService, "inscribirEstudiante").mockRejectedValue(error);

    await EstudianteMateriaController.inscribir(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: "Error al inscribir estudiante en materia",
      error,
    });
  });

  it("obtenerPorEstudiante - éxito", async () => {
    req.params = { codigoEstudiante: "1" };
    const registrosMock = [{ codigoEstudiante: 1, codigoMateria: 101 }];
    jest.spyOn(EstudianteMateriaService, "obtenerMateriasDeEstudiante").mockResolvedValue(registrosMock);

    await EstudianteMateriaController.obtenerPorEstudiante(req, res);

    expect(EstudianteMateriaService.obtenerMateriasDeEstudiante).toHaveBeenCalledWith("1");
    expect(res.json).toHaveBeenCalledWith(registrosMock);
  });

  it("obtenerPorEstudiante - error", async () => {
    req.params = { codigoEstudiante: "1" };
    const error = new Error("Error interno");
    jest.spyOn(EstudianteMateriaService, "obtenerMateriasDeEstudiante").mockRejectedValue(error);

    await EstudianteMateriaController.obtenerPorEstudiante(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: "Error al obtener materias del estudiante",
      error,
    });
  });

  it("obtenerPorMateria - éxito", async () => {
    req.params = { codigoMateria: "101" };
    const registrosMock = [{ codigoEstudiante: 1, codigoMateria: 101 }];
    jest.spyOn(EstudianteMateriaService, "obtenerEstudiantesDeMateria").mockResolvedValue(registrosMock);

    await EstudianteMateriaController.obtenerPorMateria(req, res);

    expect(EstudianteMateriaService.obtenerEstudiantesDeMateria).toHaveBeenCalledWith("101");
    expect(res.json).toHaveBeenCalledWith(registrosMock);
  });

  it("obtenerPorMateria - error", async () => {
    req.params = { codigoMateria: "101" };
    const error = new Error("Error interno");
    jest.spyOn(EstudianteMateriaService, "obtenerEstudiantesDeMateria").mockRejectedValue(error);

    await EstudianteMateriaController.obtenerPorMateria(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: "Error al obtener estudiantes de la materia",
      error,
    });
  });

  it("actualizarNotas - éxito", async () => {
    req.params = { codigoEstudiante: "1", codigoMateria: "101" };
    req.body = { nota: 5 };
    const registroMock = { codigoEstudiante: 1, codigoMateria: 101, nota: 5 };
    jest.spyOn(EstudianteMateriaService, "actualizarNotas").mockResolvedValue(registroMock);

    await EstudianteMateriaController.actualizarNotas(req, res);

    expect(EstudianteMateriaService.actualizarNotas).toHaveBeenCalledWith("1", "101", req.body);
    expect(res.json).toHaveBeenCalledWith(registroMock);
  });

  it("actualizarNotas - no encontrado", async () => {
    req.params = { codigoEstudiante: "1", codigoMateria: "101" };
    req.body = { nota: 5 };
    jest.spyOn(EstudianteMateriaService, "actualizarNotas").mockResolvedValue(null);

    await EstudianteMateriaController.actualizarNotas(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Registro no encontrado" });
  });

  it("actualizarNotas - error", async () => {
    req.params = { codigoEstudiante: "1", codigoMateria: "101" };
    req.body = { nota: 5 };
    const error = new Error("Error interno");
    jest.spyOn(EstudianteMateriaService, "actualizarNotas").mockRejectedValue(error);

    await EstudianteMateriaController.actualizarNotas(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Error al actualizar notas", error });
  });

  it("eliminar - éxito", async () => {
    req.params = { codigoEstudiante: "1", codigoMateria: "101" };
    jest.spyOn(EstudianteMateriaService, "eliminarInscripcion").mockResolvedValue(true);

    await EstudianteMateriaController.eliminar(req, res);

    expect(EstudianteMateriaService.eliminarInscripcion).toHaveBeenCalledWith("1", "101");
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Inscripción eliminada correctamente" });
  });

  it("eliminar - no encontrado", async () => {
    req.params = { codigoEstudiante: "1", codigoMateria: "101" };
    jest.spyOn(EstudianteMateriaService, "eliminarInscripcion").mockResolvedValue(null);

    await EstudianteMateriaController.eliminar(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Registro no encontrado" });
  });

  it("eliminar - error", async () => {
    req.params = { codigoEstudiante: "1", codigoMateria: "101" };
    const error = new Error("Error interno");
    jest.spyOn(EstudianteMateriaService, "eliminarInscripcion").mockRejectedValue(error);

    await EstudianteMateriaController.eliminar(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Error al eliminar inscripción", error });
  });
});