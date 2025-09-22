import Docente from '../models/teacher.model.js';

export class DocenteRepository {
  async crearDocente(data) {
    return await Docente.create(data);
  }

  async obtenerDocentes() {
    return await Docente.findAll();
  }

  async obtenerDocentePorDocumento(documento) {
    return await Docente.findOne({ where: { documento } });
  }

  async actualizarDocente(documento, datos) {
    const docente = await Docente.findOne({ where: { documento } });
    if (!docente) return null;
    await docente.update(datos);
    return docente;
  }

  async eliminarDocente(documento) {
    const docente = await Docente.findOne({ where: { documento } });
    if (!docente) return null;
    await docente.destroy();
    return true;
  }
}

// Aquí exportas la instancia de la clase.
export default new DocenteRepository();
