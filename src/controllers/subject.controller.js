import * as subjectService from '../services/subject.service.js';

// Obtener todas las materias
export const getAllSubjects = async (req, res) => {
  try {
    const materias = await subjectService.getAllSubjects();
    res.json(materias);
  } catch (error) {
    console.error("Error al obtener las materias:", error.name, error.message);
    res.status(500).json({ message: 'Error al obtener las materias' });
  }
};

// Obtener una materia por su código
export const getSubjectByCodigo = async (req, res) => {
  const { codigo } = req.params;
  try {
    const materia = await subjectService.getSubjectByCodigo(codigo);
    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    res.json(materia);
  } catch (error) {
    console.error("Error al obtener la materia:", error.name, error.message);
    res.status(500).json({ message: 'Error al obtener la materia' });
  }
};

// Crear una nueva materia
export const createSubject = async (req, res) => {
  try {
    const nuevaMateria = await subjectService.createSubject(req.body);
    res.status(201).json(nuevaMateria);
  } catch (error) {
    console.error("Error al crear la materia:", error.name, error.message);

    if (error.name === 'SequelizeValidationError') {
      const mensajes = error.errors.map(e => e.message);
      return res.status(400).json({ message: 'Error de validación', details: mensajes });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'El código de materia ya existe. Debe ser único.' });
    }

    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ message: 'El docenteDocumento especificado no existe.' });
    }

    res.status(500).json({ message: 'Error al crear la materia' });
  }
};

// Actualizar una materia existente por su código
export const updateSubjectByCodigo = async (req, res) => {
  const { codigo } = req.params;
  try {
    const materiaActualizada = await subjectService.updateSubjectByCodigo(codigo, req.body);
    if (!materiaActualizada) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    res.json(materiaActualizada);
  } catch (error) {
    console.error("Error al actualizar la materia:", error.name, error.message);

    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ message: 'El docenteDocumento especificado no existe.' });
    }

    res.status(500).json({ message: 'Error al actualizar la materia' });
  }
};

// Eliminar una materia por su código
export const deleteSubjectByCodigo = async (req, res) => {
  const { codigo } = req.params;
  try {
    const eliminado = await subjectService.deleteSubjectByCodigo(codigo);
    if (!eliminado) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    res.json({ message: 'Materia eliminada correctamente' });
  } catch (error) {
    console.error("Error al eliminar la materia:", error.name, error.message);

    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ message: 'No se puede eliminar la materia porque está relacionada con otros registros.' });
    }

    res.status(500).json({ message: 'Error al eliminar la materia' });
  }
};
