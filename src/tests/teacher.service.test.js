// teacher.service.test.js

import * as teacherService from '../services/teacher.service.js';
import { DocenteRepository } from '../repository/teacher.repository.js';

// Mock de la clase DocenteRepository
jest.mock('../repository/teacher.repository.js');

describe('Teacher Service', () => {
  // Creamos mocks para cada método de la clase
  const mockCrearDocente = jest.fn();
  const mockObtenerDocentes = jest.fn();
  const mockObtenerDocentePorDocumento = jest.fn();
  const mockActualizarDocente = jest.fn();
  const mockEliminarDocente = jest.fn();

  beforeAll(() => {
    // Cuando se crea una instancia de DocenteRepository, que retorne un objeto con estos métodos mockeados
    DocenteRepository.mockImplementation(() => ({
      crearDocente: mockCrearDocente,
      obtenerDocentes: mockObtenerDocentes,
      obtenerDocentePorDocumento: mockObtenerDocentePorDocumento,
      actualizarDocente: mockActualizarDocente,
      eliminarDocente: mockEliminarDocente,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia llamadas entre tests
  });

  const docenteMock = {
    documento: '123456',
    nombre: 'Carlos',
    apellido: 'Lopez',
  };

  test('crearDocenteService debería llamar a crearDocente y devolver el resultado', async () => {
    mockCrearDocente.mockResolvedValue(docenteMock);

    const result = await teacherService.crearDocenteService(docenteMock);

    expect(mockCrearDocente).toHaveBeenCalledWith(docenteMock);
    expect(result).toEqual(docenteMock);
  });

  test('obtenerDocentesService debería llamar a obtenerDocentes y devolver el resultado', async () => {
    mockObtenerDocentes.mockResolvedValue([docenteMock]);

    const result = await teacherService.obtenerDocentesService();

    expect(mockObtenerDocentes).toHaveBeenCalled();
    expect(result).toEqual([docenteMock]);
  });

  test('obtenerDocentePorDocumentoService debería llamar a obtenerDocentePorDocumento con el documento correcto', async () => {
    mockObtenerDocentePorDocumento.mockResolvedValue(docenteMock);

    const result = await teacherService.obtenerDocentePorDocumentoService('123456');

    expect(mockObtenerDocentePorDocumento).toHaveBeenCalledWith('123456');
    expect(result).toEqual(docenteMock);
  });

  test('actualizarDocenteService debería llamar a actualizarDocente con los parámetros correctos', async () => {
    const nuevosDatos = { nombre: 'Carlos Eduardo' };
    mockActualizarDocente.mockResolvedValue({ ...docenteMock, ...nuevosDatos });

    const result = await teacherService.actualizarDocenteService('123456', nuevosDatos);

    expect(mockActualizarDocente).toHaveBeenCalledWith('123456', nuevosDatos);
    expect(result).toEqual({ ...docenteMock, ...nuevosDatos });
  });

  test('eliminarDocenteService debería llamar a eliminarDocente con el documento correcto', async () => {
    mockEliminarDocente.mockResolvedValue(true);

    const result = await teacherService.eliminarDocenteService('123456');

    expect(mockEliminarDocente).toHaveBeenCalledWith('123456');
    expect(result).toBe(true);
  });
});
