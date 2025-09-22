import { DocenteRepository } from '../repository/teacher.repository.js';

export async function crearDocenteService(data) {
  const docenteRepository = new DocenteRepository(); // aquí se crea cada vez
  return await docenteRepository.crearDocente(data);
}

export async function obtenerDocentesService() {
  const docenteRepository = new DocenteRepository();
  return await docenteRepository.obtenerDocentes();
}

export async function obtenerDocentePorDocumentoService(documento) {
  const docenteRepository = new DocenteRepository();
  return await docenteRepository.obtenerDocentePorDocumento(documento);
}

export async function actualizarDocenteService(documento, datos) {
  const docenteRepository = new DocenteRepository();
  return await docenteRepository.actualizarDocente(documento, datos);
}

export async function eliminarDocenteService(documento) {
  const docenteRepository = new DocenteRepository();
  return await docenteRepository.eliminarDocente(documento);
}
