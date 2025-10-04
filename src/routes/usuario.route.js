import express from "express";
import {
  loginUsuario,
  registrarUsuario,
} from "../controllers/usuario.controller.js";
import UsuarioRepositorio from "../repositories/usuario.repository.js";
import bcrypt from "bcrypt";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       500:
 *         description: Error al obtener usuarios
 */
router.get("/", async (req, res) => {
  try {
    const usuarios = await UsuarioRepositorio.obtenerTodos();
    res.json(usuarios);
  } catch {
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
});

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: "USR001"
 *               contraseña:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", loginUsuario);

/**
 * @swagger
 * /usuario/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: "USR002"
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               rol:
 *                 type: string
 *                 example: "Admin"
 *               contraseña:
 *                 type: string
 *                 example: "mypassword123"
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/register", registrarUsuario);

/**
 * @swagger
 * /usuario/{codigo}:
 *   get:
 *     summary: Obtener un usuario por código
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         example: "USR001"
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:codigo", async (req, res) => {
  try {
    const usuario = await UsuarioRepositorio.buscarPorCodigo(req.params.codigo);
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(usuario);
  } catch {
    res.status(500).json({ mensaje: "Error al obtener usuario" });
  }
});

/**
 * @swagger
 * /usuario/{codigo}:
 *   put:
 *     summary: Actualizar un usuario por código
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         example: "USR001"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Carlos Gómez"
 *               rol:
 *                 type: string
 *                 example: "Docente"
 *               contraseña:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/:codigo", async (req, res) => {
  try {
    let datos = { nombre: req.body.nombre, rol: req.body.rol };
    if (req.body.contraseña)
      datos.contraseña = await bcrypt.hash(req.body.contraseña, 10);

    const actualizado = await UsuarioRepositorio.actualizar(
      req.params.codigo,
      datos
    );
    res.json({
      mensaje: "Usuario actualizado correctamente",
      usuario: actualizado,
    });
  } catch (error) {
    res
      .status(error.message.includes("no encontrado") ? 404 : 500)
      .json({ mensaje: error.message });
  }
});

/**
 * @swagger
 * /usuario/{codigo}:
 *   delete:
 *     summary: Eliminar un usuario por código
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         example: "USR001"
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/:codigo", async (req, res) => {
  try {
    await UsuarioRepositorio.eliminar(req.params.codigo);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res
      .status(error.message.includes("no encontrado") ? 404 : 500)
      .json({ mensaje: error.message });
  }
});

export default router;
