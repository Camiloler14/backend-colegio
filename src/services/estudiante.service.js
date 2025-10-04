import bcrypt from "bcryptjs";
import EstudianteRepository from "../repositories/estudiante.repository.js";
import Usuario from "../models/usuario.model.js";
import Estudiante from "../models/estudiante.model.js";

export async function crearEstudianteService(data) {
  try {
    if (!data.usuarioCodigo) {
      throw new Error("El código del usuario es obligatorio");
    }

    let usuario = await Usuario.findByPk(data.usuarioCodigo);

    if (!usuario) {
      const contraseñaPorDefecto = "12345";
      const hashedPassword = await bcrypt.hash(contraseñaPorDefecto, 10);

      usuario = await Usuario.create({
        codigo: data.usuarioCodigo,
        nombre:
          data.primerNombre +
          (data.segundoNombre ? " " + data.segundoNombre : ""),
        contraseña: hashedPassword,
        rol: "estudiante",
      });
    }

    data.usuarioCodigo = usuario.codigo;

    const estudiante = await EstudianteRepository.crear(data);

    return {
      estudiante,
      usuario: {
        codigo: usuario.codigo,
        nombre: usuario.nombre,
        contraseña: "******",
      },
    };
  } catch (error) {
    throw new Error("Error creando estudiante: " + error.message);
  }
}

export async function actualizarEstudianteService(identificacion, data) {
  try {
    const estudiante = await EstudianteRepository.actualizarPorIdentificacion(
      identificacion,
      data
    );
    return estudiante;
  } catch (error) {
    throw new Error("Error actualizando estudiante: " + error.message);
  }
}

export async function eliminarEstudianteService(identificacion) {
  try {
    const result = await EstudianteRepository.eliminarPorIdentificacion(
      identificacion
    );
    if (!result.success) return false;

    return true;
  } catch (error) {
    throw new Error("Error eliminando estudiante: " + error.message);
  }
}

export async function obtenerEstudiantesService() {
  try {
    const estudiantes = await Estudiante.findAll({
      include: { model: Usuario, as: "usuario" },
      order: [["primerNombre", "ASC"]],
    });

    return estudiantes;
  } catch (error) {
    throw new Error("Error obteniendo estudiantes: " + error.message);
  }
}

export async function obtenerEstudiantePorIdentificacionService(
  identificacion
) {
  try {
    const estudiante = await Estudiante.findOne({
      where: { identificacion },
      include: { model: Usuario, as: "usuario" },
    });

    return estudiante;
  } catch (error) {
    throw new Error("Error obteniendo estudiante: " + error.message);
  }
}
