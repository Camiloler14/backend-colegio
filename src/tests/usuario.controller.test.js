import request from "supertest";
import express from "express";
import {
  loginUsuario,
  registrarUsuario,
  obtenerTodosUsuarios,
  actualizarUsuarioController,
  eliminarUsuarioController,
} from "../controllers/usuario.controller.js";

// Mock de los servicios
jest.mock("../services/usuario.service.js", () => ({
  login: jest.fn(),
  crearUsuario: jest.fn(),
  obtenerUsuarios: jest.fn(),
  actualizarUsuario: jest.fn(),
  eliminarUsuario: jest.fn(),
}));

import {
  login,
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} from "../services/usuario.service.js";

// Configurar Express para testing
const app = express();
app.use(express.json());
app.post("/login", loginUsuario);
app.post("/usuarios", registrarUsuario);
app.get("/usuarios", obtenerTodosUsuarios);
app.put("/usuarios/:codigo", actualizarUsuarioController);
app.delete("/usuarios/:codigo", eliminarUsuarioController);

describe("UsuarioController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Login usuario - éxito", async () => {
    login.mockResolvedValue({ token: "abc123", rol: "admin", nombre: "Juan" });

    const res = await request(app).post("/login").send({ codigo: "1001", password: "1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Login exitoso");
    expect(res.body).toHaveProperty("token", "abc123");
    expect(res.body).toHaveProperty("rol", "admin");
    expect(res.body).toHaveProperty("nombre", "Juan");
  });

  test("Login usuario - faltan campos", async () => {
    const res = await request(app).post("/login").send({ codigo: "1001" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("mensaje", "Código y contraseña son obligatorios");
  });

  test("Registrar usuario - éxito", async () => {
    crearUsuario.mockResolvedValue({ codigo: "1002", nombre: "Carlos", rol: "docente" });

    const res = await request(app)
      .post("/usuarios")
      .send({ codigo: "1002", nombre: "Carlos", contraseña: "1234", rol: "docente" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("mensaje", "Usuario creado correctamente");
    expect(res.body.usuario).toHaveProperty("codigo", "1002");
  });

  test("Obtener todos los usuarios - éxito", async () => {
    obtenerUsuarios.mockResolvedValue([
      { codigo: "1001", nombre: "Juan", rol: "admin" }
    ]);

    const res = await request(app).get("/usuarios");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ codigo: "1001", nombre: "Juan", rol: "admin" }]);
  });

  test("Actualizar usuario - éxito", async () => {
    actualizarUsuario.mockResolvedValue({ codigo: "1001", nombre: "Juan Updated" });

    const res = await request(app).put("/usuarios/1001").send({ nombre: "Juan Updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Usuario actualizado correctamente");
    expect(res.body.usuario).toHaveProperty("nombre", "Juan Updated");
  });

  test("Eliminar usuario - éxito", async () => {
    eliminarUsuario.mockResolvedValue(true);

    const res = await request(app).delete("/usuarios/1001");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Usuario eliminado correctamente");
  });
});
