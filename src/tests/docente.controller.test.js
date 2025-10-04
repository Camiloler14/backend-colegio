import request from "supertest";
import express from "express";
import * as docenteController from "../controllers/docente.controller.js";

// Mock del servicio
jest.mock("../services/docente.service.js", () => ({
  crearDocenteServicio: jest.fn(),
  obtenerDocentesServicio: jest.fn(),
  obtenerDocentePorDocumentoServicio: jest.fn(),
  actualizarDocenteServicio: jest.fn(),
  eliminarDocenteServicio: jest.fn(),
}));

import {
  crearDocenteServicio,
  obtenerDocentesServicio,
  obtenerDocentePorDocumentoServicio,
  actualizarDocenteServicio,
  eliminarDocenteServicio,
} from "../services/docente.service.js";

// Configurar Express para testing
const app = express();
app.use(express.json());
app.post("/docentes", docenteController.crearDocente);
app.get("/docentes", docenteController.obtenerDocentes);
app.get("/docentes/:documento", docenteController.obtenerDocente);
app.put("/docentes/:documento", docenteController.actualizarDocente);
app.delete("/docentes/:documento", docenteController.eliminarDocente);

describe("Docente Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Crear docente - éxito", async () => {
    crearDocenteServicio.mockResolvedValue({
      success: true,
      data: { id: 1, primerNombre: "Juan" },
    });

    const res = await request(app).post("/docentes").send({
      codigo: "123",
      primerNombre: "Juan",
      primerApellido: "López",
      email: "juan@mail.com",
      telefono: "123456789",
      direccion: "Calle 1",
      barrio: "Centro",
      ciudad: "Cali",
      fechaIngreso: "2025-01-01",
      documento: "1001",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id", 1);
  });

  test("Obtener todos los docentes - éxito", async () => {
    obtenerDocentesServicio.mockResolvedValue({
      success: true,
      data: [
        {
          primerNombre: "Juan",
          segundoNombre: "",
          primerApellido: "López",
          segundoApellido: "",
        },
      ],
    });

    const res = await request(app).get("/docentes");

    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toHaveProperty("nombreCompleto", "Juan López");
  });

  test("Obtener docente por documento - no encontrado", async () => {
    obtenerDocentePorDocumentoServicio.mockResolvedValue({
      success: false,
      message: "Docente no encontrado",
    });

    const res = await request(app).get("/docentes/9999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("mensaje", "Docente no encontrado");
  });

  test("Actualizar docente - éxito", async () => {
    actualizarDocenteServicio.mockResolvedValue({
      success: true,
      data: { primerNombre: "Carlos" },
    });

    const res = await request(app)
      .put("/docentes/1001")
      .send({ primerNombre: "Carlos" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("primerNombre", "Carlos");
  });

  test("Eliminar docente - éxito", async () => {
    eliminarDocenteServicio.mockResolvedValue({
      success: true,
      message: "Docente eliminado",
    });

    const res = await request(app).delete("/docentes/1001");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Docente eliminado");
  });
});
