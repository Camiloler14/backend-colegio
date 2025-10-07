import { EstudianteMateriaRepository } from "../repositories/estudianteMateria.repository.js";

export const EstudianteMateriaService = {
  async inscribirEstudiante(datos) {
    return await EstudianteMateriaRepository.inscribir(datos);
  },

  async obtenerMateriasDeEstudiante(codigoEstudiante) {
    return await EstudianteMateriaRepository.obtenerPorEstudiante(
      codigoEstudiante
    );
  },

  async obtenerEstudiantesDeMateria(codigoMateria) {
    return await EstudianteMateriaRepository.obtenerPorMateria(codigoMateria);
  },

  async actualizarNotas(codigoEstudiante, codigoMateria, datos) {
    return await EstudianteMateriaRepository.actualizarNotas(
      codigoEstudiante,
      codigoMateria,
      datos
    );
  },

  async eliminarInscripcion(codigoEstudiante, codigoMateria) {
    return await EstudianteMateriaRepository.eliminar(
      codigoEstudiante,
      codigoMateria
    );
  },
};
