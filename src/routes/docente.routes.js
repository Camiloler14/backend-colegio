import express from "express";
import {
  crearDocente,
  obtenerDocentePorCodigo,
  obtenerTodosDocentes,
  actualizarDocente,
  eliminarDocente,
} from "../controllers/docente.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Docentes
 *   description: Endpoints para la gestión de docentes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Docente:
 *       type: object
 *       required:
 *         - codDocente
 *         - documento
 *         - primerNombre
 *         - primerApellido
 *         - email
 *         - telefono
 *         - direccion
 *         - barrio
 *         - ciudad
 *         - fechaIngreso
 *       properties:
 *         codDocente:
 *           type: string
 *           description: Código único del docente (coincide con el código de usuario)
 *         documento:
 *           type: integer
 *           description: Documento de identidad del docente
 *         primerNombre:
 *           type: string
 *         segundoNombre:
 *           type: string
 *         primerApellido:
 *           type: string
 *         segundoApellido:
 *           type: string
 *         email:
 *           type: string
 *         telefono:
 *           type: string
 *         direccion:
 *           type: string
 *         barrio:
 *           type: string
 *         ciudad:
 *           type: string
 *         fechaIngreso:
 *           type: string
 *           format: date
 *       example:
 *         codDocente: "DOC001"
 *         documento: 123456789
 *         primerNombre: "Carlos"
 *         segundoNombre: "Andrés"
 *         primerApellido: "García"
 *         segundoApellido: "Pérez"
 *         email: "carlos.garcia@colegio.com"
 *         telefono: "3156789098"
 *         direccion: "Calle 10 # 5-33"
 *         barrio: "San Antonio"
 *         ciudad: "Cali"
 *         fechaIngreso: "2024-03-15"
 */

/**
 * @swagger
 * /api/docente:
 *   post:
 *     summary: Crear un nuevo docente
 *     tags: [Docentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Docente'
 *     responses:
 *       201:
 *         description: Docente creado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", verificarToken, crearDocente);

/**
 * @swagger
 * /api/docente:
 *   get:
 *     summary: Obtener todos los docentes
 *     tags: [Docentes]
 *     responses:
 *       200:
 *         description: Lista de todos los docentes registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Docente'
 */
router.get("/", verificarToken, obtenerTodosDocentes);

/**
 * @swagger
 * /api/docente/{codDocente}:
 *   get:
 *     summary: Obtener un docente por su código
 *     tags: [Docentes]
 *     parameters:
 *       - in: path
 *         name: codDocente
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del docente
 *     responses:
 *       200:
 *         description: Docente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Docente'
 *       404:
 *         description: Docente no encontrado
 */
router.get("/:codDocente", verificarToken, obtenerDocentePorCodigo);

/**
 * @swagger
 * /api/docente/{codDocente}:
 *   put:
 *     summary: Actualizar un docente existente
 *     tags: [Docentes]
 *     parameters:
 *       - in: path
 *         name: codDocente
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del docente a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Docente'
 *     responses:
 *       200:
 *         description: Docente actualizado correctamente
 *       404:
 *         description: Docente no encontrado
 */
router.put("/:codDocente", verificarToken, actualizarDocente);

/**
 * @swagger
 * /api/docente/{codDocente}:
 *   delete:
 *     summary: Eliminar un docente por su código
 *     tags: [Docentes]
 *     parameters:
 *       - in: path
 *         name: codDocente
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del docente
 *     responses:
 *       200:
 *         description: Docente eliminado correctamente
 *       404:
 *         description: Docente no encontrado
 */
router.delete("/:codDocente", verificarToken, eliminarDocente);

export default router;
