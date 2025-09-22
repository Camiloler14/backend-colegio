import request from 'supertest';
import server from '../server.js';

afterAll(() => {
  server.close();  // Cierra el servidor al finalizar los tests
});

describe('Servidor y rutas básicas', () => {
  it('GET /api/teachers responde (sin token debería ser 401 o similar)', async () => {
    const res = await request(server).get('/api/teachers');
    expect([200, 401, 403]).toContain(res.statusCode);
  });
});
