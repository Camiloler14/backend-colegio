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
 *         primerNombre:
 *           type: string
 *           example: Juan
 *           description: El primer nombre del docente
 *         segundoNombre:
 *           type: string
 *           example: Carlos
 *           description: El segundo nombre del docente (opcional)
 *         primerApellido:
 *           type: string
 *           example: Pérez
 *           description: El primer apellido del docente
 *         segundoApellido:
 *           type: string
 *           example: Gómez
 *           description: El segundo apellido del docente
 *         email:
 *           type: string
 *           example: juan.perez@example.com
 *           description: Correo electrónico del docente
 *         telefono:
 *           type: string
 *           example: "3124567890"
 *           description: Número de teléfono del docente
 *         direccion:
 *           type: string
 *           example: Calle 123 #45-67
 *           description: Dirección de residencia
 *         fecha_ingreso:
 *           type: string
 *           format: date
 *           example: "2023-08-15"
 *           description: Fecha de ingreso al colegio
 *         documento:
 *           type: integer
 *           example: 1020304050
 *           description: Número de documento del docente
 */

/**
 * @swagger
 * /api/teachers:
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
 *         description: Error interno
 */
router.post('/teachers', verificarToken, crearDocente);

/**
 * @swagger
 * /api/teachers:
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
router.get('/teachers', verificarToken, obtenerDocentes);

/**
 * @swagger
 * /api/teachers/{documento}:
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
 *     responses:
 *       200:
 *         description: Docente actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Docente'
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
router.delete('/teachers/:documento', verificarToken, eliminarDocente);

export default router;

