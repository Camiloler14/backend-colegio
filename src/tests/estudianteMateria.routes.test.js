import request from "supertest";
import express from "express";
import estudianteMateriaRoutes from "../routes/estudianteMateria.route.js";

const app = express();
app.use(express.json());
app.use("/estudiante-materia", estudianteMateriaRoutes);

// Mocks del middleware y controlador
jest.mock("../middlewares/usuario.middleware.js", () => ({
  verificarToken: (req, res, next) => next(),
}));

jest.mock("../controllers/estudianteMateria.controller.js", () => ({
  EstudianteMateriaController: {
    inscribir: (req, res) => res.status(201).send("Inscripción creada"),
    obtenerPorEstudiante: (req, res) => res.status(200).send(["Materia1", "Materia2"]),
    obtenerPorMateria: (req, res) => res.status(200).send(["Estudiante1", "Estudiante2"]),
    actualizarNotas: (req, res) => res.status(200).send("Nota actualizada"),
    eliminar: (req, res) => res.status(200).send("Inscripción eliminada"),
  },
}));

describe("Rutas EstudianteMateria", () => {
  it("POST /estudiante-materia -> 201", async () => {
    const res = await request(app)
      .post("/estudiante-materia")
      .send({ codigoEstudiante: 1, codigoMateria: 101 });
    expect(res.statusCode).toBe(201);
    expect(res.text).toBe("Inscripción creada");
  });

  it("GET /estudiante-materia/estudiante/:codigoEstudiante -> 200", async () => {
    const res = await request(app).get("/estudiante-materia/estudiante/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(["Materia1", "Materia2"]);
  });

  it("GET /estudiante-materia/materia/:codigoMateria -> 200", async () => {
    const res = await request(app).get("/estudiante-materia/materia/101");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(["Estudiante1", "Estudiante2"]);
  });

  it("PUT /estudiante-materia/:codigoEstudiante/:codigoMateria -> 200", async () => {
    const res = await request(app)
      .put("/estudiante-materia/1/101")
      .send({ nota: 4.5 });
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Nota actualizada");
  });

  it("DELETE /estudiante-materia/:codigoEstudiante/:codigoMateria -> 200", async () => {
    const res = await request(app).delete("/estudiante-materia/1/101");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Inscripción eliminada");
  });
});