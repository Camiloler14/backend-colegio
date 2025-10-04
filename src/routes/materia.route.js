import { Router } from "express";
import { MateriaController } from "../controllers/materia.controller.js";
import { verificarToken } from "../middlewares/usuario.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Materia
 *   description: Gestión de materias
 */

/**
 * @swagger
 * /materia:
 *   post:
 *     summary: Crear una nueva materia
 *     tags: [Materia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreMateria
 *               - codigoDocente
 *             properties:
 *               nombreMateria:
 *                 type: string
 *                 description: Nombre de la materia
 *               codigoDocente:
 *                 type: integer
 *                 description: Código del docente asignado
 *     responses:
 *       201:
 *         description: Materia creada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/", verificarToken, MateriaController.crear);

/**
 * @swagger
 * /materia:
 *   get:
 *     summary: Listar todas las materias
 *     tags: [Materia]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de materias
 *       401:
 *         description: No autorizado
 */
router.get("/", verificarToken, MateriaController.listar);

/**
 * @swagger
 * /materia/{id}:
 *   get:
 *     summary: Obtener una materia por su ID
 *     tags: [Materia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la materia
 *     responses:
 *       200:
 *         description: Información de la materia
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Materia no encontrada
 */
router.get("/:id", verificarToken, MateriaController.obtener);

/**
 * @swagger
 * /materia/{id}:
 *   put:
 *     summary: Actualizar una materia
 *     tags: [Materia]
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               nombreMateria:
 *                 type: string
 *                 description: Nombre de la materia
 *               codigoDocente:
 *                 type: integer
 *                 description: Código del docente asignado
 *     responses:
 *       200:
 *         description: Materia actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Materia no encontrada
 */
router.put("/:id", verificarToken, MateriaController.actualizar);

/**
 * @swagger
 * /materia/{id}:
 *   delete:
 *     summary: Eliminar una materia
 *     tags: [Materia]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Materia no encontrada
 */
router.delete("/:id", verificarToken, MateriaController.eliminar);

export default router;
