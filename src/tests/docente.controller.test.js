import * as docenteController from "../controllers/docente.controller.js";
import * as docenteService from "../services/docente.service.js";

describe("docente.controller", () => {
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

  it("crearDocente - éxito", async () => {
    req.body = { nombre: "Juan" };
    const docenteMock = { codDocente: 1, nombre: "Juan" };
    jest.spyOn(docenteService, "crearDocenteService").mockResolvedValue(docenteMock);

    await docenteController.crearDocente(req, res);

    expect(docenteService.crearDocenteService).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(docenteMock);
  });

  it("crearDocente - error", async () => {
    const error = new Error("Error interno");
    jest.spyOn(docenteService, "crearDocenteService").mockRejectedValue(error);

    await docenteController.crearDocente(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("obtenerDocentePorCodigo - éxito", async () => {
    req.params = { codDocente: "1" };
    const docenteMock = { codDocente: 1, nombre: "Juan" };
    jest.spyOn(docenteService, "obtenerDocentePorCodigoService").mockResolvedValue(docenteMock);

    await docenteController.obtenerDocentePorCodigo(req, res);

    expect(res.json).toHaveBeenCalledWith(docenteMock);
  });

  it("obtenerDocentePorCodigo - no encontrado", async () => {
    req.params = { codDocente: "1" };
    jest.spyOn(docenteService, "obtenerDocentePorCodigoService").mockResolvedValue(null);

    await docenteController.obtenerDocentePorCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Docente no encontrado" });
  });

  it("obtenerDocentePorCodigo - error", async () => {
    req.params = { codDocente: "1" };
    const error = new Error("Error interno");
    jest.spyOn(docenteService, "obtenerDocentePorCodigoService").mockRejectedValue(error);

    await docenteController.obtenerDocentePorCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("obtenerTodosDocentes - éxito", async () => {
    const docentesMock = [{ codDocente: 1, nombre: "Juan" }];
    jest.spyOn(docenteService, "obtenerTodosDocentesService").mockResolvedValue(docentesMock);

    await docenteController.obtenerTodosDocentes(req, res);

    expect(res.json).toHaveBeenCalledWith(docentesMock);
  });

  it("obtenerTodosDocentes - error", async () => {
    const error = new Error("Error interno");
    jest.spyOn(docenteService, "obtenerTodosDocentesService").mockRejectedValue(error);

    await docenteController.obtenerTodosDocentes(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("actualizarDocente - éxito", async () => {
    req.params = { codDocente: "1" };
    req.body = { nombre: "Juan" };
    const docenteMock = { codDocente: 1, nombre: "Juan" };
    jest.spyOn(docenteService, "actualizarDocenteService").mockResolvedValue(docenteMock);

    await docenteController.actualizarDocente(req, res);

    expect(res.json).toHaveBeenCalledWith({
      mensaje: "Docente actualizado correctamente",
      docente: docenteMock,
    });
  });

  it("actualizarDocente - no encontrado", async () => {
    req.params = { codDocente: "1" };
    req.body = {};
    jest.spyOn(docenteService, "actualizarDocenteService").mockResolvedValue(null);

    await docenteController.actualizarDocente(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Docente no encontrado" });
  });

  it("actualizarDocente - error", async () => {
    req.params = { codDocente: "1" };
    req.body = {};
    const error = new Error("Error interno");
    jest.spyOn(docenteService, "actualizarDocenteService").mockRejectedValue(error);

    await docenteController.actualizarDocente(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("eliminarDocente - éxito", async () => {
    req.params = { codDocente: "1" };
    jest.spyOn(docenteService, "eliminarDocenteService").mockResolvedValue(true);

    await docenteController.eliminarDocente(req, res);

    expect(res.json).toHaveBeenCalledWith({ mensaje: "Docente eliminado correctamente" });
  });

  it("eliminarDocente - no encontrado", async () => {
    req.params = { codDocente: "1" };
    jest.spyOn(docenteService, "eliminarDocenteService").mockResolvedValue(false);

    await docenteController.eliminarDocente(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Docente no encontrado" });
  });

  it("eliminarDocente - error", async () => {
    req.params = { codDocente: "1" };
    const error = new Error("Error interno");
    jest.spyOn(docenteService, "eliminarDocenteService").mockRejectedValue(error);

    await docenteController.eliminarDocente(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});