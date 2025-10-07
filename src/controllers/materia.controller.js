import MateriaService from "../services/materia.service.js";

export async function crearMateria(req, res) {
  try {
    const materia = await MateriaService.crearMateria(req.body);
    res.status(201).json({ mensaje: "Materia creada correctamente", materia });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function obtenerMaterias(req, res) {
  try {
    const materias = await MateriaService.obtenerMaterias();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function obtenerMateriaPorCodigo(req, res) {
  try {
    const materia = await MateriaService.obtenerMateriaPorCodigo(
      req.params.codigoMateria
    );
    res.json(materia);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function actualizarMateria(req, res) {
  try {
    const respuesta = await MateriaService.actualizarMateria(
      req.params.codigoMateria,
      req.body
    );
    res.json(respuesta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function eliminarMateria(req, res) {
  try {
    const respuesta = await MateriaService.eliminarMateria(
      req.params.codigoMateria
    );
    res.json(respuesta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
