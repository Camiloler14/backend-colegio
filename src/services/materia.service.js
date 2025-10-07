import MateriaRepository from "../repositories/materia.repository.js";

const MateriaService = {
  async crearMateria(data) {
    const existe = await MateriaRepository.obtenerMateriaPorCodigo(
      data.codigoMateria
    );
    if (existe) throw new Error("La materia ya existe");
    return await MateriaRepository.crearMateria(data);
  },

  async obtenerMaterias() {
    return await MateriaRepository.obtenerMaterias();
  },

  async obtenerMateriaPorCodigo(codigoMateria) {
    const materia = await MateriaRepository.obtenerMateriaPorCodigo(
      codigoMateria
    );
    if (!materia) throw new Error("Materia no encontrada");
    return materia;
  },

  async actualizarMateria(codigoMateria, data) {
    const materia = await MateriaRepository.obtenerMateriaPorCodigo(
      codigoMateria
    );
    if (!materia) throw new Error("Materia no encontrada");
    await MateriaRepository.actualizarMateria(codigoMateria, data);
    return { mensaje: "Materia actualizada correctamente" };
  },

  async eliminarMateria(codigoMateria) {
    const materia = await MateriaRepository.obtenerMateriaPorCodigo(
      codigoMateria
    );
    if (!materia) throw new Error("Materia no encontrada");
    await MateriaRepository.eliminarMateria(codigoMateria);
    return { mensaje: "Materia eliminada correctamente" };
  },
};

export default MateriaService;
