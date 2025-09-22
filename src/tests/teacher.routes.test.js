import express from 'express';
import request from 'supertest';

import teacherRoutes from '../routes/teacher.routes.js';

// Mock del middleware para evitar autenticación real
jest.mock('../middlewares/auth.middleware.js', () => ({
  verificarToken: (req, res, next) => next(),
}));

// Mock de controladores para espiar llamadas
const mockCrearDocente = jest.fn((req, res) => res.status(201).json({ message: 'Docente creado' }));
const mockObtenerDocentes = jest.fn((req, res) => res.status(200).json([{ id: 1, nombre: 'Docente 1' }]));
const mockObtenerDocente = jest.fn((req, res) => res.status(200).json({ id: 1, nombre: 'Docente 1' }));
const mockActualizarDocente = jest.fn((req, res) => res.status(200).json({ message: 'Docente actualizado' }));
const mockEliminarDocente = jest.fn((req, res) => res.status(200).json({ message: 'Docente eliminado' }));

// Mock del módulo de controladores para reemplazar funciones reales
jest.mock('../controllers/teacher.controller.js', () => ({
  crearDocente: (req, res) => mockCrearDocente(req, res),
  obtenerDocentes: (req, res) => mockObtenerDocentes(req, res),
  obtenerDocente: (req, res) => mockObtenerDocente(req, res),
  actualizarDocente: (req, res) => mockActualizarDocente(req, res),
  eliminarDocente: (req, res) => mockEliminarDocente(req, res),
}));

describe('Teacher Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api', teacherRoutes);
  });

  it('POST /api/teachers - crear docente', async () => {
    const response = await request(app)
      .post('/api/teachers')
      .send({ primerNombre: 'Juan' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Docente creado' });
    expect(mockCrearDocente).toHaveBeenCalled();
  });

  it('GET /api/teachers - obtener docentes', async () => {
    const response = await request(app).get('/api/teachers');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, nombre: 'Docente 1' }]);
    expect(mockObtenerDocentes).toHaveBeenCalled();
  });

  it('GET /api/teachers/:documento - obtener docente por documento', async () => {
    const response = await request(app).get('/api/teachers/123456');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, nombre: 'Docente 1' });
    expect(mockObtenerDocente).toHaveBeenCalled();
  });

  it('PUT /api/teachers/:documento - actualizar docente', async () => {
    const response = await request(app)
      .put('/api/teachers/123456')
      .send({ primerNombre: 'Juan Actualizado' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Docente actualizado' });
    expect(mockActualizarDocente).toHaveBeenCalled();
  });

  it('DELETE /api/teachers/:documento - eliminar docente', async () => {
    const response = await request(app).delete('/api/teachers/123456');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Docente eliminado' });
    expect(mockEliminarDocente).toHaveBeenCalled();
  });
});
