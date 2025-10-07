import { Router } from "express";
import {
  crearUsuario,
  loginUsuario,
  obtenerUsuarioPorCodigo,
  obtenerTodosUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/usuario.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";

const router = Router();

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Error de validación
 */
router.post("/", crearUsuario);

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codUsuario:
 *                 type: string
 *                 example: "123456"
 *               contraseña:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token
 *       401:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Usuario no encontrado
 */
router.post("/login", loginUsuario);

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", verificarToken, obtenerTodosUsuarios);

/**
 * @swagger
 * /usuario/{codUsuario}:
 *   get:
 *     summary: Obtener un usuario por código
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codUsuario
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:codUsuario", verificarToken, obtenerUsuarioPorCodigo);

/**
 * @swagger
 * /usuario/{codUsuario}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codUsuario
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Error de validación
 */
router.put("/:codUsuario", verificarToken, actualizarUsuario);

/**
 * @swagger
 * /usuario/{codUsuario}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codUsuario
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       400:
 *         description: Error de validación
 */
router.delete("/:codUsuario", verificarToken, eliminarUsuario);

export default router;
