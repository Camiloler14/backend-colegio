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
 * components:
 *   schemas:
 *     Materia:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           example: ESP101
 *         nombre:
 *           type: string
 *           example: Español
 *         intensidad_horaria:
 *           type: integer
 *           example: 5
 *         docenteDocumento:
 *           type: integer
 *           example: 1234
 *
 *     MateriaInput:
 *       type: object
 *       required:
 *         - codigo
 *         - nombre
 *         - intensidad_horaria
 *         - docenteDocumento
 *       properties:
 *         codigo:
 *           type: string
 *           example: ESP101
 *         nombre:
 *           type: string
 *           example: Español
 *         intensidad_horaria:
 *           type: integer
 *           example: 5
 *         docenteDocumento:
 *           type: integer
 *           example: 1234
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
 * /subjects/{codigo}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener una materia por código
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Código de la materia (ej. MAT101)
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
router.get('/subjects/:codigo', verificarToken, subjectController.getSubjectByCodigo);

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
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.post('/subjects', verificarToken, subjectController.createSubject);

/**
 * @swagger
 * /subjects/{codigo}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Actualizar una materia por código
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Código de la materia (ej. MAT101)
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
router.put('/subjects/:codigo', verificarToken, subjectController.updateSubjectByCodigo);

/**
 * @swagger
 * /subjects/{codigo}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Eliminar una materia por código
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Código de la materia (ej. MAT101)
 *     responses:
 *       200:
 *         description: Materia eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Materia eliminada correctamente
 *       404:
 *         description: Materia no encontrada
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.delete('/subjects/:codigo', verificarToken, subjectController.deleteSubjectByCodigo);

export default router;
