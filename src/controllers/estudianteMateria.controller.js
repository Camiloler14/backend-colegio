import { EstudianteMateriaService } from "../services/estudianteMateria.service.js";

export const EstudianteMateriaController = {
  async inscribir(req, res) {
    try {
      const registro = await EstudianteMateriaService.inscribirEstudiante(req.body);
      res.status(201).json(registro);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al inscribir estudiante en materia", error });
    }
  },

  async obtenerPorEstudiante(req, res) {
    try {
      const registros = await EstudianteMateriaService.obtenerMateriasDeEstudiante(req.params.codigoEstudiante);
      res.json(registros);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener materias del estudiante", error });
    }
  },

  async obtenerPorMateria(req, res) {
    try {
      const registros = await EstudianteMateriaService.obtenerEstudiantesDeMateria(req.params.codigoMateria);
      res.json(registros);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener estudiantes de la materia", error });
    }
  },

  async actualizarNotas(req, res) {
    try {
      const { codigoEstudiante, codigoMateria } = req.params;
      const registro = await EstudianteMateriaService.actualizarNotas(codigoEstudiante, codigoMateria, req.body);
      if (!registro) return res.status(404).json({ mensaje: "Registro no encontrado" });
      res.json(registro);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar notas", error });
    }
  },

  async eliminar(req, res) {
    try {
      const { codigoEstudiante, codigoMateria } = req.params;
      const registro = await EstudianteMateriaService.eliminarInscripcion(codigoEstudiante, codigoMateria);
      if (!registro) return res.status(404).json({ mensaje: "Registro no encontrado" });
      res.json({ mensaje: "Inscripción eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar inscripción", error });
    }
  },
};
