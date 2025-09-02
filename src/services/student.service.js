import EstudianteRepository from '../repository/student.repository.js';

export async function crearEstudianteService(data) {
  try {
    return await EstudianteRepository.crear(data);
  } catch (error) {
    throw new Error('Error creando estudiante: ' + error.message);
  }
}

export async function actualizarEstudianteService(identificacion, data) {
  try {
    return await EstudianteRepository.actualizarPorIdentificacion(identificacion, data);
  } catch (error) {
    throw new Error('Error actualizando estudiante: ' + error.message);
  }
}

export async function eliminarEstudianteService(identificacion) {
  try {
    return await EstudianteRepository.eliminarPorIdentificacion(identificacion);
  } catch (error) {
    throw new Error('Error eliminando estudiante: ' + error.message);
  }
}

export async function obtenerEstudiantesService() {
  try {
    return await EstudianteRepository.obtenerTodos();
  } catch (error) {
    throw new Error('Error obteniendo estudiantes: ' + error.message);
  }
}

export async function obtenerEstudiantePorIdentificacionService(identificacion) {
  try {
    return await EstudianteRepository.obtenerPorIdentificacion(identificacion);
  } catch (error) {
    throw new Error('Error obteniendo estudiante: ' + error.message);
  }
}
