import * as subjectController from '../controllers/subject.controller.js';
import * as subjectService from '../services/subject.service.js';

describe('Subject Controller', () => {
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

  describe('getAllSubjects', () => {
    it('debe devolver la lista de materias', async () => {
      const materias = [{ codigo: 'MAT101' }, { codigo: 'HIS202' }];
      jest.spyOn(subjectService, 'getAllSubjects').mockResolvedValue(materias);

      await subjectController.getAllSubjects(req, res);

      expect(subjectService.getAllSubjects).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(materias);
    });

    it('debe manejar error y devolver 500', async () => {
      const error = new Error('Error interno');
      jest.spyOn(subjectService, 'getAllSubjects').mockRejectedValue(error);
      jest.spyOn(console, 'error').mockImplementation(() => {});

      await subjectController.getAllSubjects(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener las materias' });

      console.error.mockRestore();
    });
  });

  describe('getSubjectByCodigo', () => {
    it('debe devolver materia si existe', async () => {
      req.params.codigo = 'MAT101';
      const materia = { codigo: 'MAT101', nombre: 'Matemáticas' };
      jest.spyOn(subjectService, 'getSubjectByCodigo').mockResolvedValue(materia);

      await subjectController.getSubjectByCodigo(req, res);

      expect(subjectService.getSubjectByCodigo).toHaveBeenCalledWith('MAT101');
      expect(res.json).toHaveBeenCalledWith(materia);
    });

    it('debe devolver 404 si materia no encontrada', async () => {
      req.params.codigo = 'MAT999';
      jest.spyOn(subjectService, 'getSubjectByCodigo').mockResolvedValue(null);

      await subjectController.getSubjectByCodigo(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Materia no encontrada' });
    });

    it('debe manejar error y devolver 500', async () => {
      req.params.codigo = 'MAT101';
      const error = new Error('Error interno');
      jest.spyOn(subjectService, 'getSubjectByCodigo').mockRejectedValue(error);
      jest.spyOn(console, 'error').mockImplementation(() => {});

      await subjectController.getSubjectByCodigo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener la materia' });

      console.error.mockRestore();
    });
  });

  describe('createSubject', () => {
    it('debe crear materia y devolver 201 con datos', async () => {
      req.body = { codigo: 'MAT101', nombre: 'Matemáticas' };
      const nuevaMateria = { id: 1, ...req.body };

      jest.spyOn(subjectService, 'createSubject').mockResolvedValue(nuevaMateria);

      await subjectController.createSubject(req, res);

      expect(subjectService.createSubject).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(nuevaMateria);
    });

    it('debe manejar error de validación SequelizeValidationError', async () => {
      const error = new Error('Validación fallida');
      error.name = 'SequelizeValidationError';
      error.errors = [{ message: 'El campo nombre es obligatorio' }, { message: 'El código es único' }];
      jest.spyOn(subjectService, 'createSubject').mockRejectedValue(error);

      await subjectController.createSubject(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error de validación',
        details: ['El campo nombre es obligatorio', 'El código es único']
      });
    });

    it('debe manejar error de código duplicado SequelizeUniqueConstraintError', async () => {
      const error = new Error('Código duplicado');
      error.name = 'SequelizeUniqueConstraintError';
      jest.spyOn(subjectService, 'createSubject').mockRejectedValue(error);

      await subjectController.createSubject(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ message: 'El código de materia ya existe. Debe ser único.' });
    });

    it('debe manejar error de clave foránea SequelizeForeignKeyConstraintError', async () => {
      const error = new Error('Clave foránea inválida');
      error.name = 'SequelizeForeignKeyConstraintError';
      jest.spyOn(subjectService, 'createSubject').mockRejectedValue(error);

      await subjectController.createSubject(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'El docenteDocumento especificado no existe.' });
    });

    it('debe manejar error genérico', async () => {
      const error = new Error('Error genérico');
      jest.spyOn(subjectService, 'createSubject').mockRejectedValue(error);
      jest.spyOn(console, 'error').mockImplementation(() => {});

      await subjectController.createSubject(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al crear la materia' });

      console.error.mockRestore();
    });
  });

  describe('updateSubjectByCodigo', () => {
    it('debe actualizar materia y devolverla', async () => {
      req.params.codigo = 'MAT101';
      req.body = { nombre: 'Matemáticas Avanzadas' };
      const materiaActualizada = { codigo: 'MAT101', nombre: 'Matemáticas Avanzadas' };

      jest.spyOn(subjectService, 'updateSubjectByCodigo').mockResolvedValue(materiaActualizada);

      await subjectController.updateSubjectByCodigo(req, res);

      expect(subjectService.updateSubjectByCodigo).toHaveBeenCalledWith('MAT101', req.body);
      expect(res.json).toHaveBeenCalledWith(materiaActualizada);
    });

    it('debe devolver 404 si materia no encontrada', async () => {
      req.params.codigo = 'MAT999';
      req.body = { nombre: 'Matemáticas Avanzadas' };

      jest.spyOn(subjectService, 'updateSubjectByCodigo').mockResolvedValue(null);

      await subjectController.updateSubjectByCodigo(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Materia no encontrada' });
    });

    it('debe manejar error de clave foránea', async () => {
      req.params.codigo = 'MAT101';
      req.body = { nombre: 'Matemáticas Avanzadas' };
      const error = new Error('Clave foránea inválida');
      error.name = 'SequelizeForeignKeyConstraintError';

      jest.spyOn(subjectService, 'updateSubjectByCodigo').mockRejectedValue(error);

      await subjectController.updateSubjectByCodigo(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'El docenteDocumento especificado no existe.' });
    });

    it('debe manejar error genérico', async () => {
      req.params.codigo = 'MAT101';
      req.body = { nombre: 'Matemáticas Avanzadas' };
      const error = new Error('Error genérico');

      jest.spyOn(subjectService, 'updateSubjectByCodigo').mockRejectedValue(error);
      jest.spyOn(console, 'error').mockImplementation(() => {});

      await subjectController.updateSubjectByCodigo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al actualizar la materia' });

      console.error.mockRestore();
    });
  });

  describe('deleteSubjectByCodigo', () => {
    it('debe eliminar materia y devolver mensaje', async () => {
      req.params.codigo = 'MAT101';
      jest.spyOn(subjectService, 'deleteSubjectByCodigo').mockResolvedValue(true);

      await subjectController.deleteSubjectByCodigo(req, res);

      expect(subjectService.deleteSubjectByCodigo).toHaveBeenCalledWith('MAT101');
      expect(res.json).toHaveBeenCalledWith({ message: 'Materia eliminada correctamente' });
    });

    it('debe devolver 404 si materia no encontrada', async () => {
      req.params.codigo = 'MAT999';
      jest.spyOn(subjectService, 'deleteSubjectByCodigo').mockResolvedValue(false);

      await subjectController.deleteSubjectByCodigo(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Materia no encontrada' });
    });

    it('debe manejar error de clave foránea', async () => {
      req.params.codigo = 'MAT101';
      const error = new Error('Error clave foránea');
      error.name = 'SequelizeForeignKeyConstraintError';

      jest.spyOn(subjectService, 'deleteSubjectByCodigo').mockRejectedValue(error);

      await subjectController.deleteSubjectByCodigo(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'No se puede eliminar la materia porque está relacionada con otros registros.' });
    });

    it('debe manejar error genérico', async () => {
      req.params.codigo = 'MAT101';
      const error = new Error('Error genérico');

      jest.spyOn(subjectService, 'deleteSubjectByCodigo').mockRejectedValue(error);
      jest.spyOn(console, 'error').mockImplementation(() => {});

      await subjectController.deleteSubjectByCodigo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al eliminar la materia' });

      console.error.mockRestore();
    });
  });
});
