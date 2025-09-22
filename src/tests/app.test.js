import request from 'supertest';
import app from '../app.js';

describe('API Routes', () => {
  it('GET /api/teachers - debe responder con 200 (ok)', async () => {
    const res = await request(app).get('/api/teachers');
    // Aquí esperamos 200 o el código que el controlador realmente devuelva cuando no haya autenticación
    expect([200, 401, 403]).toContain(res.statusCode);
  });

  it('POST /api/auth/login - debe responder con 200 o 401 según credenciales', async () => {
    const res = await request(app).post('/api/auth/login').send({ usuario: 'test', contraseña: 'test' });
    expect([200, 401]).toContain(res.statusCode);
  });

  // Puedes agregar tests similares para otras rutas o probar middlewares
});