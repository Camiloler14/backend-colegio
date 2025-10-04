import express from "express";
import { verificarToken } from "../middlewares/usuario.middleware.js";
import {
  crearEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
  obtenerEstudiante,
  obtenerEstudiantes,
} from "../controllers/estudiante.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Estudiantes
 *     description: Operaciones relacionadas con estudiantes y su usuario
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Estudiante:
 *       type: object
 *       properties:
 *         usuarioCodigo:
 *           type: integer
 *           description: Código único del usuario asociado al estudiante
 *         contraseña:
 *           type: string
 *           description: Contraseña del usuario asociado
 *         identificacion:
 *           type: integer
 *           description: Número de identificación del estudiante
 *         primerNombre:
 *           type: string
 *         segundoNombre:
 *           type: string
 *           nullable: true
 *         primerApellido:
 *           type: string
 *         segundoApellido:
 *           type: string
 *           nullable: true
 *         edad:
 *           type: integer
 *         genero:
 *           type: string
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *         acudiente1:
 *           type: string
 *         telefonoAcudiente1:
 *           type: string
 *         acudiente2:
 *           type: string
 *           nullable: true
 *         telefonoAcudiente2:
 *           type: string
 *           nullable: true
 *         direccion:
 *           type: string
 *         barrio:
 *           type: string
 *         ciudad:
 *           type: string
 *         fechaMatricula:
 *           type: string
 *           format: date
 *         fechaIngreso:
 *           type: string
 *           format: date
 *         grado:
 *           type: integer
 *         estado:
 *           type: string
 *         observaciones:
 *           type: string
 *           nullable: true
 *       required:
 *         - usuarioCodigo
 *         - contraseña
 *         - identificacion
 *         - primerNombre
 *         - primerApellido
 *         - edad
 *         - genero
 *         - fechaNacimiento
 *         - acudiente1
 *         - telefonoAcudiente1
 *         - direccion
 *         - barrio
 *         - ciudad
 *         - fechaMatricula
 *         - fechaIngreso
 *         - grado
 *         - estado
 */

/**
 * @swagger
 * /api/estudiante:
 *   post:
 *     summary: Crear un nuevo estudiante con usuario asociado
 *     tags:
 *       - Estudiantes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del estudiante y su usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       201:
 *         description: Estudiante creado correctamente con usuario asociado
 *       400:
 *         description: Faltan campos obligatorios o código ya existe
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", verificarToken, crearEstudiante);

/**
 * @swagger
 * /api/estudiante/{identificacion}:
 *   put:
 *     summary: Actualizar un estudiante existente
 *     tags:
 *       - Estudiantes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: identificacion
 *         in: path
 *         description: Identificación del estudiante a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Datos a actualizar del estudiante
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       200:
 *         description: Estudiante actualizado correctamente
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:identificacion", verificarToken, actualizarEstudiante);

/**
 * @swagger
 * /api/estudiante/{identificacion}:
 *   delete:
 *     summary: Eliminar un estudiante y su usuario asociado
 *     tags:
 *       - Estudiantes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: identificacion
 *         in: path
 *         description: Identificación del estudiante a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante eliminado correctamente
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:identificacion", verificarToken, eliminarEstudiante);

/**
 * @swagger
 * /api/estudiante:
 *   get:
 *     summary: Obtener lista de todos los estudiantes con usuario
 *     tags:
 *       - Estudiantes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", verificarToken, obtenerEstudiantes);

/**
 * @swagger
 * /api/estudiante/{identificacion}:
 *   get:
 *     summary: Obtener un estudiante por identificación
 *     tags:
 *       - Estudiantes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: identificacion
 *         in: path
 *         description: Identificación del estudiante
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:identificacion", verificarToken, obtenerEstudiante);

export default router;
