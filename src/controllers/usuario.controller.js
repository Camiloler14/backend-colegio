import {
  login,
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} from "../services/usuario.service.js";

export async function loginUsuario(req, res) {
  const { codigo, password } = req.body;

  if (!codigo || !password) {
    console.log("Login fallido: faltan campos");
    return res
      .status(400)
      .json({ mensaje: "Código y contraseña son obligatorios" });
  }

  try {
    console.log("Intentando login para código:", codigo);
    const { token, rol, nombre } = await login(codigo, password);

    console.log("Login exitoso para usuario:", codigo);
    return res.json({ mensaje: "Login exitoso", token, rol, nombre });
  } catch (error) {
    console.error("Error en login:", error);

    if (error.status && error.message) {
      console.log("Motivo del error:", error.message);
      return res.status(error.status).json({ mensaje: error.message });
    }

    return res
      .status(500)
      .json({ mensaje: "Ocurrió un error en el servidor." });
  }
}

export async function registrarUsuario(req, res) {
  const { codigo, nombre, contraseña, rol } = req.body;

  if (!codigo || !nombre || !contraseña || !rol) {
    return res
      .status(400)
      .json({ mensaje: "Todos los campos son obligatorios" });
  }

  try {
    const usuario = await crearUsuario({ codigo, nombre, contraseña, rol });
    return res
      .status(201)
      .json({ mensaje: "Usuario creado correctamente", usuario });
  } catch (error) {
    console.error("Error creando usuario:", error);
    return res.status(error.status || 500).json({ mensaje: error.message });
  }
}

export async function obtenerTodosUsuarios(req, res) {
  try {
    const usuarios = await obtenerUsuarios();
    return res.json(usuarios);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return res.status(error.status || 500).json({ mensaje: error.message });
  }
}

export async function actualizarUsuarioController(req, res) {
  const { codigo } = req.params;
  const datos = req.body;

  try {
    const usuario = await actualizarUsuario(codigo, datos);
    return res.json({ mensaje: "Usuario actualizado correctamente", usuario });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return res.status(error.status || 500).json({ mensaje: error.message });
  }
}

export async function eliminarUsuarioController(req, res) {
  const { codigo } = req.params;

  try {
    await eliminarUsuario(codigo);
    return res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    return res.status(error.status || 500).json({ mensaje: error.message });
  }
}
