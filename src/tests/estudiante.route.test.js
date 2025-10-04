import request from "supertest";
import express from "express";
import estudianteRoutes from "../routes/estudiante.route.js";

const app = express();
app.use(express.json());
app.use("/api/estudiante", estudianteRoutes);

jest.mock("../middlewares/usuario.middleware.js", () => ({
  verificarToken: (req, res, next) => next(),
}));

jest.mock("../controllers/estudiante.controller.js", () => ({
  crearEstudiante: (req, res) => res.status(201).send("ok"),
  actualizarEstudiante: (req, res) => res.status(200).send("updated"),
  eliminarEstudiante: (req, res) => res.status(200).send("deleted"),
  obtenerEstudiante: (req, res) => res.status(200).send({}),
  obtenerEstudiantes: (req, res) => res.status(200).send([]),
}));

describe("Rutas Estudiante", () => {
  it("POST /api/estudiante -> 201", async () => {
    const res = await request(app).post("/api/estudiante").send({ usuarioCodigo: 1, contraseña: "1234", identificacion: 123, primerNombre: "Juan", primerApellido: "Pérez", edad: 15, genero: "M", fechaNacimiento: "2010-01-01", acudiente1: "Ana", telefonoAcudiente1: "3001234567", direccion: "Calle 1", barrio: "Centro", ciudad: "Cali", fechaMatricula: "2025-01-01", fechaIngreso: "2025-01-01", grado: 10, estado: "Activo" });
    expect(res.statusCode).toBe(201);
  });

  it("GET /api/estudiante -> 200", async () => {
    const res = await request(app).get("/api/estudiante");
    expect(res.statusCode).toBe(200);
  });

  it("GET /api/estudiante/:identificacion -> 200", async () => {
    const res = await request(app).get("/api/estudiante/123");
    expect(res.statusCode).toBe(200);
  });

  it("PUT /api/estudiante/:identificacion -> 200", async () => {
    const res = await request(app).put("/api/estudiante/123").send({ primerNombre: "Juan", primerApellido: "Pérez" });
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /api/estudiante/:identificacion -> 200", async () => {
    const res = await request(app).delete("/api/estudiante/123");
    expect(res.statusCode).toBe(200);
  });
});

