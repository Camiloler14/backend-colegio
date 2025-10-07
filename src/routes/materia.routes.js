import { Router } from "express";
import {
  crearMateria,
  obtenerMaterias,
  obtenerMateriaPorCodigo,
  actualizarMateria,
  eliminarMateria,
} from "../controllers/materia.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Materias
 *   description: API para la gestión de materias
 */

/**
 * @swagger
 * /api/materia:
 *   get:
 *     summary: Obtener todas las materias
 *     tags: [Materias]
 *     responses:
 *       200:
 *         description: Lista de materias
 */
router.get("/", verificarToken, obtenerMaterias);

/**
 * @swagger
 * /api/materia/{codigoMateria}:
 *   get:
 *     summary: Obtener una materia por su código
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: codigoMateria
 *         schema:
 *           type: string
 *         required: true
 *         description: Código de la materia
 *     responses:
 *       200:
 *         description: Materia encontrada
 *       404:
 *         description: Materia no encontrada
 */
router.get("/:codigoMateria", verificarToken, obtenerMateriaPorCodigo);

/**
 * @swagger
 * /api/materia:
 *   post:
 *     summary: Crear una nueva materia
 *     tags: [Materias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigoMateria:
 *                 type: string
 *               nombreMateria:
 *                 type: string
 *               codDocente:
 *                 type: string
 *     responses:
 *       201:
 *         description: Materia creada correctamente
 */
router.post("/", verificarToken, crearMateria);

/**
 * @swagger
 * /api/materia/{codigoMateria}:
 *   put:
 *     summary: Actualizar una materia existente
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: codigoMateria
 *         schema:
 *           type: string
 *         required: true
 *         description: Código de la materia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreMateria:
 *                 type: string
 *               codDocente:
 *                 type: string
 *     responses:
 *       200:
 *         description: Materia actualizada correctamente
 */
router.put("/:codigoMateria", verificarToken, actualizarMateria);

/**
 * @swagger
 * /api/materia/{codigoMateria}:
 *   delete:
 *     summary: Eliminar una materia
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: codigoMateria
 *         schema:
 *           type: string
 *         required: true
 *         description: Código de la materia
 *     responses:
 *       200:
 *         description: Materia eliminada correctamente
 */
router.delete("/:codigoMateria", verificarToken, eliminarMateria);

export default router;
