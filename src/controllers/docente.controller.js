import * as docenteService from "../services/docente.service.js";

export const crearDocente = async (req, res) => {
  try {
    const docente = await docenteService.crearDocenteService(req.body);
    res.status(201).json(docente);
  } catch (error) {
    console.error("Error al crear docente:", error);
    res.status(500).json({ error: error.message });
  }
};

export const obtenerDocentePorCodigo = async (req, res) => {
  try {
    const docente = await docenteService.obtenerDocentePorCodigoService(
      req.params.codDocente
    );
    if (!docente)
      return res.status(404).json({ mensaje: "Docente no encontrado" });
    res.json(docente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerTodosDocentes = async (req, res) => {
  try {
    const docentes = await docenteService.obtenerTodosDocentesService();
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarDocente = async (req, res) => {
  try {
    const docente = await docenteService.actualizarDocenteService(
      req.params.codDocente,
      req.body
    );
    if (!docente)
      return res.status(404).json({ mensaje: "Docente no encontrado" });
    res.json({ mensaje: "Docente actualizado correctamente", docente });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarDocente = async (req, res) => {
  try {
    const eliminado = await docenteService.eliminarDocenteService(
      req.params.codDocente
    );
    if (!eliminado)
      return res.status(404).json({ mensaje: "Docente no encontrado" });
    res.json({ mensaje: "Docente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
