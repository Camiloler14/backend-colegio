import * as subjectRepository from '../repository/subject.repository.js';

export async function getAllSubjects() {
  return await subjectRepository.findAllSubjects();
}

export async function getSubjectById(id) {
  return await subjectRepository.findSubjectById(id);
}

export async function createSubject(data) {
  return await subjectRepository.createSubject(data);
}

export async function updateSubject(id, data) {
  const subject = await subjectRepository.findSubjectById(id);
  if (!subject) {
    throw new Error('Materia no encontrada');
  }
  return await subjectRepository.updateSubject(subject, data);
}

export async function deleteSubject(id) {
  const subject = await subjectRepository.findSubjectById(id);
  if (!subject) {
    throw new Error('Materia no encontrada');
  }
  return await subjectRepository.deleteSubject(subject);
}
