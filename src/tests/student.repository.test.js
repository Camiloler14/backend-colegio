import EstudianteRepository from '../repository/student.repository.js';
import Estudiante from '../models/student.model.js';

jest.mock('../models/student.model.js'); // Mock del modelo Estudiante

describe('EstudianteRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar mocks antes de cada test
  });

  describe('crear', () => {
    it('debería crear un nuevo estudiante', async () => {
      const estudianteData = {
        identificacion: 12345,
        primerNombre: 'Juan',
        segundoNombre: null, // Aseguramos que el segundoNombre sea null
        primerApellido: 'Perez',
        segundoApellido: null, // Aseguramos que el segundoApellido sea null
        edad: 15,
        genero: 'M',
        fechaNacimiento: '2008-05-10',
        acudiente1: 'Maria Perez',
        telefonoAcudiente1: '1234567890',
        acudiente2: null, // Aseguramos que el acudiente2 sea null
        telefonoAcudiente2: null, // Aseguramos que el telefonoAcudiente2 sea null
        direccion: 'Calle 123',
        barrio: 'Centro',
        ciudad: 'CiudadX',
        fechaMatricula: '2023-02-01',
        fechaIngreso: '2023-02-01',
        antiguedad: '1 año',
        grado: 10,
        estado: 'activo',
        observaciones: null, // Aseguramos que observaciones sea null
      };
      const mockEstudiante = { id: 1, ...estudianteData };
      Estudiante.create.mockResolvedValue(mockEstudiante); // Mock de la función create

      const result = await EstudianteRepository.crear(estudianteData);

      // Ahora debe coincidir correctamente
      expect(Estudiante.create).toHaveBeenCalledWith(estudianteData);
      expect(result).toEqual(mockEstudiante);
    });

    it('debería lanzar un error si ocurre un problema', async () => {
      const estudianteData = {
        identificacion: 12345,
        primerNombre: 'Juan',
        segundoNombre: null,
        primerApellido: 'Perez',
        segundoApellido: null,
        edad: 15,
        genero: 'M',
        fechaNacimiento: '2008-05-10',
        acudiente1: 'Maria Perez',
        telefonoAcudiente1: '1234567890',
        acudiente2: null,
        telefonoAcudiente2: null,
        direccion: 'Calle 123',
        barrio: 'Centro',
        ciudad: 'CiudadX',
        fechaMatricula: '2023-02-01',
        fechaIngreso: '2023-02-01',
        antiguedad: '1 año',
        grado: 10,
        estado: 'activo',
        observaciones: null,
      };
      Estudiante.create.mockRejectedValue(new Error('Error al crear el estudiante')); // Simular error

      await expect(EstudianteRepository.crear(estudianteData)).rejects.toThrow('Error al crear el estudiante');
    });
  });

  describe('actualizarPorIdentificacion', () => {
    it('debería actualizar un estudiante correctamente', async () => {
      const identificacion = 12345;
      const estudianteData = { primerNombre: 'Juan Carlos' };
      const mockEstudiante = { id: identificacion, ...estudianteData };
      const mockFindOne = { update: jest.fn().mockResolvedValue(mockEstudiante) };
      Estudiante.findOne.mockResolvedValue(mockFindOne); // Simular que se encuentra el estudiante

      const result = await EstudianteRepository.actualizarPorIdentificacion(identificacion, estudianteData);

      expect(Estudiante.findOne).toHaveBeenCalledWith({ where: { identificacion } });
      expect(mockFindOne.update).toHaveBeenCalledWith(estudianteData);
      expect(result).toEqual(mockEstudiante);
    });

    it('debería retornar null si no se encuentra el estudiante', async () => {
      const identificacion = 12345;
      Estudiante.findOne.mockResolvedValue(null); // Simular que no se encuentra el estudiante

      const result = await EstudianteRepository.actualizarPorIdentificacion(identificacion, {});

      expect(result).toBeNull();
    });

    it('debería lanzar un error si ocurre un problema', async () => {
      const identificacion = 12345;
      const estudianteData = { primerNombre: 'Juan Carlos' };
      Estudiante.findOne.mockRejectedValue(new Error('Error al buscar el estudiante')); // Simular error

      await expect(EstudianteRepository.actualizarPorIdentificacion(identificacion, estudianteData)).rejects.toThrow('Error al buscar el estudiante');
    });
  });

  describe('eliminarPorIdentificacion', () => {
    it('debería eliminar un estudiante correctamente', async () => {
      const identificacion = 12345;
      const mockEstudiante = { destroy: jest.fn() };
      Estudiante.findOne.mockResolvedValue(mockEstudiante); // Simular que se encuentra el estudiante

      const result = await EstudianteRepository.eliminarPorIdentificacion(identificacion);

      expect(Estudiante.findOne).toHaveBeenCalledWith({ where: { identificacion } });
      expect(mockEstudiante.destroy).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('debería retornar false si no se encuentra el estudiante', async () => {
      const identificacion = 12345;
      Estudiante.findOne.mockResolvedValue(null); // Simular que no se encuentra el estudiante

      const result = await EstudianteRepository.eliminarPorIdentificacion(identificacion);

      expect(result).toBe(false);
    });

    it('debería lanzar un error si ocurre un problema', async () => {
      const identificacion = 12345;
      Estudiante.findOne.mockRejectedValue(new Error('Error al eliminar el estudiante')); // Simular error

      await expect(EstudianteRepository.eliminarPorIdentificacion(identificacion)).rejects.toThrow('Error al eliminar el estudiante');
    });
  });

  describe('obtenerTodos', () => {
    it('debería obtener todos los estudiantes', async () => {
      const mockEstudiantes = [{ id: 1, primerNombre: 'Juan' }, { id: 2, primerNombre: 'Maria' }];
      Estudiante.findAll.mockResolvedValue(mockEstudiantes); // Mock de la función findAll

      const result = await EstudianteRepository.obtenerTodos();

      expect(Estudiante.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockEstudiantes);
    });

    it('debería lanzar un error si ocurre un problema', async () => {
      Estudiante.findAll.mockRejectedValue(new Error('Error al obtener los estudiantes')); // Simular error

      await expect(EstudianteRepository.obtenerTodos()).rejects.toThrow('Error al obtener los estudiantes');
    });
  });

  describe('obtenerPorIdentificacion', () => {
    it('debería obtener un estudiante por su identificación', async () => {
      const identificacion = 12345;
      const mockEstudiante = { id: identificacion, primerNombre: 'Juan' };
      Estudiante.findOne.mockResolvedValue(mockEstudiante); // Simular que se encuentra el estudiante

      const result = await EstudianteRepository.obtenerPorIdentificacion(identificacion);

      expect(Estudiante.findOne).toHaveBeenCalledWith({ where: { identificacion } });
      expect(result).toEqual(mockEstudiante);
    });

    it('debería retornar null si no se encuentra el estudiante', async () => {
      const identificacion = 12345;
      Estudiante.findOne.mockResolvedValue(null); // Simular que no se encuentra el estudiante

      const result = await EstudianteRepository.obtenerPorIdentificacion(identificacion);

      expect(result).toBeNull();
    });

    it('debería lanzar un error si ocurre un problema', async () => {
      const identificacion = 12345;
      Estudiante.findOne.mockRejectedValue(new Error('Error al obtener el estudiante')); // Simular error

      await expect(EstudianteRepository.obtenerPorIdentificacion(identificacion)).rejects.toThrow('Error al obtener el estudiante');
    });
  });
});