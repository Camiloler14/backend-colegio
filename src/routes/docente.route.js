import express from "express";
import { verificarToken } from "../middlewares/usuario.middleware.js";
import {
  crearDocente,
  obtenerDocentes,
  obtenerDocente,
  actualizarDocente,
  eliminarDocente,
} from "../controllers/docente.controller.js";

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
 *         - primerNombre
 *         - primerApellido
 *         - email
 *         - documento
 *         - fecha_ingreso
 *       properties:
 *         primerNombre:
 *           type: string
 *           description: El primer nombre del docente
 *           example: Juan
 *         segundoNombre:
 *           type: string
 *           description: El segundo nombre del docente (opcional)
 *           example: Carlos
 *         primerApellido:
 *           type: string
 *           description: El primer apellido del docente
 *           example: Pérez
 *         segundoApellido:
 *           type: string
 *           description: El segundo apellido del docente
 *           example: Gómez
 *         email:
 *           type: string
 *           description: Correo electrónico del docente
 *           example: juan.perez@example.com
 *         telefono:
 *           type: string
 *           description: Número de teléfono del docente
 *           example: "3124567890"
 *         direccion:
 *           type: string
 *           description: Dirección de residencia
 *           example: Calle 123 #45-67
 *         fecha_ingreso:
 *           type: string
 *           format: date
 *           description: Fecha de ingreso al colegio
 *           example: "2023-08-15"
 *         documento:
 *           type: integer
 *           description: Número de documento del docente
 *           example: 1020304050
 *         codigo:
 *           type: integer
 *           description: Código del docente, usado como relación con Usuario
 *           example: 101
 */

/**
 * @swagger
 * /api/docente:
 *   post:
 *     tags: [Docentes]
 *     summary: Crear un nuevo docente
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Docente'
 *           example:
 *             primerNombre: Juan
 *             segundoNombre: Carlos
 *             primerApellido: Pérez
 *             segundoApellido: Gómez
 *             email: juan.perez@example.com
 *             telefono: "3124567890"
 *             direccion: Calle 123 #45-67
 *             fecha_ingreso: "2023-08-15"
 *             documento: 1020304050
 *     responses:
 *       201:
 *         description: Docente creado exitosamente
 *       400:
 *         description: Datos faltantes o incorrectos
 *       500:
 *         description: Error interno
 */
router.post("/", verificarToken, crearDocente);

/**
 * @swagger
 * /api/docente:
 *   get:
 *     tags: [Docentes]
 *     summary: Obtener todos los docentes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de docentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Docente'
 *       500:
 *         description: Error al obtener los docentes
 */
router.get("/", verificarToken, obtenerDocentes);

/**
 * @swagger
 * /api/docente/{documento}:
 *   get:
 *     tags: [Docentes]
 *     summary: Obtener docente por documento
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documento
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número de documento del docente
 *     responses:
 *       200:
 *         description: Docente encontrado
 *       404:
 *         description: Docente no encontrado
 *       500:
 *         description: Error al obtener el docente
 */
router.get("/:documento", verificarToken, obtenerDocente);

/**
 * @swagger
 * /api/docente/{documento}:
 *   put:
 *     tags: [Docentes]
 *     summary: Actualizar docente por documento
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documento
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número de documento del docente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Docente'
 *           example:
 *             primerNombre: Juan
 *             primerApellido: Pérez
 *             email: juan.perez@nuevo.com
 *             telefono: "3001234567"
 *             direccion: Carrera 12 #34-56
 *             fecha_ingreso: "2024-01-10"
 *     responses:
 *       200:
 *         description: Docente actualizado
 *       404:
 *         description: Docente no encontrado
 *       500:
 *         description: Error al actualizar el docente
 */
router.put("/:documento", verificarToken, actualizarDocente);

/**
 * @swagger
 * /api/docente/{documento}:
 *   delete:
 *     tags: [Docentes]
 *     summary: Eliminar docente por documento
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documento
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número de documento del docente
 *     responses:
 *       200:
 *         description: Docente eliminado correctamente
 *       404:
 *         description: Docente no encontrado
 *       500:
 *         description: Error al eliminar el docente
 */
router.delete("/:documento", verificarToken, eliminarDocente);

export default router;
