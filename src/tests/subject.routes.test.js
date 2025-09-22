import request from 'supertest';
import express from 'express';
import subjectRoutes from '../routes/subject.routes.js';

// Mock middleware para omitir autenticación en tests
jest.mock('../middlewares/auth.middleware.js', () => ({
  verificarToken: (req, res, next) => next(),
}));

// Mock de controladores para verificar llamadas sin ejecutar lógica real
const mockGetAllSubjects = jest.fn((req, res) => res.json([{ codigo: 'ESP101' }]));
const mockGetSubjectByCodigo = jest.fn((req, res) => res.json({ codigo: req.params.codigo }));
const mockCreateSubject = jest.fn((req, res) => res.status(201).json({ msg: 'creado' }));
const mockUpdateSubjectByCodigo = jest.fn((req, res) => res.json({ msg: 'actualizado' }));
const mockDeleteSubjectByCodigo = jest.fn((req, res) => res.json({ mensaje: 'Materia eliminada correctamente' }));

// Reemplazamos los controladores reales por mocks
jest.mock('../controllers/subject.controller.js', () => ({
  getAllSubjects: (req, res) => mockGetAllSubjects(req, res),
  getSubjectByCodigo: (req, res) => mockGetSubjectByCodigo(req, res),
  createSubject: (req, res) => mockCreateSubject(req, res),
  updateSubjectByCodigo: (req, res) => mockUpdateSubjectByCodigo(req, res),
  deleteSubjectByCodigo: (req, res) => mockDeleteSubjectByCodigo(req, res),
}));

describe('Rutas de subjects', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api', subjectRoutes);
  });

  test('GET /api/subjects llama a getAllSubjects', async () => {
    const res = await request(app).get('/api/subjects');
    expect(mockGetAllSubjects).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ codigo: 'ESP101' }]);
  });

  test('GET /api/subjects/:codigo llama a getSubjectByCodigo', async () => {
    const res = await request(app).get('/api/subjects/ESP101');
    expect(mockGetSubjectByCodigo).toHaveBeenCalled();
    expect(res.body).toEqual({ codigo: 'ESP101' });
  });

  test('POST /api/subjects llama a createSubject', async () => {
    const res = await request(app)
      .post('/api/subjects')
      .send({ codigo: 'ESP101', nombre: 'Español', intensidad_horaria: 5, docenteDocumento: 1234 });
    expect(mockCreateSubject).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ msg: 'creado' });
  });

  test('PUT /api/subjects/:codigo llama a updateSubjectByCodigo', async () => {
    const res = await request(app)
      .put('/api/subjects/ESP101')
      .send({ nombre: 'Español Avanzado', intensidad_horaria: 6, docenteDocumento: 5678 });
    expect(mockUpdateSubjectByCodigo).toHaveBeenCalled();
    expect(res.body).toEqual({ msg: 'actualizado' });
  });

  test('DELETE /api/subjects/:codigo llama a deleteSubjectByCodigo', async () => {
    const res = await request(app).delete('/api/subjects/ESP101');
    expect(mockDeleteSubjectByCodigo).toHaveBeenCalled();
    expect(res.body).toEqual({ mensaje: 'Materia eliminada correctamente' });
  });
});
