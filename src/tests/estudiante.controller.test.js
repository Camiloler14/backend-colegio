import request from "supertest";
import express from "express";
import * as estudianteController from "../controllers/estudiante.controller.js";

// Mock de los servicios
jest.mock("../services/estudiante.service.js", () => ({
  crearEstudianteService: jest.fn(),
  actualizarEstudianteService: jest.fn(),
  eliminarEstudianteService: jest.fn(),
  obtenerEstudiantesService: jest.fn(),
  obtenerEstudiantePorIdentificacionService: jest.fn(),
}));

import {
  crearEstudianteService,
  actualizarEstudianteService,
  eliminarEstudianteService,
  obtenerEstudiantesService,
  obtenerEstudiantePorIdentificacionService
} from "../services/estudiante.service.js";

// Configurar Express para testing
const app = express();
app.use(express.json());
app.post("/estudiantes", estudianteController.crearEstudiante);
app.get("/estudiantes", estudianteController.obtenerEstudiantes);
app.get("/estudiantes/:identificacion", estudianteController.obtenerEstudiante);
app.put("/estudiantes/:identificacion", estudianteController.actualizarEstudiante);
app.delete("/estudiantes/:identificacion", estudianteController.eliminarEstudiante);

describe("Estudiante Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Crear estudiante - éxito", async () => {
    crearEstudianteService.mockResolvedValue({ id: 1, nombre: "Juan" });

    const res = await request(app)
      .post("/estudiantes")
      .send({ nombre: "Juan", identificacion: "12345" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("mensaje", "Estudiante creado");
    expect(res.body).toHaveProperty("id", 1);
  });

  test("Obtener todos los estudiantes - éxito", async () => {
    obtenerEstudiantesService.mockResolvedValue([
      { id: 1, nombre: "Juan", identificacion: "12345" }
    ]);

    const res = await request(app).get("/estudiantes");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      { id: 1, nombre: "Juan", identificacion: "12345" }
    ]);
  });

  test("Obtener estudiante por identificación - no encontrado", async () => {
    obtenerEstudiantePorIdentificacionService.mockResolvedValue(null);

    const res = await request(app).get("/estudiantes/999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("mensaje", "Estudiante no encontrado");
  });

  test("Actualizar estudiante - éxito", async () => {
    actualizarEstudianteService.mockResolvedValue({ id: 1, nombre: "Carlos" });

    const res = await request(app)
      .put("/estudiantes/12345")
      .send({ nombre: "Carlos" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Estudiante actualizado");
    expect(res.body.estudiante).toHaveProperty("nombre", "Carlos");
  });

  test("Eliminar estudiante - éxito", async () => {
    eliminarEstudianteService.mockResolvedValue(true);

    const res = await request(app).delete("/estudiantes/12345");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Estudiante eliminado");
  });

  test("Eliminar estudiante - no encontrado", async () => {
    eliminarEstudianteService.mockResolvedValue(false);

    const res = await request(app).delete("/estudiantes/999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("mensaje", "Estudiante no encontrado");
  });
});
