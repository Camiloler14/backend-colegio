import Estudiante from "../models/estudiante.model.js";
import Usuario from "../models/usuario.model.js";

export const crearEstudiante = async (data) => {
  return await Estudiante.create(data);
};

export const obtenerTodosEstudiantes = async () => {
  return await Estudiante.findAll({
    include: [
      {
        model: Usuario,
        as: "usuarioAsociado",
        attributes: ["codUsuario", "nombre", "rol"],
      },
    ],
  });
};

export const obtenerEstudiantePorCodigo = async (codEstudiante) => {
  return await Estudiante.findOne({
    where: { codEstudiante },
    include: [
      {
        model: Usuario,
        as: "usuarioAsociado",
        attributes: ["codUsuario", "nombre", "rol"],
      },
    ],
  });
};

export const actualizarEstudiante = async (codEstudiante, data) => {
  return await Estudiante.update(data, { where: { codEstudiante } });
};

export const eliminarEstudiante = async (codEstudiante) => {
  return await Estudiante.destroy({ where: { codEstudiante } });
};
