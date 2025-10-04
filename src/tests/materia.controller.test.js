import request from "supertest";
import express from "express";
import { MateriaController } from "../controllers/materia.controller.js";

// Mock del servicio
jest.mock("../services/materia.service.js", () => ({
  MateriaService: {
    crearMateria: jest.fn(),
    listarMaterias: jest.fn(),
    obtenerMateria: jest.fn(),
    actualizarMateria: jest.fn(),
    eliminarMateria: jest.fn(),
  },
}));

import { MateriaService } from "../services/materia.service.js";

// Configurar Express para testing
const app = express();
app.use(express.json());
app.post("/materias", MateriaController.crear);
app.get("/materias", MateriaController.listar);
app.get("/materias/:id", MateriaController.obtener);
app.put("/materias/:id", MateriaController.actualizar);
app.delete("/materias/:id", MateriaController.eliminar);

describe("MateriaController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Crear materia - éxito", async () => {
    MateriaService.crearMateria.mockResolvedValue({ id: 1, nombre: "Matemáticas" });

    const res = await request(app)
      .post("/materias")
      .send({ nombre: "Matemáticas", codigo: "MAT101" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("nombre", "Matemáticas");
  });

  test("Listar materias - éxito", async () => {
    MateriaService.listarMaterias.mockResolvedValue([
      { id: 1, nombre: "Matemáticas" },
      { id: 2, nombre: "Física" },
    ]);

    const res = await request(app).get("/materias");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      { id: 1, nombre: "Matemáticas" },
      { id: 2, nombre: "Física" },
    ]);
  });

  test("Obtener materia - éxito", async () => {
    MateriaService.obtenerMateria.mockResolvedValue({ id: 1, nombre: "Matemáticas" });

    const res = await request(app).get("/materias/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("nombre", "Matemáticas");
  });

  test("Obtener materia - no encontrada", async () => {
    MateriaService.obtenerMateria.mockResolvedValue(null);

    const res = await request(app).get("/materias/999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("mensaje", "Materia no encontrada");
  });

  test("Actualizar materia - éxito", async () => {
    MateriaService.actualizarMateria.mockResolvedValue({ id: 1, nombre: "Matemáticas Avanzadas" });

    const res = await request(app)
      .put("/materias/1")
      .send({ nombre: "Matemáticas Avanzadas" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("nombre", "Matemáticas Avanzadas");
  });

  test("Actualizar materia - no encontrada", async () => {
    MateriaService.actualizarMateria.mockResolvedValue(null);

    const res = await request(app)
      .put("/materias/999")
      .send({ nombre: "Desconocida" });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("mensaje", "Materia no encontrada");
  });

  test("Eliminar materia - éxito", async () => {
    MateriaService.eliminarMateria.mockResolvedValue(true);

    const res = await request(app).delete("/materias/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Materia eliminada correctamente");
  });

  test("Eliminar materia - no encontrada", async () => {
    MateriaService.eliminarMateria.mockResolvedValue(false);

    const res = await request(app).delete("/materias/999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("mensaje", "Materia no encontrada");
  });
});
