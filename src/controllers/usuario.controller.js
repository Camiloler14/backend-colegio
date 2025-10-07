import * as usuarioService from "../services/usuario.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "open system";

export const crearUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.crearUsuarioService(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerUsuarioPorCodigo = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerUsuarioPorCodigoService(
      req.params.codUsuario
    );
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerTodosUsuariosService();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const result = await usuarioService.actualizarUsuarioService(
      req.params.codUsuario,
      req.body
    );
    if (result[0] === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const deleted = await usuarioService.eliminarUsuarioService(
      req.params.codUsuario
    );
    if (!deleted)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { codUsuario, contraseña } = req.body;

    const usuario = await usuarioService.obtenerUsuarioPorCodigoService(
      codUsuario
    );
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match)
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign(
      { codUsuario: usuario.codUsuario, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ mensaje: "Login exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
