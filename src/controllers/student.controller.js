// Importación de servicios relacionados con el manejo de estudiantes
import {
  crearEstudianteService,
  obtenerEstudiantesService,
  obtenerEstudiantePorIdentificacionService,
  actualizarEstudianteService,
  eliminarEstudianteService
} from '../services/student.service.js';

/**
 * Controlador para crear un nuevo estudiante.
 * Valida que los campos requeridos estén presentes y tengan el tipo correcto.
 * En caso exitoso, devuelve el estudiante creado con código 201.
 */
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

  // Validación de campos obligatorios y tipos
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
    // Llama al servicio para crear el estudiante
    const estudiante = await crearEstudianteService(req.body);
    return res.status(201).json(estudiante);
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    return res.status(500).json({ mensaje: error.message });
  }
}

/**
 * Controlador para obtener la lista de todos los estudiantes.
 * Devuelve un arreglo con todos los registros.
 */
export async function obtenerEstudiantes(req, res) {
  try {
    const estudiantes = await obtenerEstudiantesService();
    return res.json(estudiantes);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    return res.status(500).json({ mensaje: error.message });
  }
}

/**
 * Controlador para obtener un estudiante por su número de identificación.
 * Si no se encuentra, devuelve un estado 404.
 */
export async function obtenerEstudiante(req, res) {
  const { identificacion } = req.params;

  try {
    // Busca el estudiante por su identificación (convertida a número)
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

/**
 * Controlador para actualizar los datos de un estudiante por su identificación.
 * Si el estudiante no existe, responde con estado 404.
 */
export async function actualizarEstudiante(req, res) {
  const { identificacion } = req.params;
  const datos = req.body;

  try {
    // Llama al servicio para actualizar el estudiante
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

/**
 * Controlador para eliminar un estudiante por su identificación.
 * Si el estudiante no existe, responde con estado 404.
 */
export async function eliminarEstudiante(req, res) {
  const { identificacion } = req.params;

  try {
    // Llama al servicio para eliminar el estudiante
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
