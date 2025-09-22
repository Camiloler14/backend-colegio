import * as teacherController from '../controllers/teacher.controller.js';
import * as teacherService from '../services/teacher.service.js';

describe('Teacher Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('crearDocente', () => {
    it('debe devolver 400 si faltan campos obligatorios', async () => {
      req.body = { primerNombre: 'Juan' }; // falta resto

      await teacherController.crearDocente(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Faltan campos obligatorios' });
    });

    it('debe crear un docente y devolver 201', async () => {
      const docenteCreado = { documento: '123', primerNombre: 'Juan' };
      req.body = {
        primerNombre: 'Juan',
        primerApellido: 'Perez',
        email: 'juan@example.com',
        fecha_ingreso: '2023-01-01',
        documento: '123'
      };

      jest.spyOn(teacherService, 'crearDocenteService').mockResolvedValue(docenteCreado);

      await teacherController.crearDocente(req, res);

      expect(teacherService.crearDocenteService).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(docenteCreado);
    });

    it('debe manejar error y devolver 500', async () => {
      req.body = {
        primerNombre: 'Juan',
        primerApellido: 'Perez',
        email: 'juan@example.com',
        fecha_ingreso: '2023-01-01',
        documento: '123'
      };
      const error = new Error('Error interno');
      jest.spyOn(teacherService, 'crearDocenteService').mockRejectedValue(error);

      await teacherController.crearDocente(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });
    });
  });

  describe('obtenerDocentes', () => {
    it('debe devolver lista de docentes', async () => {
      const docentes = [{ documento: '123' }, { documento: '456' }];
      jest.spyOn(teacherService, 'obtenerDocentesService').mockResolvedValue(docentes);

      await teacherController.obtenerDocentes(req, res);

      expect(teacherService.obtenerDocentesService).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(docentes);
    });

    it('debe manejar error y devolver 500', async () => {
      const error = new Error('Error interno');
      jest.spyOn(teacherService, 'obtenerDocentesService').mockRejectedValue(error);

      await teacherController.obtenerDocentes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });
    });
  });

  describe('obtenerDocente', () => {
    it('debe devolver docente si existe', async () => {
      req.params.documento = '123';
      const docente = { documento: '123', primerNombre: 'Juan' };
      jest.spyOn(teacherService, 'obtenerDocentePorDocumentoService').mockResolvedValue(docente);

      await teacherController.obtenerDocente(req, res);

      expect(teacherService.obtenerDocentePorDocumentoService).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith(docente);
    });

    it('debe devolver 404 si docente no encontrado', async () => {
      req.params.documento = '999';
      jest.spyOn(teacherService, 'obtenerDocentePorDocumentoService').mockResolvedValue(null);

      await teacherController.obtenerDocente(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Docente no encontrado' });
    });

    it('debe manejar error y devolver 500', async () => {
      req.params.documento = '123';
      const error = new Error('Error interno');
      jest.spyOn(teacherService, 'obtenerDocentePorDocumentoService').mockRejectedValue(error);

      await teacherController.obtenerDocente(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });
    });
  });

  describe('actualizarDocente', () => {
    it('debe actualizar y devolver docente', async () => {
      req.params.documento = '123';
      req.body = { primerNombre: 'Juan' };
      const docenteActualizado = { documento: '123', primerNombre: 'Juan' };
      jest.spyOn(teacherService, 'actualizarDocenteService').mockResolvedValue(docenteActualizado);

      await teacherController.actualizarDocente(req, res);

      expect(teacherService.actualizarDocenteService).toHaveBeenCalledWith('123', req.body);
      expect(res.json).toHaveBeenCalledWith(docenteActualizado);
    });

    it('debe devolver 404 si docente no encontrado', async () => {
      req.params.documento = '999';
      req.body = { primerNombre: 'Juan' };
      jest.spyOn(teacherService, 'actualizarDocenteService').mockResolvedValue(null);

      await teacherController.actualizarDocente(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Docente no encontrado' });
    });

    it('debe manejar error y devolver 500', async () => {
      req.params.documento = '123';
      req.body = { primerNombre: 'Juan' };
      const error = new Error('Error interno');
      jest.spyOn(teacherService, 'actualizarDocenteService').mockRejectedValue(error);

      await teacherController.actualizarDocente(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });
    });
  });

  describe('eliminarDocente', () => {
    it('debe eliminar y devolver mensaje de éxito', async () => {
      req.params.documento = '123';
      jest.spyOn(teacherService, 'eliminarDocenteService').mockResolvedValue(true);

      await teacherController.eliminarDocente(req, res);

      expect(teacherService.eliminarDocenteService).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Docente eliminado correctamente' });
    });

    it('debe devolver 404 si docente no encontrado', async () => {
      req.params.documento = '999';
      jest.spyOn(teacherService, 'eliminarDocenteService').mockResolvedValue(false);

      await teacherController.eliminarDocente(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Docente no encontrado' });
    });

    it('debe manejar error y devolver 500', async () => {
      req.params.documento = '123';
      const error = new Error('Error interno');
      jest.spyOn(teacherService, 'eliminarDocenteService').mockRejectedValue(error);

      await teacherController.eliminarDocente(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensaje: error.message });
    });
  });
});
