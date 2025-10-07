import * as estudianteService from "../services/estudiante.service.js";

export const crearEstudiante = async (req, res) => {
  try {
    const estudiante = await estudianteService.crearEstudianteService(req.body);
    res.status(201).json(estudiante);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

export const obtenerTodosEstudiantes = async (req, res) => {
  try {
    const estudiantes = await estudianteService.obtenerTodosEstudiantesService();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const obtenerEstudiantePorCodigo = async (req, res) => {
  try {
    const estudiante = await estudianteService.obtenerEstudiantePorCodigoService(req.params.codEstudiante);
    res.json(estudiante);
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
};

export const actualizarEstudiante = async (req, res) => {
  try {
    await estudianteService.actualizarEstudianteService(req.params.codEstudiante, req.body);
    res.json({ mensaje: "Estudiante actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

export const eliminarEstudiante = async (req, res) => {
  try {
    await estudianteService.eliminarEstudianteService(req.params.codEstudiante);
    res.json({ mensaje: "Estudiante eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
