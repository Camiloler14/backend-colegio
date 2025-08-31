import express from 'express';
import { body, validationResult } from 'express-validator';
import { loginAdmin } from '../controllers/auth.controller.js';
import Admin from '../models/admin.model.js';

/**
 * @swagger
 * tags:
 *   - name: Autenticación
 *     description: Operaciones relacionadas con la autenticación y gestión de administradores.
 */

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión como administrador
 *     description: Autentica un administrador mediante su usuario y contraseña y retorna un token JWT.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - contraseña
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: El nombre de usuario del administrador
 *                 example: admin
 *               contraseña:
 *                 type: string
 *                 description: La contraseña del administrador
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login exitoso y token JWT generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Parámetros inválidos (usuario o contraseña faltantes)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "El usuario es obligatorio"
 *       401:
 *         description: Credenciales inválidas (usuario no encontrado o contraseña incorrecta)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Credenciales inválidas"
 */
router.post(
  '/login',
  [
    body('usuario').notEmpty().withMessage('El usuario es obligatorio'),
    body('contraseña').notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ mensaje: errors.array()[0].msg });
    }
    next();
  },
  loginAdmin
);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Crear un nuevo administrador
 *     description: Registra un nuevo administrador proporcionando un usuario y contraseña.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - contraseña
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: El nombre de usuario del nuevo administrador
 *                 example: admin2
 *               contraseña:
 *                 type: string
 *                 description: La contraseña para el nuevo administrador
 *                 example: password456
 *     responses:
 *       201:
 *         description: Administrador creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Administrador creado correctamente"
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "El usuario es obligatorio"
 *       409:
 *         description: El usuario ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "El usuario ya existe"
 */
router.post(
  '/register',
  [
    body('usuario').notEmpty().withMessage('El usuario es obligatorio'),
    body('contraseña').notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ mensaje: errors.array()[0].msg });
    }

    const { usuario, contraseña } = req.body;

    // Verifica si el usuario ya existe
    const existingAdmin = await Admin.findOne({ where: { usuario } });
    if (existingAdmin) {
      return res.status(409).json({ mensaje: "El usuario ya existe" });
    }

    // Crear nuevo administrador
    try {
      await Admin.create({ usuario, contraseña });
      return res.status(201).json({ mensaje: "Administrador creado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: "Error al crear el administrador" });
    }
  }
);

/**
 * @swagger
 * /auth/admin/{usuario}:
 *   get:
 *     summary: Obtener administrador por usuario
 *     description: Obtiene los detalles de un administrador utilizando su nombre de usuario.
 *     tags: [Autenticación]
 *     parameters:
 *       - in: path
 *         name: usuario
 *         required: true
 *         description: El nombre de usuario del administrador a buscar
 *         schema:
 *           type: string
 *           example: admin
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: string
 *                   description: El nombre de usuario del administrador
 *                   example: admin
 *                 fechaCreacion:
 *                   type: string
 *                   description: Fecha de creación del administrador
 *                   example: "2023-08-01T12:00:00.000Z"
 *       404:
 *         description: Administrador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Administrador no encontrado"
 */
router.get('/admin/:usuario', async (req, res) => {
  const { usuario } = req.params;
  const admin = await Admin.findOne({ where: { usuario } });
  if (!admin) {
    return res.status(404).json({ mensaje: "Administrador no encontrado" });
  }
  return res.json(admin);
});

/**
 * @swagger
 * /auth/admin/{usuario}:
 *   put:
 *     summary: Editar un administrador
 *     description: Permite editar los datos de un administrador utilizando su nombre de usuario.
 *     tags: [Autenticación]
 *     parameters:
 *       - in: path
 *         name: usuario
 *         required: true
 *         description: El nombre de usuario del administrador a editar
 *         schema:
 *           type: string
 *           example: admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contraseña
 *             properties:
 *               contraseña:
 *                 type: string
 *                 description: Nueva contraseña del administrador
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Administrador editado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Administrador editado correctamente"
 *       404:
 *         description: Administrador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Administrador no encontrado"
 */
router.put('/admin/:usuario', async (req, res) => {
  const { usuario } = req.params;
  const { contraseña } = req.body;
  const admin = await Admin.findOne({ where: { usuario } });
  if (!admin) {
    return res.status(404).json({ mensaje: "Administrador no encontrado" });
  }
  admin.contraseña = contraseña;
  await admin.save();
  return res.json({ mensaje: "Administrador editado correctamente" });
});

/**
 * @swagger
 * /auth/admin/{usuario}:
 *   delete:
 *     summary: Eliminar un administrador
 *     description: Elimina a un administrador utilizando su nombre de usuario.
 *     tags: [Autenticación]
 *     parameters:
 *       - in: path
 *         name: usuario
 *         required: true
 *         description: El nombre de usuario del administrador a eliminar
 *         schema:
 *           type: string
 *           example: admin
 *     responses:
 *       200:
 *         description: Administrador eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Administrador eliminado correctamente"
 *       404:
 *         description: Administrador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Administrador no encontrado"
 */
router.delete('/admin/:usuario', async (req, res) => {
  const { usuario } = req.params;
  const admin = await Admin.findOne({ where: { usuario } });
  if (!admin) {
    return res.status(404).json({ mensaje: "Administrador no encontrado" });
  }
  await admin.destroy();
  return res.json({ mensaje: "Administrador eliminado correctamente" });
});

export default router;
