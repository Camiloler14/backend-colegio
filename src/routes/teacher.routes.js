import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';  
import {
  crearDocente,
  obtenerDocentes,
  obtenerDocente,
  actualizarDocente,
  eliminarDocente
} from '../controllers/teacher.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Docentes
 *     description: Operaciones relacionadas con docentes
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
 *         id:
 *           type: integer
 *           description: El ID del docente
 *         primerNombre:
 *           type: string
 *           description: El primer nombre del docente
 *         segundoNombre:
 *           type: string
 *           description: El segundo nombre del docente
 *         primerApellido:
 *           type: string
 *           description: El primer apellido del docente
 *         segundoApellido:
 *           type: string
 *           description: El segundo apellido del docente
 *         email:
 *           type: string
 *           description: El email del docente
 *         telefono:
 *           type: string
 *           description: El teléfono del docente
 *         direccion:
 *           type: string
 *           description: La dirección del docente
 *         fecha_ingreso:
 *           type: string
 *           format: date
 *           description: La fecha de ingreso del docente
 *         documento:
 *           type: string
 *           description: El documento de identidad del docente
 */

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     tags:
 *       - Docentes
 *     summary: Crear un nuevo docente
 *     description: Crea un nuevo docente en la base de datos.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Docente'
 *     responses:
 *       201:
 *         description: Docente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Docente'
 *       400:
 *         description: Datos faltantes o incorrectos
 *       500:
 *         description: Error al crear el docente
 */
router.post('/teachers', verificarToken, crearDocente);

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     tags:
 *       - Docentes
 *     summary: Obtener todos los docentes
 *     description: Obtiene una lista de todos los docentes registrados.
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
router.get('/teachers', verificarToken, obtenerDocentes);

/**
 * @swagger
 * /api/teachers/{documento}:
 *   get:
 *     tags:
 *       - Docentes
 *     summary: Obtener docente por documento
 *     description: Obtiene un docente a través de su número de documento de identidad.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documento
 *         required: true
 *         description: El número de documento del docente.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Docente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Docente'
 *       404:
 *         description: Docente no encontrado
 *       500:
 *         description: Error al obtener el docente
 */
router.get('/teachers/:documento', verificarToken, obtenerDocente);

/**
 * @swagger
 * /api/teachers/{documento}:
 *   put:
 *     tags:
 *       - Docentes
 *     summary: Actualizar docente
 *     description: Actualiza los datos de un docente existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documento
 *         required: true
 *         description: El número de documento del docente.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Docente'
 *     responses:
 *       200:
 *         description: Docente actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Docente'
 *       400:
 *         description: Datos faltantes o incorrectos
 *       404:
 *         description: Docente no encontrado
 *       500:
 *         description: Error al actualizar el docente
 */
router.put('/teachers/:documento', verificarToken, actualizarDocente);

/**
 * @swagger
 * /api/teachers/{documento}:
 *   delete:
 *     tags:
 *       - Docentes
 *     summary: Eliminar docente
 *     description: Elimina un docente de la base de datos por su documento de identidad.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documento
 *         required: true
 *         description: El número de documento del docente.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Docente eliminado
 *       404:
 *         description: Docente no encontrado
 *       500:
 *         description: Error al eliminar el docente
 */
router.delete('/teachers/:documento', verificarToken, eliminarDocente);

export default router;

