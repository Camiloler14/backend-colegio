import * as estudianteRepo from "../repositories/estudiante.repository.js";
import { Usuario, Estudiante } from "../models/asociaciones.js"; 

// Crear estudiante
export const crearEstudianteService = async (data) => {
  const usuario = await Usuario.findOne({
    where: { codUsuario: data.codEstudiante },
  });

  if (!usuario)
    throw new Error("El usuario no existe. Crea primero el usuario.");
  if (usuario.rol !== "estudiante")
    throw new Error("El usuario no tiene rol de estudiante.");

  return await estudianteRepo.crearEstudiante(data);
};

// Obtener todos los estudiantes con su usuario asociado
export const obtenerTodosEstudiantesService = async () => {
  return await Estudiante.findAll({
    include: [{ model: Usuario, as: "usuario" }],
  });
};

// Obtener estudiante por código con su usuario
export const obtenerEstudiantePorCodigoService = async (codEstudiante) => {
  const estudiante = await Estudiante.findByPk(codEstudiante, {
    include: [{ model: Usuario, as: "usuario" }],
  });

  if (!estudiante) throw new Error("Estudiante no encontrado");
  return estudiante;
};

// Actualizar estudiante
export const actualizarEstudianteService = async (codEstudiante, data) => {
  const usuario = await Usuario.findOne({
    where: { codUsuario: codEstudiante },
  });

  if (!usuario) throw new Error("El usuario asignado no existe.");
  if (usuario.rol !== "estudiante")
    throw new Error("El usuario no tiene rol de estudiante.");

  const result = await estudianteRepo.actualizarEstudiante(codEstudiante, data);
  if (result[0] === 0) throw new Error("Estudiante no encontrado.");
  return result;
};

// Eliminar estudiante
export const eliminarEstudianteService = async (codEstudiante) => {
  const deleted = await estudianteRepo.eliminarEstudiante(codEstudiante);
  if (!deleted) throw new Error("Estudiante no encontrado.");
  return deleted;
};
