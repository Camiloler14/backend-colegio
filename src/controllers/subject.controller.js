import * as subjectService from '../services/subject.service.js';

// Obtener todas las materias
export const getAllSubjects = async (req, res) => {
  try {
    const materias = await subjectService.getAllSubjects();
    res.json(materias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las materias' });
  }
};

// Obtener una materia por ID
export const getSubjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const materia = await subjectService.getSubjectById(id);
    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    res.json(materia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la materia' });
  }
};

// Crear una nueva materia
export const createSubject = async (req, res) => {
  try {
    const nuevaMateria = await subjectService.createSubject(req.body);
    res.status(201).json(nuevaMateria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la materia' });
  }
};

// Actualizar una materia existente
export const updateSubject = async (req, res) => {
  const { id } = req.params;
  try {
    const materiaActualizada = await subjectService.updateSubject(id, req.body);
    res.json(materiaActualizada);
  } catch (error) {
    console.error(error);
    if (error.message === 'Materia no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al actualizar la materia' });
  }
};

// Eliminar una materia
export const deleteSubject = async (req, res) => {
  const { id } = req.params;
  try {
    await subjectService.deleteSubject(id);
    res.json({ message: 'Materia eliminada correctamente' });
  } catch (error) {
    console.error(error);
    if (error.message === 'Materia no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al eliminar la materia' });
  }
};
