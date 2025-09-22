import * as EstudianteService from '../services/student.service.js';
import EstudianteRepository from '../repository/student.repository.js';

// Mock completo del repositorio
jest.mock('../repository/student.repository.js');

describe('Student Service', () => {
  const estudianteMock = {
    identificacion: 123,
    primerNombre: 'Juan',
    primerApellido: 'Pérez',
    edad: 12,
    genero: 'M',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  // -------------------------------
  describe('crearEstudianteService', () => {
    it('debería crear un estudiante correctamente', async () => {
      EstudianteRepository.crear.mockResolvedValue(estudianteMock);

      const result = await EstudianteService.crearEstudianteService(estudianteMock);

      expect(result).toEqual(estudianteMock);
      expect(EstudianteRepository.crear).toHaveBeenCalledWith(estudianteMock);
    });

    it('debería lanzar un error si falla el repositorio', async () => {
      EstudianteRepository.crear.mockRejectedValue(new Error('DB Error'));

      await expect(
        EstudianteService.crearEstudianteService(estudianteMock)
      ).rejects.toThrow('Error creando estudiante: DB Error');
    });
  });

  // -------------------------------
  describe('actualizarEstudianteService', () => {
    it('debería actualizar un estudiante correctamente', async () => {
      EstudianteRepository.actualizarPorIdentificacion.mockResolvedValue(estudianteMock);

      const result = await EstudianteService.actualizarEstudianteService(123, estudianteMock);

      expect(result).toEqual(estudianteMock);
      expect(EstudianteRepository.actualizarPorIdentificacion).toHaveBeenCalledWith(123, estudianteMock);
    });

    it('debería lanzar un error si falla el repositorio', async () => {
      EstudianteRepository.actualizarPorIdentificacion.mockRejectedValue(new Error('DB Error'));

      await expect(
        EstudianteService.actualizarEstudianteService(123, estudianteMock)
      ).rejects.toThrow('Error actualizando estudiante: DB Error');
    });
  });

  // -------------------------------
  describe('eliminarEstudianteService', () => {
    it('debería eliminar un estudiante correctamente', async () => {
      EstudianteRepository.eliminarPorIdentificacion.mockResolvedValue(true);

      const result = await EstudianteService.eliminarEstudianteService(123);

      expect(result).toBe(true);
      expect(EstudianteRepository.eliminarPorIdentificacion).toHaveBeenCalledWith(123);
    });

    it('debería lanzar un error si falla el repositorio', async () => {
      EstudianteRepository.eliminarPorIdentificacion.mockRejectedValue(new Error('DB Error'));

      await expect(
        EstudianteService.eliminarEstudianteService(123)
      ).rejects.toThrow('Error eliminando estudiante: DB Error');
    });
  });

  // -------------------------------
  describe('obtenerEstudiantesService', () => {
    it('debería obtener todos los estudiantes', async () => {
      const estudiantes = [estudianteMock];
      EstudianteRepository.obtenerTodos.mockResolvedValue(estudiantes);

      const result = await EstudianteService.obtenerEstudiantesService();

      expect(result).toEqual(estudiantes);
      expect(EstudianteRepository.obtenerTodos).toHaveBeenCalled();
    });

    it('debería lanzar un error si falla el repositorio', async () => {
      EstudianteRepository.obtenerTodos.mockRejectedValue(new Error('DB Error'));

      await expect(
        EstudianteService.obtenerEstudiantesService()
      ).rejects.toThrow('Error obteniendo estudiantes: DB Error');
    });
  });

  // -------------------------------
  describe('obtenerEstudiantePorIdentificacionService', () => {
    it('debería obtener un estudiante por su identificación', async () => {
      EstudianteRepository.obtenerPorIdentificacion.mockResolvedValue(estudianteMock);

      const result = await EstudianteService.obtenerEstudiantePorIdentificacionService(123);

      expect(result).toEqual(estudianteMock);
      expect(EstudianteRepository.obtenerPorIdentificacion).toHaveBeenCalledWith(123);
    });

    it('debería lanzar un error si falla el repositorio', async () => {
      EstudianteRepository.obtenerPorIdentificacion.mockRejectedValue(new Error('DB Error'));

      await expect(
        EstudianteService.obtenerEstudiantePorIdentificacionService(123)
      ).rejects.toThrow('Error obteniendo estudiante: DB Error');
    });
  });
});
