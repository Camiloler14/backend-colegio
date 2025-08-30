import {
  crearDocenteService,
  obtenerDocentesService,
  obtenerDocentePorDocumentoService,
  actualizarDocenteService,
  eliminarDocenteService
} from '../services/teacher.service.js';

export async function crearDocente(req, res) {
  const {
    primerNombre,
    primerApellido,
    email,
    fecha_ingreso,
    documento
  } = req.body;

  if (!primerNombre || !primerApellido || !email || !fecha_ingreso || !documento) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  try {
    const docente = await crearDocenteService(req.body);
    return res.status(201).json(docente);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
}

export async function obtenerDocentes(req, res) {
  try {
    const docentes = await obtenerDocentesService();
    return res.json(docentes);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
}

export async function obtenerDocente(req, res) {
  try {
    const docente = await obtenerDocentePorDocumentoService(req.params.documento);
    if (!docente) {
      return res.status(404).json({ mensaje: 'Docente no encontrado' });
    }
    return res.json(docente);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
}

export async function actualizarDocente(req, res) {
  try {
    const docente = await actualizarDocenteService(req.params.documento, req.body);
    if (!docente) {
      return res.status(404).json({ mensaje: 'Docente no encontrado' });
    }
    return res.json(docente);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
}

export async function eliminarDocente(req, res) {
  try {
    const eliminado = await eliminarDocenteService(req.params.documento);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Docente no encontrado' });
    }
    return res.json({ mensaje: 'Docente eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
}


