import * as SubjectService from '../services/subject.service.js';
import * as subjectRepository from '../repository/subject.repository.js';

jest.mock('../repository/subject.repository.js');

describe('Subject Service', () => {
  const subjectMock = {
    id: 1,
    codigo: 'MAT101',
    nombre: 'Matemáticas',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllSubjects', () => {
    it('debería devolver todos los subjects', async () => {
      subjectRepository.findAllSubjects.mockResolvedValue([subjectMock]);

      const result = await SubjectService.getAllSubjects();

      expect(result).toEqual([subjectMock]);
      expect(subjectRepository.findAllSubjects).toHaveBeenCalled();
    });
  });

  describe('getSubjectById', () => {
    it('debería devolver un subject por id', async () => {
      subjectRepository.findSubjectById.mockResolvedValue(subjectMock);

      const result = await SubjectService.getSubjectById(1);

      expect(result).toEqual(subjectMock);
      expect(subjectRepository.findSubjectById).toHaveBeenCalledWith(1);
    });
  });

  describe('createSubject', () => {
    it('debería crear un subject', async () => {
      subjectRepository.createSubject.mockResolvedValue(subjectMock);

      const result = await SubjectService.createSubject(subjectMock);

      expect(result).toEqual(subjectMock);
      expect(subjectRepository.createSubject).toHaveBeenCalledWith(subjectMock);
    });
  });

  describe('updateSubjectByCodigo', () => {
    it('debería actualizar un subject si existe', async () => {
      subjectRepository.findSubjectByCodigo.mockResolvedValue(subjectMock);
      subjectRepository.updateSubject.mockResolvedValue({ ...subjectMock, nombre: 'Matemáticas Avanzadas' });

      const updatedData = { nombre: 'Matemáticas Avanzadas' };
      const result = await SubjectService.updateSubjectByCodigo('MAT101', updatedData);

      expect(subjectRepository.findSubjectByCodigo).toHaveBeenCalledWith('MAT101');
      expect(subjectRepository.updateSubject).toHaveBeenCalledWith(subjectMock, updatedData);
      expect(result).toEqual({ ...subjectMock, nombre: 'Matemáticas Avanzadas' });
    });

    it('debería devolver null si el subject no existe', async () => {
      subjectRepository.findSubjectByCodigo.mockResolvedValue(null);

      const result = await SubjectService.updateSubjectByCodigo('MAT101', { nombre: 'Matemáticas Avanzadas' });

      expect(subjectRepository.findSubjectByCodigo).toHaveBeenCalledWith('MAT101');
      expect(subjectRepository.updateSubject).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('deleteSubjectByCodigo', () => {
    it('debería eliminar un subject si existe', async () => {
      subjectRepository.findSubjectByCodigo.mockResolvedValue(subjectMock);
      subjectRepository.deleteSubject.mockResolvedValue(true);

      const result = await SubjectService.deleteSubjectByCodigo('MAT101');

      expect(subjectRepository.findSubjectByCodigo).toHaveBeenCalledWith('MAT101');
      expect(subjectRepository.deleteSubject).toHaveBeenCalledWith(subjectMock);
      expect(result).toBe(true);
    });

    it('debería devolver null si el subject no existe', async () => {
      subjectRepository.findSubjectByCodigo.mockResolvedValue(null);

      const result = await SubjectService.deleteSubjectByCodigo('MAT101');

      expect(subjectRepository.findSubjectByCodigo).toHaveBeenCalledWith('MAT101');
      expect(subjectRepository.deleteSubject).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('getSubjectByCodigo', () => {
    it('debería devolver un subject por código', async () => {
      subjectRepository.findSubjectByCodigo.mockResolvedValue(subjectMock);

      const result = await SubjectService.getSubjectByCodigo('MAT101');

      expect(subjectRepository.findSubjectByCodigo).toHaveBeenCalledWith('MAT101');
      expect(result).toEqual(subjectMock);
    });
  });
});
