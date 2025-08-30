import Materia from '../models/subject.model.js';

export async function findAllSubjects() {
  return await Materia.findAll();
}

export async function findSubjectById(id) {
  return await Materia.findByPk(id);
}

export async function createSubject(data) {
  return await Materia.create(data);
}

export async function updateSubject(subject, data) {
  return await subject.update(data);
}

export async function deleteSubject(subject) {
  return await subject.destroy();
}
