import { MateriaService } from "../services/materia.service.js";

export const MateriaController = {
  async crear(req, res) {
    try {
      const materia = await MateriaService.crearMateria(req.body);
      res.status(201).json(materia);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al crear materia", error });
    }
  },

  async listar(req, res) {
    try {
      const materias = await MateriaService.listarMaterias();
      res.json(materias);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al listar materias", error });
    }
  },

  async obtener(req, res) {
    try {
      const materia = await MateriaService.obtenerMateria(req.params.id);
      if (!materia) return res.status(404).json({ mensaje: "Materia no encontrada" });
      res.json(materia);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener materia", error });
    }
  },

  async actualizar(req, res) {
    try {
      const materia = await MateriaService.actualizarMateria(req.params.id, req.body);
      if (!materia) return res.status(404).json({ mensaje: "Materia no encontrada" });
      res.json(materia);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar materia", error });
    }
  },

  async eliminar(req, res) {
    try {
      const materia = await MateriaService.eliminarMateria(req.params.id);
      if (!materia) return res.status(404).json({ mensaje: "Materia no encontrada" });
      res.json({ mensaje: "Materia eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar materia", error });
    }
  },
};
