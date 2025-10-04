import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsuarioRepositorio from "../repositories/usuario.repository.js";

const JWT_SECRET = process.env.JWT_SECRET || "open system";

async function login(codigo, password) {
  try {
    const usuario = await UsuarioRepositorio.buscarPorCodigo(codigo);

    if (!usuario) {
      throw { status: 404, message: "El usuario no se encuentra registrado." };
    }

    const isValid = await bcrypt.compare(password, usuario.contraseña);
    if (!isValid) {
      throw { status: 401, message: "La contraseña ingresada es incorrecta." };
    }

    const token = jwt.sign(
      { codigo: usuario.codigo, nombre: usuario.nombre, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, rol: usuario.rol, nombre: usuario.nombre };
  } catch (error) {
    console.error("Error en login:", error);
    if (error.status && error.message) {
      throw error;
    }
    throw { status: 500, message: "Ocurrió un error en el servidor." };
  }
}

async function crearUsuario(datosUsuario) {
  try {
    if (datosUsuario.contraseña) {
      datosUsuario.contraseña = await bcrypt.hash(datosUsuario.contraseña, 10);
    }

    return await UsuarioRepositorio.crear(datosUsuario);
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw { status: 500, message: "Error al crear usuario" };
  }
}

async function obtenerUsuarios() {
  try {
    return await UsuarioRepositorio.obtenerTodos();
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw { status: 500, message: "Error al obtener usuarios" };
  }
}

async function actualizarUsuario(codigo, datosUsuario) {
  try {
    if (datosUsuario.contraseña) {
      datosUsuario.contraseña = await bcrypt.hash(datosUsuario.contraseña, 10);
    }

    return await UsuarioRepositorio.actualizar(codigo, datosUsuario);
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw { status: 500, message: "Error al actualizar usuario" };
  }
}

async function eliminarUsuario(codigo) {
  try {
    return await UsuarioRepositorio.eliminar(codigo);
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    throw { status: 500, message: "Error al eliminar usuario" };
  }
}

export {
  login,
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
};
