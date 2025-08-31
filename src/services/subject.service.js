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

export async function updateSubjectByCodigo(codigo, data) {
  const subject = await subjectRepository.findSubjectByCodigo(codigo); // busca por código
  if (!subject) {
    return null;  // o lanza error, según cómo manejes
  }
  return await subjectRepository.updateSubject(subject, data);
}

export async function deleteSubjectByCodigo(codigo) {
  const subject = await subjectRepository.findSubjectByCodigo(codigo);
  if (!subject) {
    return null; 
  }
  return await subjectRepository.deleteSubject(subject);
}

export async function getSubjectByCodigo(codigo) {
  return await subjectRepository.findSubjectByCodigo(codigo);
}
