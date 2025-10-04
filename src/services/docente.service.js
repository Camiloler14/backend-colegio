import { DocenteRepository } from "../repositories/docente.repository.js";

const docenteRepository = new DocenteRepository();

export async function crearDocenteServicio(datos) {
  return await docenteRepository.crearDocente(datos);
}

export async function obtenerDocentesServicio() {
  return await docenteRepository.obtenerDocentes();
}

export async function obtenerDocentePorDocumentoServicio(documento) {
  return await docenteRepository.obtenerDocentePorDocumento(documento);
}

export async function actualizarDocenteServicio(documento, datos) {
  return await docenteRepository.actualizarDocente(documento, datos);
}

export async function eliminarDocenteServicio(documento) {
  return await docenteRepository.eliminarDocente(documento);
}
