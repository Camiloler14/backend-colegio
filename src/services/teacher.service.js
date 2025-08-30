import { DocenteRepository } from '../repository/teacher.repository.js';
const docenteRepository = new DocenteRepository();

export async function crearDocenteService(data) {
  return await docenteRepository.crearDocente(data);
}

export async function obtenerDocentesService() {
  return await docenteRepository.obtenerDocentes();
}

export async function obtenerDocentePorDocumentoService(documento) {
  return await docenteRepository.obtenerDocentePorDocumento(documento);
}

export async function actualizarDocenteService(documento, datos) {
  return await docenteRepository.actualizarDocente(documento, datos);
}

export async function eliminarDocenteService(documento) {
  return await docenteRepository.eliminarDocente(documento);
}

