import Materia from "../models/materia.model.js";
import Docente from "../models/docente.model.js";

const MateriaRepository = {
  async crearMateria(data) {
    return await Materia.create(data);
  },

  async obtenerMaterias() {
    return await Materia.findAll({
      include: [
        {
          model: Docente,
          as: "docente", 
          attributes: ["codDocente", "primerNombre", "primerApellido"],
        },
      ],
    });
  },

  async obtenerMateriaPorCodigo(codigoMateria) {
    return await Materia.findByPk(codigoMateria, {
      include: [
        {
          model: Docente,
          as: "docente", 
          attributes: ["codDocente", "primerNombre", "primerApellido"],
        },
      ],
    });
  },

  async actualizarMateria(codigoMateria, data) {
    return await Materia.update(data, { where: { codigoMateria } });
  },

  async eliminarMateria(codigoMateria) {
    return await Materia.destroy({ where: { codigoMateria } });
  },
};

export default MateriaRepository;
