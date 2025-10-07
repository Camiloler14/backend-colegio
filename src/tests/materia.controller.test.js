import * as materiaController from "../controllers/materia.controller.js";
import MateriaService from "../services/materia.service.js";

describe("materia.controller", () => {
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

  it("crearMateria - éxito", async () => {
    req.body = { nombre: "Matemáticas" };
    const materiaMock = { codigoMateria: 1, nombre: "Matemáticas" };
    jest.spyOn(MateriaService, "crearMateria").mockResolvedValue(materiaMock);

    await materiaController.crearMateria(req, res);

    expect(MateriaService.crearMateria).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: "Materia creada correctamente",
      materia: materiaMock,
    });
  });

  it("crearMateria - error", async () => {
    const error = new Error("Error creación");
    jest.spyOn(MateriaService, "crearMateria").mockRejectedValue(error);

    await materiaController.crearMateria(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("obtenerMaterias - éxito", async () => {
    const materiasMock = [{ codigoMateria: 1, nombre: "Matemáticas" }];
    jest.spyOn(MateriaService, "obtenerMaterias").mockResolvedValue(materiasMock);

    await materiaController.obtenerMaterias(req, res);

    expect(MateriaService.obtenerMaterias).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(materiasMock);
  });

  it("obtenerMaterias - error", async () => {
    const error = new Error("Error interno");
    jest.spyOn(MateriaService, "obtenerMaterias").mockRejectedValue(error);

    await materiaController.obtenerMaterias(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("obtenerMateriaPorCodigo - éxito", async () => {
    req.params = { codigoMateria: "1" };
    const materiaMock = { codigoMateria: 1, nombre: "Matemáticas" };
    jest.spyOn(MateriaService, "obtenerMateriaPorCodigo").mockResolvedValue(materiaMock);

    await materiaController.obtenerMateriaPorCodigo(req, res);

    expect(MateriaService.obtenerMateriaPorCodigo).toHaveBeenCalledWith("1");
    expect(res.json).toHaveBeenCalledWith(materiaMock);
  });

  it("obtenerMateriaPorCodigo - error", async () => {
    req.params = { codigoMateria: "1" };
    const error = new Error("Materia no encontrada");
    jest.spyOn(MateriaService, "obtenerMateriaPorCodigo").mockRejectedValue(error);

    await materiaController.obtenerMateriaPorCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("actualizarMateria - éxito", async () => {
    req.params = { codigoMateria: "1" };
    req.body = { nombre: "Física" };
    const respuestaMock = { mensaje: "Materia actualizada" };
    jest.spyOn(MateriaService, "actualizarMateria").mockResolvedValue(respuestaMock);

    await materiaController.actualizarMateria(req, res);

    expect(MateriaService.actualizarMateria).toHaveBeenCalledWith("1", req.body);
    expect(res.json).toHaveBeenCalledWith(respuestaMock);
  });

  it("actualizarMateria - error", async () => {
    req.params = { codigoMateria: "1" };
    req.body = {};
    const error = new Error("Error actualización");
    jest.spyOn(MateriaService, "actualizarMateria").mockRejectedValue(error);

    await materiaController.actualizarMateria(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it("eliminarMateria - éxito", async () => {
    req.params = { codigoMateria: "1" };
    const respuestaMock = { mensaje: "Materia eliminada" };
    jest.spyOn(MateriaService, "eliminarMateria").mockResolvedValue(respuestaMock);

    await materiaController.eliminarMateria(req, res);

    expect(MateriaService.eliminarMateria).toHaveBeenCalledWith("1");
    expect(res.json).toHaveBeenCalledWith(respuestaMock);
  });

  it("eliminarMateria - error", async () => {
    req.params = { codigoMateria: "1" };
    const error = new Error("Error eliminación");
    jest.spyOn(MateriaService, "eliminarMateria").mockRejectedValue(error);

    await materiaController.eliminarMateria(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});
