import EstudianteMateria from "../models/estudianteMateria.model.js";

export const EstudianteMateriaRepository = {
  async inscribir(datos) {
    return await EstudianteMateria.create(datos);
  },

  async obtenerPorEstudiante(codigoEstudiante) {
    return await EstudianteMateria.findAll({
      where: { codigoEstudiante },
    });
  },

  async obtenerPorMateria(codigoMateria) {
    return await EstudianteMateria.findAll({
      where: { codigoMateria },
    });
  },

  async actualizarNotas(codigoEstudiante, codigoMateria, datos) {
    const registro = await EstudianteMateria.findOne({
      where: { codigoEstudiante, codigoMateria },
    });
    if (!registro) return null;
    return await registro.update(datos);
  },

  async eliminar(codigoEstudiante, codigoMateria) {
    const registro = await EstudianteMateria.findOne({
      where: { codigoEstudiante, codigoMateria },
    });
    if (!registro) return null;
    await registro.destroy();
    return registro;
  },
};
