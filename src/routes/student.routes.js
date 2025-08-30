import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import {
  crearEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
  obtenerEstudiante,
  obtenerEstudiantes
} from '../controllers/student.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Estudiantes
 *     description: Operaciones relacionadas con estudiantes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Estudiante:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del estudiante
 *         identificacion:
 *           type: string
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
 *         antiguedad:
 *           type: integer
 *         grado:
 *           type: string
 *         estado:
 *           type: string
 *         observaciones:
 *           type: string
 *           nullable: true
 *       required:
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
 *         - antiguedad
 *         - grado
 *         - estado
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags:
 *       - Estudiantes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del estudiante
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       201:
 *         description: Estudiante creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error interno del servidor
 */
router.post('/students', verificarToken, crearEstudiante);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Actualizar un estudiante existente
 *     tags:
 *       - Estudiantes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estudiante a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Datos a actualizar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       200:
 *         description: Estudiante actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/students/:id', verificarToken, actualizarEstudiante);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Eliminar un estudiante por ID
 *     tags:
 *       - Estudiantes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estudiante a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/students/:id', verificarToken, eliminarEstudiante);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Obtener lista de estudiantes
 *     tags:
 *       - Estudiantes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estudiante'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/students', verificarToken, obtenerEstudiantes);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Obtener un estudiante por ID
 *     tags:
 *       - Estudiantes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estudiante
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/students/:id', verificarToken, obtenerEstudiante);

export default router;
