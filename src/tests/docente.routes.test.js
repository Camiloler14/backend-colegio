import request from "supertest";
import express from "express";
import docenteRoutes from "../routes/docente.route.js";

const app = express();
app.use(express.json());
app.use("/api/docente", docenteRoutes);

jest.mock("../middlewares/usuario.middleware.js", () => ({
  verificarToken: (req, res, next) => next(),
}));

jest.mock("../controllers/docente.controller.js", () => ({
  crearDocente: (req, res) => res.status(201).send("ok"),
  obtenerDocentes: (req, res) => res.status(200).send([]),
  obtenerDocente: (req, res) => res.status(200).send({}),
  actualizarDocente: (req, res) => res.status(200).send("updated"),
  eliminarDocente: (req, res) => res.status(200).send("deleted"),
}));

describe("Rutas Docente", () => {
  it("POST /api/docente -> 201", async () => {
    const res = await request(app).post("/api/docente").send({ primerNombre: "Juan", primerApellido: "Pérez", email: "a@b.com", documento: 123, fecha_ingreso: "2025-10-04" });
    expect(res.statusCode).toBe(201);
  });

  it("GET /api/docente -> 200", async () => {
    const res = await request(app).get("/api/docente");
    expect(res.statusCode).toBe(200);
  });

  it("GET /api/docente/:documento -> 200", async () => {
    const res = await request(app).get("/api/docente/123");
    expect(res.statusCode).toBe(200);
  });

  it("PUT /api/docente/:documento -> 200", async () => {
    const res = await request(app).put("/api/docente/123").send({ primerNombre: "Juan", primerApellido: "Pérez" });
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /api/docente/:documento -> 200", async () => {
    const res = await request(app).delete("/api/docente/123");
    expect(res.statusCode).toBe(200);
  });
});
