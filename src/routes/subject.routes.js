import { Router } from 'express';
import * as subjectController from '../controllers/subject.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Materias
 *   description: Operaciones para gestión de materias
 */

/**
 * @swagger
 * /subjects:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener todas las materias
 *     tags: [Materias]
 *     responses:
 *       200:
 *         description: Lista de materias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Materia'
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.get('/subjects', verificarToken, subjectController.getAllSubjects);

/**
 * @swagger
 * /subjects/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener una materia por ID
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la materia
 *     responses:
 *       200:
 *         description: Materia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Materia'
 *       404:
 *         description: Materia no encontrada
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.get('/subjects/:id', verificarToken, subjectController.getSubjectById);

/**
 * @swagger
 * /subjects:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Crear una nueva materia
 *     tags: [Materias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MateriaInput'
 *     responses:
 *       201:
 *         description: Materia creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Materia'
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.post('/subjects', verificarToken, subjectController.createSubject);

/**
 * @swagger
 * /subjects/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Actualizar una materia existente
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la materia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MateriaInput'
 *     responses:
 *       200:
 *         description: Materia actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Materia'
 *       404:
 *         description: Materia no encontrada
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.put('/subjects/:id', verificarToken, subjectController.updateSubject);

/**
 * @swagger
 * /subjects/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Eliminar una materia por ID
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la materia
 *     responses:
 *       200:
 *         description: Materia eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Materia eliminada correctamente
 *       404:
 *         description: Materia no encontrada
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.delete('/subjects/:id', verificarToken, subjectController.deleteSubject);

export default router;
