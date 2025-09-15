import {
  findAllSubjects,
  findSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  findSubjectByCodigo
} from '../repository/subject.repository.js';  // Ajusta la ruta a tu repositorio
import sequelize from '../config/db.js';  // Ajusta según la configuración de Sequelize
import SequelizeMock from 'sequelize-mock';

jest.mock('../models/subject.model.js', () => {
  // Aquí definimos SequelizeMock dentro del mock para evitar el error
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  // Definimos el modelo 'Materia' mockeado dentro de dbMock
  const Materia = dbMock.define('Materia', {
    id: 1,
    codigo: 'MATH101',
    nombre: 'Matemáticas',
    descripcion: 'Curso de matemáticas básicas',
  });

  // Mock de los métodos estáticos de Sequelize
  Materia.findAll = jest.fn().mockResolvedValue([Materia.build({ id: 1, nombre: 'Matemáticas' })]);
  Materia.findByPk = jest.fn().mockResolvedValue(Materia.build({ id: 1, nombre: 'Matemáticas' }));
  Materia.create = jest.fn().mockResolvedValue({ codigo: 'ENG101', nombre: 'Inglés', descripcion: 'Curso de inglés básico' });
  Materia.destroy = jest.fn().mockResolvedValue(1);  // Simulamos que una fila fue eliminada
  Materia.findOne = jest.fn().mockResolvedValue(Materia.build({ codigo: 'MATH101', nombre: 'Matemáticas' }));

  return Materia;
});

describe('Test de subject.repository', () => {
  beforeAll(() => {
    // Se ejecuta antes de los tests si es necesario
  });

  beforeEach(() => {
    // Se ejecuta antes de cada test
  });

  afterAll(() => {
    // Limpieza después de todos los tests
  });

  test('findAllSubjects - Debe devolver todas las materias', async () => {
    const MateriaMock = require('../models/subject.model.js');
    const subject = MateriaMock.build({
      id: 1,
      codigo: 'MATH101',
      nombre: 'Matemáticas',
      descripcion: 'Curso de matemáticas básicas',
    });

    MateriaMock.findAll.mockResolvedValue([subject]);

    const result = await findAllSubjects();

    // Compara los objetos ignorando las fechas `createdAt` y `updatedAt`
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          codigo: 'MATH101',
          nombre: 'Matemáticas',
          descripcion: 'Curso de matemáticas básicas',
        }),
      ])
    );
    expect(MateriaMock.findAll).toHaveBeenCalled();
  });

  test('findSubjectById - Debe devolver una materia por su ID', async () => {
    const MateriaMock = require('../models/subject.model.js');
    const subject = MateriaMock.build({ id: 1, nombre: 'Matemáticas' });
    MateriaMock.findByPk.mockResolvedValue(subject);

    const result = await findSubjectById(1);

    expect(result).toEqual(subject);
    expect(MateriaMock.findByPk).toHaveBeenCalledWith(1);
  });

  test('createSubject - Debe crear una nueva materia', async () => {
    const MateriaMock = require('../models/subject.model.js');
    const newSubject = { codigo: 'ENG101', nombre: 'Inglés', descripcion: 'Curso de inglés básico' };
    MateriaMock.create.mockResolvedValue(newSubject);

    const result = await createSubject(newSubject);

    expect(result).toEqual(newSubject);
    expect(MateriaMock.create).toHaveBeenCalledWith(newSubject);
  });

  test('updateSubject - Debe actualizar una materia existente', async () => {
    const MateriaMock = require('../models/subject.model.js');
    const subject = MateriaMock.build({ id: 1, nombre: 'Matemáticas' });
    const updatedData = { nombre: 'Matemáticas Avanzadas' };

    // Mockeamos el método `update` de la instancia `subject`
    subject.update = jest.fn().mockResolvedValue(subject);  // Mockea la llamada de `update`

    const result = await updateSubject(subject, updatedData);

    // Asegúrate de que el resultado es el esperado
    expect(result).toEqual(subject);
    // Verifica que `update` de la instancia fue llamado con los datos correctos
    expect(subject.update).toHaveBeenCalledWith(updatedData);  
  });

  test('deleteSubject - Debe eliminar una materia', async () => {
    const MateriaMock = require('../models/subject.model.js');
    const subject = MateriaMock.build({ id: 1, nombre: 'Matemáticas' });

    // Mockeamos el método `destroy`
    subject.destroy = jest.fn().mockResolvedValue(true);  // Simulamos que se ha eliminado correctamente

    const result = await deleteSubject(subject);

    // Verificamos que el valor devuelto sea truthy
    expect(result).toBeTruthy();
    expect(subject.destroy).toHaveBeenCalled();  // Verificamos que `destroy` fue llamado
  });

  test('findSubjectByCodigo - Debe devolver la materia por código', async () => {
    const MateriaMock = require('../models/subject.model.js');
    const subject = MateriaMock.build({ codigo: 'MATH101', nombre: 'Matemáticas' });
    MateriaMock.findOne.mockResolvedValue(subject);

    const result = await findSubjectByCodigo('MATH101');

    expect(result).toEqual(subject);
    expect(MateriaMock.findOne).toHaveBeenCalledWith({
      where: expect.any(Object)
    });
  });
});
