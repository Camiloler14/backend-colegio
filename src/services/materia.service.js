import { MateriaRepository } from "../repositories/materia.repository.js";

export const MateriaService = {
  async crearMateria(datos) {
    return await MateriaRepository.crear(datos);
  },

  async listarMaterias() {
    return await MateriaRepository.obtenerTodas();
  },

  async obtenerMateria(id) {
    return await MateriaRepository.obtenerPorId(id);
  },

  async actualizarMateria(id, datos) {
    return await MateriaRepository.actualizar(id, datos);
  },

  async eliminarMateria(id) {
    return await MateriaRepository.eliminar(id);
  },
};
