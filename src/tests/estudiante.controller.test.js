import * as estudianteController from "../controllers/estudiante.controller.js";
import * as estudianteService from "../services/estudiante.service.js";

describe("estudiante.controller", () => {
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

  it("crearEstudiante - éxito", async () => {
    req.body = { nombre: "Camilo" };
    const estudianteMock = { codEstudiante: 1, nombre: "Camilo" };
    jest.spyOn(estudianteService, "crearEstudianteService").mockResolvedValue(estudianteMock);

    await estudianteController.crearEstudiante(req, res);

    expect(estudianteService.crearEstudianteService).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(estudianteMock);
  });

  it("crearEstudiante - error", async () => {
    const error = new Error("Datos inválidos");
    jest.spyOn(estudianteService, "crearEstudianteService").mockRejectedValue(error);

    await estudianteController.crearEstudiante(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });
  });

  it("obtenerTodosEstudiantes - éxito", async () => {
    const estudiantesMock = [{ codEstudiante: 1, nombre: "Camilo" }];
    jest.spyOn(estudianteService, "obtenerTodosEstudiantesService").mockResolvedValue(estudiantesMock);

    await estudianteController.obtenerTodosEstudiantes(req, res);

    expect(res.json).toHaveBeenCalledWith(estudiantesMock);
  });

  it("obtenerTodosEstudiantes - error", async () => {
    const error = new Error("Error interno");
    jest.spyOn(estudianteService, "obtenerTodosEstudiantesService").mockRejectedValue(error);

    await estudianteController.obtenerTodosEstudiantes(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });
  });

  it("obtenerEstudiantePorCodigo - éxito", async () => {
    req.params = { codEstudiante: "1" };
    const estudianteMock = { codEstudiante: 1, nombre: "Camilo" };
    jest.spyOn(estudianteService, "obtenerEstudiantePorCodigoService").mockResolvedValue(estudianteMock);

    await estudianteController.obtenerEstudiantePorCodigo(req, res);

    expect(res.json).toHaveBeenCalledWith(estudianteMock);
  });

  it("obtenerEstudiantePorCodigo - error", async () => {
    req.params = { codEstudiante: "1" };
    const error = new Error("Estudiante no encontrado");
    jest.spyOn(estudianteService, "obtenerEstudiantePorCodigoService").mockRejectedValue(error);

    await estudianteController.obtenerEstudiantePorCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });
  });

  it("actualizarEstudiante - éxito", async () => {
    req.params = { codEstudiante: "1" };
    req.body = { nombre: "Camilo" };
    jest.spyOn(estudianteService, "actualizarEstudianteService").mockResolvedValue();

    await estudianteController.actualizarEstudiante(req, res);

    expect(estudianteService.actualizarEstudianteService).toHaveBeenCalledWith(req.params.codEstudiante, req.body);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Estudiante actualizado correctamente" });
  });

  it("actualizarEstudiante - error", async () => {
    req.params = { codEstudiante: "1" };
    req.body = {};
    const error = new Error("Error actualización");
    jest.spyOn(estudianteService, "actualizarEstudianteService").mockRejectedValue(error);

    await estudianteController.actualizarEstudiante(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });
  });

  it("eliminarEstudiante - éxito", async () => {
    req.params = { codEstudiante: "1" };
    jest.spyOn(estudianteService, "eliminarEstudianteService").mockResolvedValue();

    await estudianteController.eliminarEstudiante(req, res);

    expect(estudianteService.eliminarEstudianteService).toHaveBeenCalledWith(req.params.codEstudiante);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Estudiante eliminado correctamente" });
  });

  it("eliminarEstudiante - error", async () => {
    req.params = { codEstudiante: "1" };
    const error = new Error("Error eliminación");
    jest.spyOn(estudianteService, "eliminarEstudianteService").mockRejectedValue(error);

    await estudianteController.eliminarEstudiante(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });
  });
});