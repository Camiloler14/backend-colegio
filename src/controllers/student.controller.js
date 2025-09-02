import {
  crearEstudianteService,
  obtenerEstudiantesService,
  obtenerEstudiantePorIdentificacionService,
  actualizarEstudianteService,
  eliminarEstudianteService
} from '../services/student.service.js';

export async function crearEstudiante(req, res) {
  const {
    identificacion,
    primerNombre,
    primerApellido,
    edad,
    genero,
    fechaNacimiento,
    acudiente1,
    telefonoAcudiente1,
    direccion,
    barrio,
    ciudad,
    fechaMatricula,
    fechaIngreso,
    antiguedad,
    grado,
    estado
  } = req.body;

  console.log('Datos recibidos:', req.body);

  if (
    typeof identificacion !== 'number' ||
    !primerNombre ||
    !primerApellido ||
    !genero ||
    !fechaNacimiento ||
    !acudiente1 ||
    !telefonoAcudiente1 ||
    !direccion ||
    !barrio ||
    !ciudad ||
    !fechaMatricula ||
    !fechaIngreso ||
    typeof grado !== 'number' ||
    typeof edad !== 'number' ||
    !estado ||
    !antiguedad
  ) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios o tipos inválidos' });
  }

  try {
    const estudiante = await crearEstudianteService(req.body);
    return res.status(201).json(estudiante);
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    return res.status(500).json({ mensaje: error.message });
  }
}

export async function obtenerEstudiantes(req, res) {
  try {
    const estudiantes = await obtenerEstudiantesService();
    return res.json(estudiantes);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    return res.status(500).json({ mensaje: error.message });
  }
}

export async function obtenerEstudiante(req, res) {
  const { identificacion } = req.params;

  try {
    const estudiante = await obtenerEstudiantePorIdentificacionService(parseInt(identificacion));
    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }
    return res.json(estudiante);
  } catch (error) {
    console.error('Error al obtener estudiante:', error);
    return res.status(500).json({ mensaje: error.message });
  }
}

export async function actualizarEstudiante(req, res) {
  const { identificacion } = req.params;
  const datos = req.body;

  try {
    const estudianteActualizado = await actualizarEstudianteService(parseInt(identificacion), datos);
    if (!estudianteActualizado) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }
    return res.json(estudianteActualizado);
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    return res.status(500).json({ mensaje: error.message });
  }
}

export async function eliminarEstudiante(req, res) {
  const { identificacion } = req.params;

  try {
    const eliminado = await eliminarEstudianteService(parseInt(identificacion));
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }
    return res.json({ mensaje: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    return res.status(500).json({ mensaje: error.message });
  }
}
