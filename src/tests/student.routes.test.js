import request from 'supertest';
import express from 'express';
import studentRoutes from '../routes/student.routes.js';

// Mock del middleware para saltar la autenticación en tests
jest.mock('../middlewares/auth.middleware.js', () => ({
  verificarToken: (req, res, next) => next(),
}));

// Mock de los controladores para verificar llamadas
const mockCrearEstudiante = jest.fn((req, res) => res.status(201).json({ msg: 'creado' }));
const mockActualizarEstudiante = jest.fn((req, res) => res.json({ msg: 'actualizado' }));
const mockEliminarEstudiante = jest.fn((req, res) => res.json({ msg: 'eliminado' }));
const mockObtenerEstudiante = jest.fn((req, res) => res.json({ id: req.params.identificacion }));
const mockObtenerEstudiantes = jest.fn((req, res) => res.json([{ id: 1 }, { id: 2 }]));

// Reemplazamos los controladores reales por los mocks
jest.mock('../controllers/student.controller.js', () => ({
  crearEstudiante: (req, res) => mockCrearEstudiante(req, res),
  actualizarEstudiante: (req, res) => mockActualizarEstudiante(req, res),
  eliminarEstudiante: (req, res) => mockEliminarEstudiante(req, res),
  obtenerEstudiante: (req, res) => mockObtenerEstudiante(req, res),
  obtenerEstudiantes: (req, res) => mockObtenerEstudiantes(req, res),
}));

describe('Rutas de estudiantes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api', studentRoutes);
  });

  test('POST /api/students llama a crearEstudiante', async () => {
    const res = await request(app)
      .post('/api/students')
      .send({ primerNombre: 'Juan' });

    expect(mockCrearEstudiante).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ msg: 'creado' });
  });

  test('PUT /api/students/:identificacion llama a actualizarEstudiante', async () => {
    const res = await request(app)
      .put('/api/students/123')
      .send({ primerNombre: 'Pedro' });

    expect(mockActualizarEstudiante).toHaveBeenCalled();
    expect(res.body).toEqual({ msg: 'actualizado' });
  });

  test('DELETE /api/students/:identificacion llama a eliminarEstudiante', async () => {
    const res = await request(app).delete('/api/students/123');
    expect(mockEliminarEstudiante).toHaveBeenCalled();
    expect(res.body).toEqual({ msg: 'eliminado' });
  });

  test('GET /api/students/:identificacion llama a obtenerEstudiante', async () => {
    const res = await request(app).get('/api/students/123');
    expect(mockObtenerEstudiante).toHaveBeenCalled();
    expect(res.body).toEqual({ id: '123' });
  });

  test('GET /api/students llama a obtenerEstudiantes', async () => {
    const res = await request(app).get('/api/students');
    expect(mockObtenerEstudiantes).toHaveBeenCalled();
    expect(res.body).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
