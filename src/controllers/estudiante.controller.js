import {
  crearEstudianteService,
  actualizarEstudianteService,
  eliminarEstudianteService,
  obtenerEstudiantesService,
  obtenerEstudiantePorIdentificacionService
} from '../services/estudiante.service.js';

export async function crearEstudiante(req, res) {
  try {
    console.log('Datos recibidos:', req.body);
    const resultado = await crearEstudianteService(req.body);
    res.status(201).json({ mensaje: 'Estudiante creado', ...resultado });
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    res.status(500).json({ mensaje: error.message });
  }
}

export async function actualizarEstudiante(req, res) {
  try {
    const estudiante = await actualizarEstudianteService(req.params.identificacion, req.body);
    res.json({ mensaje: 'Estudiante actualizado', estudiante });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

export async function eliminarEstudiante(req, res) {
  try {
    const eliminado = await eliminarEstudianteService(req.params.identificacion);
    if (!eliminado) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    res.json({ mensaje: 'Estudiante eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

export async function obtenerEstudiantes(req, res) {
  try {
    const estudiantes = await obtenerEstudiantesService();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

export async function obtenerEstudiante(req, res) {
  try {
    const estudiante = await obtenerEstudiantePorIdentificacionService(req.params.identificacion);
    if (!estudiante) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}
