import { Router } from "express";
import { EstudianteMateriaController } from "../controllers/estudianteMateria.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: EstudianteMateria
 *   description: Gestión de inscripciones y notas de estudiantes en materias
 */

/**
 * @swagger
 * /estudiante-materia:
 *   post:
 *     summary: Inscribir un estudiante en una materia
 *     tags: [EstudianteMateria]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigoEstudiante
 *               - codigoMateria
 *             properties:
 *               codigoEstudiante:
 *                 type: integer
 *                 description: Código del estudiante
 *               codigoMateria:
 *                 type: integer
 *                 description: Código de la materia
 *     responses:
 *       201:
 *         description: Inscripción creada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/", verificarToken, EstudianteMateriaController.inscribir);

/**
 * @swagger
 * /estudiante-materia/estudiante/{codigoEstudiante}:
 *   get:
 *     summary: Obtener todas las materias de un estudiante
 *     tags: [EstudianteMateria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigoEstudiante
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código del estudiante
 *     responses:
 *       200:
 *         description: Lista de materias inscritas
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Estudiante no encontrado
 */
router.get("/estudiante/:codigoEstudiante", verificarToken, EstudianteMateriaController.obtenerPorEstudiante);

/**
 * @swagger
 * /estudiante-materia/materia/{codigoMateria}:
 *   get:
 *     summary: Obtener todos los estudiantes inscritos en una materia
 *     tags: [EstudianteMateria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigoMateria
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la materia
 *     responses:
 *       200:
 *         description: Lista de estudiantes inscritos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Materia no encontrada
 */
router.get("/materia/:codigoMateria", verificarToken, EstudianteMateriaController.obtenerPorMateria);

/**
 * @swagger
 * /estudiante-materia/{codigoEstudiante}/{codigoMateria}:
 *   put:
 *     summary: Actualizar las notas de un estudiante en una materia
 *     tags: [EstudianteMateria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigoEstudiante
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código del estudiante
 *       - in: path
 *         name: codigoMateria
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la materia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: number
 *                 description: Nueva nota del estudiante
 *     responses:
 *       200:
 *         description: Nota actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Estudiante o materia no encontrada
 */
router.put("/:codigoEstudiante/:codigoMateria", verificarToken, EstudianteMateriaController.actualizarNotas);

/**
 * @swagger
 * /estudiante-materia/{codigoEstudiante}/{codigoMateria}:
 *   delete:
 *     summary: Eliminar inscripción de un estudiante en una materia
 *     tags: [EstudianteMateria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigoEstudiante
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código del estudiante
 *       - in: path
 *         name: codigoMateria
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código de la materia
 *     responses:
 *       200:
 *         description: Inscripción eliminada correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Inscripción no encontrada
 */
router.delete("/:codigoEstudiante/:codigoMateria", verificarToken, EstudianteMateriaController.eliminar);

export default router;
