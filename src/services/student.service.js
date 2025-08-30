import EstudianteRepository from '../repository/student.repository.js';

export async function crearEstudianteService(data) {
  try {
    return await EstudianteRepository.crear(data);
  } catch (error) {
    throw new Error('Error creando estudiante: ' + error.message);
  }
}

export async function actualizarEstudianteService(id, data) {
  const estudiante = await EstudianteRepository.actualizar(id, data);
  return estudiante;
}

export async function eliminarEstudianteService(id) {
  const eliminado = await EstudianteRepository.eliminar(id);
  return eliminado;
}

export async function obtenerEstudiantesService() {
  try {
    return await EstudianteRepository.obtenerTodos();
  } catch (error) {
    throw new Error('Error obteniendo estudiantes: ' + error.message);
  }
}

export async function obtenerEstudiantePorIdService(id) {
  try {
    return await EstudianteRepository.obtenerPorId(id);
  } catch (error) {
    throw new Error('Error obteniendo estudiante: ' + error.message);
  }
}
