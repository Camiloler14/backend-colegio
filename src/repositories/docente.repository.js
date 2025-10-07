import Docente from "../models/docente.model.js";
import Usuario from "../models/usuario.model.js";
import Materia from "../models/materia.model.js";

export const crearDocente = async (data) => {
  return await Docente.create(data);
};

export const obtenerDocentePorCodigo = async (codDocente) => {
  return await Docente.findOne({
    where: { codDocente },
    include: [
      {
        model: Usuario,
        as: "usuario",
        attributes: ["codUsuario", "nombre", "rol"],
      },
      {
        model: Materia,
        as: "materias",
      },
    ],
  });
};

export const obtenerTodosDocentes = async () => {
  return await Docente.findAll({
    include: [
      {
        model: Usuario,
        as: "usuario",
        attributes: ["codUsuario", "nombre", "rol"],
      },
      {
        model: Materia,
        as: "materias",
      },
    ],
  });
};

export const actualizarDocente = async (codDocente, data) => {
  const docente = await Docente.findByPk(codDocente);
  if (!docente) return null;

  Object.assign(docente, data);
  await docente.save();
  return docente;
};

export const eliminarDocente = async (codDocente) => {
  const docente = await Docente.findByPk(codDocente);
  if (!docente) return null;

  await docente.destroy();
  return docente;
};
