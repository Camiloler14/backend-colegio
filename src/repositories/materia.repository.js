import Materia from "../models/materia.model.js";

export const MateriaRepository = {
  async crear(datos) {
    return await Materia.create(datos);
  },

  async obtenerTodas() {
    return await Materia.findAll();
  },

  async obtenerPorId(id) {
    return await Materia.findByPk(id);
  },

  async actualizar(id, datos) {
    const materia = await Materia.findByPk(id);
    if (!materia) return null;
    return await materia.update(datos);
  },

  async eliminar(id) {
    const materia = await Materia.findByPk(id);
    if (!materia) return null;
    await materia.destroy();
    return materia;
  },
};
