import * as docenteRepo from "../repositories/docente.repository.js";

export const crearDocenteService = async (data) => {
  return await docenteRepo.crearDocente(data);
};

export const obtenerDocentePorCodigoService = async (codDocente) => {
  return await docenteRepo.obtenerDocentePorCodigo(codDocente);
};

export const obtenerTodosDocentesService = async () => {
  return await docenteRepo.obtenerTodosDocentes();
};

export const actualizarDocenteService = async (codDocente, data) => {
  return await docenteRepo.actualizarDocente(codDocente, data);
};

export const eliminarDocenteService = async (codDocente) => {
  return await docenteRepo.eliminarDocente(codDocente);
};
