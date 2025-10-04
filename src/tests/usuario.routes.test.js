import request from "supertest";
import express from "express";
import usuarioRoutes from "../routes/usuario.route.js";
import UsuarioRepositorio from "../repositories/usuario.repository.js";

jest.mock("../repositories/usuario.repository.js");

const app = express();
app.use(express.json());
app.use("/usuario", usuarioRoutes);

describe("Rutas Usuario", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /usuario -> 200", async () => {
    UsuarioRepositorio.obtenerTodos.mockResolvedValue([{ codigo: "USR001", nombre: "Juan" }]);
    const res = await request(app).get("/usuario");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ codigo: "USR001", nombre: "Juan" }]);
  });

  it("GET /usuario/:codigo -> 200", async () => {
    UsuarioRepositorio.buscarPorCodigo.mockResolvedValue({ codigo: "USR001", nombre: "Juan" });
    const res = await request(app).get("/usuario/USR001");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ codigo: "USR001", nombre: "Juan" });
  });

  it("GET /usuario/:codigo -> 404", async () => {
    UsuarioRepositorio.buscarPorCodigo.mockResolvedValue(null);
    const res = await request(app).get("/usuario/USR999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ mensaje: "Usuario no encontrado" });
  });

  it("PUT /usuario/:codigo -> 200", async () => {
    UsuarioRepositorio.actualizar.mockResolvedValue({ codigo: "USR001", nombre: "Carlos", rol: "Docente" });
    const res = await request(app)
      .put("/usuario/USR001")
      .send({ nombre: "Carlos", rol: "Docente", contraseña: "newpass" });
    expect(res.statusCode).toBe(200);
    expect(res.body.usuario).toHaveProperty("nombre", "Carlos");
  });

  it("PUT /usuario/:codigo -> 404", async () => {
    UsuarioRepositorio.actualizar.mockRejectedValue(new Error("Usuario no encontrado"));
    const res = await request(app).put("/usuario/USR999").send({ nombre: "Carlos" });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("mensaje", "Usuario no encontrado");
  });

  it("DELETE /usuario/:codigo -> 200", async () => {
    UsuarioRepositorio.eliminar.mockResolvedValue();
    const res = await request(app).delete("/usuario/USR001");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ mensaje: "Usuario eliminado correctamente" });
  });

  it("DELETE /usuario/:codigo -> 404", async () => {
    UsuarioRepositorio.eliminar.mockRejectedValue(new Error("Usuario no encontrado"));
    const res = await request(app).delete("/usuario/USR999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("mensaje", "Usuario no encontrado");
  });
});