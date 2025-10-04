import request from "supertest";
import express from "express";
import { EstudianteMateriaController } from "../controllers/estudianteMateria.controller.js";

// Mock del servicio
jest.mock("../services/estudianteMateria.service.js", () => ({
  EstudianteMateriaService: {
    inscribirEstudiante: jest.fn(),
    obtenerMateriasDeEstudiante: jest.fn(),
    obtenerEstudiantesDeMateria: jest.fn(),
    actualizarNotas: jest.fn(),
    eliminarInscripcion: jest.fn(),
  },
}));

import { EstudianteMateriaService } from "../services/estudianteMateria.service.js";

// Configurar Express para testing
const app = express();
app.use(express.json());
app.post("/inscripciones", EstudianteMateriaController.inscribir);
app.get(
  "/inscripciones/estudiante/:codigoEstudiante",
  EstudianteMateriaController.obtenerPorEstudiante
);
app.get(
  "/inscripciones/materia/:codigoMateria",
  EstudianteMateriaController.obtenerPorMateria
);
app.put(
  "/inscripciones/:codigoEstudiante/:codigoMateria",
  EstudianteMateriaController.actualizarNotas
);
app.delete(
  "/inscripciones/:codigoEstudiante/:codigoMateria",
  EstudianteMateriaController.eliminar
);

describe("EstudianteMateriaController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Inscribir estudiante - éxito", async () => {
    EstudianteMateriaService.inscribirEstudiante.mockResolvedValue({
      codigoEstudiante: "123",
      codigoMateria: "MAT101",
    });

    const res = await request(app)
      .post("/inscripciones")
      .send({ codigoEstudiante: "123", codigoMateria: "MAT101" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("codigoEstudiante", "123");
    expect(res.body).toHaveProperty("codigoMateria", "MAT101");
  });

  test("Obtener materias por estudiante - éxito", async () => {
    EstudianteMateriaService.obtenerMateriasDeEstudiante.mockResolvedValue([
      { codigoMateria: "MAT101", nota: 4.5 },
    ]);

    const res = await request(app).get("/inscripciones/estudiante/123");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ codigoMateria: "MAT101", nota: 4.5 }]);
  });

  test("Obtener estudiantes por materia - éxito", async () => {
    EstudianteMateriaService.obtenerEstudiantesDeMateria.mockResolvedValue([
      { codigoEstudiante: "123", nota: 4.5 },
    ]);

    const res = await request(app).get("/inscripciones/materia/MAT101");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ codigoEstudiante: "123", nota: 4.5 }]);
  });

  test("Actualizar notas - éxito", async () => {
    EstudianteMateriaService.actualizarNotas.mockResolvedValue({
      codigoEstudiante: "123",
      codigoMateria: "MAT101",
      nota: 5.0,
    });

    const res = await request(app)
      .put("/inscripciones/123/MAT101")
      .send({ nota: 5.0 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("nota", 5.0);
  });

  test("Actualizar notas - no encontrado", async () => {
    EstudianteMateriaService.actualizarNotas.mockResolvedValue(null);

    const res = await request(app)
      .put("/inscripciones/999/MAT101")
      .send({ nota: 5.0 });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("mensaje", "Registro no encontrado");
  });

  test("Eliminar inscripción - éxito", async () => {
    EstudianteMateriaService.eliminarInscripcion.mockResolvedValue(true);

    const res = await request(app).delete("/inscripciones/123/MAT101");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty(
      "mensaje",
      "Inscripción eliminada correctamente"
    );
  });

  test("Eliminar inscripción - no encontrado", async () => {
    EstudianteMateriaService.eliminarInscripcion.mockResolvedValue(false);

    const res = await request(app).delete("/inscripciones/999/MAT101");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("mensaje", "Registro no encontrado");
  });
});
