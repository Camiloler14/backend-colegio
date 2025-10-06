import request from "supertest";
import express from "express";
import {
  crearDocente,
  obtenerDocentes,
  obtenerDocente,
  actualizarDocente,
  eliminarDocente,
} from "../controllers/docente.controller.js";

import {
  crearDocenteServicio,
  obtenerDocentesServicio,
  obtenerDocentePorDocumentoServicio,
  actualizarDocenteServicio,
  eliminarDocenteServicio,
} from "../services/docente.service.js";

jest.mock("../services/docente.service.js");

const app = express();
app.use(express.json());

app.post("/docentes", crearDocente);
app.get("/docentes", obtenerDocentes);
app.get("/docentes/:documento", obtenerDocente);
app.put("/docentes/:documento", actualizarDocente);
app.delete("/docentes/:documento", eliminarDocente);

describe("Controlador de docentes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /docentes", () => {
    const docenteData = {
      codigo: "DOC001",
      primerNombre: "Juan",
      segundoNombre: "Camilo",
      primerApellido: "Lerma",
      segundoApellido: "Balanta",
      email: "juan@example.com",
      telefono: "3101234567",
      direccion: "Calle 123",
      barrio: "La Gran Colombia",
      ciudad: "Cali",
      fechaIngreso: "2025-10-05",
      documento: "123456789",
    };

    it("debe crear un docente exitosamente", async () => {
      crearDocenteServicio.mockResolvedValue({
        success: true,
        data: { toJSON: () => docenteData },
      });

      const res = await request(app).post("/docentes").send(docenteData);

      expect(res.status).toBe(201);
      expect(res.body.nombreCompleto).toBe("Juan Camilo Lerma Balanta");
      expect(crearDocenteServicio).toHaveBeenCalledWith(docenteData);
    });

    it("debe devolver error 400 si faltan campos obligatorios", async () => {
      const res = await request(app).post("/docentes").send({
        primerNombre: "Juan",
      });
      expect(res.status).toBe(400);
      expect(res.body.mensaje).toBe("Faltan campos obligatorios");
    });

    it("debe devolver error si el servicio falla", async () => {
      crearDocenteServicio.mockResolvedValue({
        success: false,
        message: "Docente ya existe",
      });

      const res = await request(app).post("/docentes").send(docenteData);

      expect(res.status).toBe(400);
      expect(res.body.mensaje).toBe("Docente ya existe");
    });

    it("debe manejar errores internos del servidor", async () => {
      crearDocenteServicio.mockRejectedValue(new Error("DB error"));
      const res = await request(app).post("/docentes").send(docenteData);
      expect(res.status).toBe(500);
      expect(res.body.mensaje).toBe("Error interno del servidor");
    });
  });

  describe("GET /docentes", () => {
    it("debe retornar una lista de docentes con nombre completo", async () => {
      obtenerDocentesServicio.mockResolvedValue({
        success: true,
        data: [
          {
            toJSON: () => ({
              primerNombre: "María",
              segundoNombre: "Lucía",
              primerApellido: "Gómez",
              segundoApellido: "Ríos",
            }),
          },
        ],
      });

      const res = await request(app).get("/docentes");
      expect(res.status).toBe(200);
      expect(res.body[0].nombreCompleto).toBe("María Lucía Gómez Ríos");
    });

    it("debe devolver error 400 si el servicio falla", async () => {
      obtenerDocentesServicio.mockResolvedValue({
        success: false,
        message: "Error al obtener docentes",
      });

      const res = await request(app).get("/docentes");
      expect(res.status).toBe(400);
      expect(res.body.mensaje).toBe("Error al obtener docentes");
    });

    it("debe manejar errores internos del servidor", async () => {
      obtenerDocentesServicio.mockRejectedValue(new Error("DB error"));
      const res = await request(app).get("/docentes");
      expect(res.status).toBe(500);
      expect(res.body.mensaje).toBe("Error interno del servidor");
    });
  });

  describe("GET /docentes/:documento", () => {
    it("debe retornar un docente por documento", async () => {
      obtenerDocentePorDocumentoServicio.mockResolvedValue({
        success: true,
        data: {
          primerNombre: "Juan",
          primerApellido: "Lerma",
          dataValues: { primerNombre: "Juan", primerApellido: "Lerma" },
        },
      });

      const res = await request(app).get("/docentes/123456789");
      expect(res.status).toBe(200);
      expect(res.body.nombreCompleto).toContain("Juan Lerma");
    });

    it("debe retornar 404 si el docente no existe", async () => {
      obtenerDocentePorDocumentoServicio.mockResolvedValue({
        success: false,
        message: "Docente no encontrado",
      });

      const res = await request(app).get("/docentes/0000000");
      expect(res.status).toBe(404);
      expect(res.body.mensaje).toBe("Docente no encontrado");
    });

    it("debe manejar errores internos", async () => {
      obtenerDocentePorDocumentoServicio.mockRejectedValue(
        new Error("Error DB")
      );
      const res = await request(app).get("/docentes/123456789");
      expect(res.status).toBe(500);
      expect(res.body.mensaje).toBe("Error interno del servidor");
    });
  });

  describe("PUT /docentes/:documento", () => {
    it("debe actualizar un docente correctamente", async () => {
      actualizarDocenteServicio.mockResolvedValue({
        success: true,
        data: { mensaje: "Docente actualizado" },
      });

      const res = await request(app)
        .put("/docentes/123456789")
        .send({ telefono: "3009999999" });

      expect(res.status).toBe(200);
      expect(res.body.mensaje).toBe("Docente actualizado");
    });

    it("debe devolver 404 si el docente no se encuentra", async () => {
      actualizarDocenteServicio.mockResolvedValue({
        success: false,
        message: "Docente no encontrado",
      });

      const res = await request(app)
        .put("/docentes/0000000")
        .send({ telefono: "3009999999" });

      expect(res.status).toBe(404);
      expect(res.body.mensaje).toBe("Docente no encontrado");
    });

    it("debe manejar errores internos", async () => {
      actualizarDocenteServicio.mockRejectedValue(new Error("DB error"));
      const res = await request(app)
        .put("/docentes/123456789")
        .send({ telefono: "3009999999" });

      expect(res.status).toBe(500);
      expect(res.body.mensaje).toBe("Error interno del servidor");
    });
  });

  describe("DELETE /docentes/:documento", () => {
    it("debe eliminar un docente correctamente", async () => {
      eliminarDocenteServicio.mockResolvedValue({
        success: true,
        message: "Docente eliminado correctamente",
      });

      const res = await request(app).delete("/docentes/123456789");
      expect(res.status).toBe(200);
      expect(res.body.mensaje).toBe("Docente eliminado correctamente");
    });

    it("debe devolver 404 si no existe el docente", async () => {
      eliminarDocenteServicio.mockResolvedValue({
        success: false,
        message: "Docente no encontrado",
      });

      const res = await request(app).delete("/docentes/0000000");
      expect(res.status).toBe(404);
      expect(res.body.mensaje).toBe("Docente no encontrado");
    });

    it("debe manejar errores internos", async () => {
      eliminarDocenteServicio.mockRejectedValue(new Error("DB error"));
      const res = await request(app).delete("/docentes/123456789");
      expect(res.status).toBe(500);
      expect(res.body.mensaje).toBe("Error interno del servidor");
    });
  });
});
