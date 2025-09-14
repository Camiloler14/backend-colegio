import * as studentController from '../controllers/student.controller.js';
import * as studentService from '../services/student.service.js';

describe('Student Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('crearEstudiante', () => {
    const validBody = {
      identificacion: 12345,
      primerNombre: 'Juan',
      primerApellido: 'Perez',
      edad: 15,
      genero: 'M',
      fechaNacimiento: '2008-05-10',
      acudiente1: 'Maria Perez',
      telefonoAcudiente1: '1234567890',
      direccion: 'Calle 123',
      barrio: 'Centro',
      ciudad: 'CiudadX',
      fechaMatricula: '2023-02-01',
      fechaIngreso: '2023-02-01',
      antiguedad: '1 año',
      grado: 10,
      estado: 'activo'
    };

    it('debe devolver 400 si faltan campos o tipos son inválidos', async () => {
      req.body = { primerNombre: 'Juan' }; // incompleto

      await studentController.crearEstudiante(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Faltan campos obligatorios o tipos inválidos' });
    });

    it('debe crear estudiante y devolver 201 con datos', async () => {
      req.body = validBody;

      jest.spyOn(studentService, 'crearEstudianteService').mockResolvedValue(validBody);

      await studentController.crearEstudiante(req, res);

      expect(studentService.crearEstudianteService).toHaveBeenCalledWith(validBody);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(validBody);
    });

    it('debe manejar errores y devolver 500', async () => {
      req.body = validBody;
      const error = new Error('Error interno');
      jest.spyOn(studentService, 'crearEstudianteService').mockRejectedValue(error);
      jest.spyOn(console, 'error').mockImplementation(() => {});

      await studentController.crearEstudiante(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });

      console.error.mockRestore();
    });
  });

  describe('obtenerEstudiantes', () => {
    it('debe devolver lista de estudiantes', async () => {
      const estudiantes = [{ identificacion: 1 }, { identificacion: 2 }];
      jest.spyOn(studentService, 'obtenerEstudiantesService').mockResolvedValue(estudiantes);

      await studentController.obtenerEstudiantes(req, res);

      expect(studentService.obtenerEstudiantesService).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(estudiantes);
    });

    it('debe manejar error y devolver 500', async () => {
      const error = new Error('Error interno');
      jest.spyOn(studentService, 'obtenerEstudiantesService').mockRejectedValue(error);
      jest.spyOn(console, 'error').mockImplementation(() => {});

      await studentController.obtenerEstudiantes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });

      console.error.mockRestore();
    });
  });

  describe('obtenerEstudiante', () => {
    it('debe devolver estudiante si existe', async () => {
      const estudiante = { identificacion: 123 };
      req.params.identificacion = '123';

      jest.spyOn(studentService, 'obtenerEstudiantePorIdentificacionService').mockResolvedValue(estudiante);

      await studentController.obtenerEstudiante(req, res);

      expect(studentService.obtenerEstudiantePorIdentificacionService).toHaveBeenCalledWith(123);
      expect(res.json).toHaveBeenCalledWith(estudiante);
    });

    it('debe devolver 404 si estudiante no encontrado', async () => {
      req.params.identificacion = '999';
      jest.spyOn(studentService, 'obtenerEstudiantePorIdentificacionService').mockResolvedValue(null);

      await studentController.obtenerEstudiante(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Estudiante no encontrado' });
    });

    it('debe manejar error y devolver 500', async () => {
      req.params.identificacion = '123';
      const error = new Error('Error interno');
      jest.spyOn(studentService, 'obtenerEstudiantePorIdentificacionService').mockRejectedValue(error);
      jest.spyOn(console, 'error').mockImplementation(() => {});

      await studentController.obtenerEstudiante(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });

      console.error.mockRestore();
    });
  });

  describe('actualizarEstudiante', () => {
    it('debe actualizar estudiante y devolver datos actualizados', async () => {
      const estudianteActualizado = { identificacion: 123, primerNombre: 'NuevoNombre' };
      req.params.identificacion = '123';
      req.body = { primerNombre: 'NuevoNombre' };

      jest.spyOn(studentService, 'actualizarEstudianteService').mockResolvedValue(estudianteActualizado);

      await studentController.actualizarEstudiante(req, res);

      expect(studentService.actualizarEstudianteService).toHaveBeenCalledWith(123, req.body);
      expect(res.json).toHaveBeenCalledWith(estudianteActualizado);
    });

    it('debe devolver 404 si estudiante no existe', async () => {
      req.params.identificacion = '123';
      req.body = { primerNombre: 'NuevoNombre' };

      jest.spyOn(studentService, 'actualizarEstudianteService').mockResolvedValue(null);

      await studentController.actualizarEstudiante(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Estudiante no encontrado' });
    });

    it('debe manejar error y devolver 500', async () => {
      req.params.identificacion = '123';
      req.body = { primerNombre: 'NuevoNombre' };
      const error = new Error('Error interno');

      jest.spyOn(studentService, 'actualizarEstudianteService').mockRejectedValue(error);
      jest.spyOn(console, 'error').mockImplementation(() => {});

      await studentController.actualizarEstudiante(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });

      console.error.mockRestore();
    });
  });

  describe('eliminarEstudiante', () => {
    it('debe eliminar estudiante y devolver mensaje de éxito', async () => {
      req.params.identificacion = '123';
      jest.spyOn(studentService, 'eliminarEstudianteService').mockResolvedValue(true);

      await studentController.eliminarEstudiante(req, res);

      expect(studentService.eliminarEstudianteService).toHaveBeenCalledWith(123);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Estudiante eliminado correctamente' });
    });

    it('debe devolver 404 si estudiante no existe', async () => {
      req.params.identificacion = '123';
      jest.spyOn(studentService, 'eliminarEstudianteService').mockResolvedValue(false);

      await studentController.eliminarEstudiante(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Estudiante no encontrado' });
    });

    it('debe manejar error y devolver 500', async () => {
      req.params.identificacion = '123';
      const error = new Error('Error interno');
      jest.spyOn(studentService, 'eliminarEstudianteService').mockRejectedValue(error);
      jest.spyOn(console, 'error').mockImplementation(() => {});

      await studentController.eliminarEstudiante(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });

      console.error.mockRestore();
    });
  });
});
