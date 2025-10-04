import request from "supertest";
import express from "express";
import materiaRoutes from "../routes/materia.route.js";

const app = express();
app.use(express.json());
app.use("/materia", materiaRoutes);

// Mocks del middleware y del controlador
jest.mock("../middlewares/usuario.middleware.js", () => ({
  verificarToken: (req, res, next) => next(),
}));

jest.mock("../controllers/materia.controller.js", () => ({
  MateriaController: {
    crear: (req, res) => res.status(201).send("Materia creada"),
    listar: (req, res) => res.status(200).send(["Materia1", "Materia2"]),
    obtener: (req, res) => res.status(200).send({ id: 1, nombreMateria: "Matemáticas" }),
    actualizar: (req, res) => res.status(200).send("Materia actualizada"),
    eliminar: (req, res) => res.status(200).send("Materia eliminada"),
  },
}));

describe("Rutas Materia", () => {
  it("POST /materia -> 201", async () => {
    const res = await request(app)
      .post("/materia")
      .send({ nombreMateria: "Historia", codigoDocente: 101 });
    expect(res.statusCode).toBe(201);
    expect(res.text).toBe("Materia creada");
  });

  it("GET /materia -> 200", async () => {
    const res = await request(app).get("/materia");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(["Materia1", "Materia2"]);
  });

  it("GET /materia/:id -> 200", async () => {
    const res = await request(app).get("/materia/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, nombreMateria: "Matemáticas" });
  });

  it("PUT /materia/:id -> 200", async () => {
    const res = await request(app)
      .put("/materia/1")
      .send({ nombreMateria: "Historia", codigoDocente: 102 });
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Materia actualizada");
  });

  it("DELETE /materia/:id -> 200", async () => {
    const res = await request(app).delete("/materia/1");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Materia eliminada");
  });
});