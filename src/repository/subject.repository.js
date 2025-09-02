import Materia from '../models/subject.model.js';
import sequelize from '../config/db.js';  // Importa la instancia de Sequelize

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

export async function findSubjectByCodigo(codigo) {
  return await Materia.findOne({
    where: sequelize.where(
      sequelize.fn('LOWER', sequelize.col('codigo')),
      codigo.toLowerCase()
    )
  });
}

