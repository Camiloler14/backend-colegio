import { Router } from "express";
import {
  crearEstudiante,
  obtenerTodosEstudiantes,
  obtenerEstudiantePorCodigo,
  actualizarEstudiante,
  eliminarEstudiante,
} from "../controllers/estudiante.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";

const router = Router();

/**
 * @swagger
 * /estudiante:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Estudiante]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       201:
 *         description: Estudiante creado
 *       400:
 *         description: Error de validación
 */
router.post("/", verificarToken, crearEstudiante);

/**
 * @swagger
 * /estudiante:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiante]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 */
router.get("/", verificarToken, obtenerTodosEstudiantes);

/**
 * @swagger
 * /estudiante/{codEstudiante}:
 *   get:
 *     summary: Obtener un estudiante por código
 *     tags: [Estudiante]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codEstudiante
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del estudiante
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *       404:
 *         description: Estudiante no encontrado
 */
router.get("/:codEstudiante", verificarToken, obtenerEstudiantePorCodigo);

/**
 * @swagger
 * /estudiante/{codEstudiante}:
 *   put:
 *     summary: Actualizar un estudiante
 *     tags: [Estudiante]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codEstudiante
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       200:
 *         description: Estudiante actualizado
 *       400:
 *         description: Error de validación
 */
router.put("/:codEstudiante", verificarToken, actualizarEstudiante);

/**
 * @swagger
 * /estudiante/{codEstudiante}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     tags: [Estudiante]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codEstudiante
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del estudiante
 *     responses:
 *       200:
 *         description: Estudiante eliminado
 *       400:
 *         description: Error de validación
 */
router.delete("/:codEstudiante", verificarToken, eliminarEstudiante);

export default router;
