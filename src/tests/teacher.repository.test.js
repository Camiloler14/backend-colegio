import docenteRepository from '../repository/teacher.repository.js';
import Docente from '../models/teacher.model.js';

jest.mock('../models/teacher.model.js', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  const Docente = dbMock.define('Docente', {
    documento: '123456789',
    nombre: 'Juan Pérez',
    correo: 'juan.perez@colegio.com',
    telefono: '3001234567'
  });

  // Mock de los métodos de Sequelize
  Docente.findOne = jest.fn();
  Docente.findAll = jest.fn();
  Docente.create = jest.fn();
  Docente.update = jest.fn();
  Docente.destroy = jest.fn();

  return Docente;
});

describe('Test de teacher.repository', () => {

  test('crearDocente - Debe crear un docente', async () => {
    const docenteData = {
      documento: '123456789',
      nombre: 'Juan Pérez',
      correo: 'juan.perez@colegio.com',
      telefono: '3001234567'
    };

    // Simulamos que la creación fue exitosa
    Docente.create.mockResolvedValueOnce({
      ...docenteData,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const result = await docenteRepository.crearDocente(docenteData);

    // Comprobamos que los datos creados sean los correctos
    expect(result).toEqual(expect.objectContaining({
      documento: '123456789',
      nombre: 'Juan Pérez',
      correo: 'juan.perez@colegio.com',
      telefono: '3001234567'
    }));
    expect(Docente.create).toHaveBeenCalledWith(docenteData);
  });

  test('obtenerDocentes - Debe devolver todos los docentes', async () => {
    // Simulamos que hay un docente en la base de datos
    Docente.findAll.mockResolvedValueOnce([{
      documento: '123456789',
      nombre: 'Juan Pérez',
      correo: 'juan.perez@colegio.com',
      telefono: '3001234567',
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    const result = await docenteRepository.obtenerDocentes();

    expect(result).toEqual([ 
      expect.objectContaining({
        documento: '123456789',
        nombre: 'Juan Pérez',
        correo: 'juan.perez@colegio.com',
        telefono: '3001234567'
      })
    ]);
    expect(Docente.findAll).toHaveBeenCalled();
  });

  test('obtenerDocentePorDocumento - Debe devolver un docente por su documento', async () => {
    const documento = '123456789';

    // Simulamos que encontramos un docente con ese documento
    Docente.findOne.mockResolvedValueOnce({
      documento: '123456789',
      nombre: 'Juan Pérez',
      correo: 'juan.perez@colegio.com',
      telefono: '3001234567',
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const result = await docenteRepository.obtenerDocentePorDocumento(documento);

    expect(result).toEqual(expect.objectContaining({
      documento: '123456789',
      nombre: 'Juan Pérez',
      correo: 'juan.perez@colegio.com',
      telefono: '3001234567'
    }));
    expect(Docente.findOne).toHaveBeenCalledWith({ where: { documento } });
  });


  test('actualizarDocente - Debe retornar null si no se encuentra el docente', async () => {
    const documento = '987654321';
    const datosActualizados = { nombre: 'Nuevo Nombre' };

    // Simulamos que el docente no existe
    Docente.findOne.mockResolvedValueOnce(null);

    const result = await docenteRepository.actualizarDocente(documento, datosActualizados);

    expect(result).toBeNull();
    expect(Docente.findOne).toHaveBeenCalledWith({ where: { documento } });
  });

  test('eliminarDocente - Debe eliminar un docente', async () => {
  const documento = '123456789';

  // Simulamos que el docente existe
  const docenteMock = {
    documento: '123456789',
    nombre: 'Juan Pérez',
    correo: 'juan.perez@colegio.com',
    telefono: '3001234567',
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    destroy: jest.fn().mockResolvedValueOnce(true)
  };
  
  Docente.findOne.mockResolvedValueOnce(docenteMock);

  const result = await docenteRepository.eliminarDocente(documento);

  // Verificamos que destroy se haya llamado
  expect(result).toBeTruthy();
  expect(Docente.findOne).toHaveBeenCalledWith({ where: { documento } });
  expect(docenteMock.destroy).toHaveBeenCalled(); // Verificamos que destroy fue llamado
});


  test('eliminarDocente - Debe retornar null si no se encuentra el docente', async () => {
    const documento = '987654321';

    // Simulamos que el docente no existe
    Docente.findOne.mockResolvedValueOnce(null);

    const result = await docenteRepository.eliminarDocente(documento);

    expect(result).toBeNull();
    expect(Docente.findOne).toHaveBeenCalledWith({ where: { documento } });
  });
});
