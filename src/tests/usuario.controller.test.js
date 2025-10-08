import request from 'supertest';
import express from 'express';
import * as usuarioService from '../services/usuario.service.js';
import usuarioRoutes from '../routes/usuario.routes.js';

jest.mock('../services/usuario.service.js');

const app = express();
app.use(express.json());
app.use('/api/usuario', usuarioRoutes);

describe('Usuario Controller', () => {
  describe('POST /api/usuario/login', () => {
    it('debería hacer login exitoso con credenciales válidas', async () => {
      const usuarioMock = {
        codUsuario: '1234567',
        nombre: 'Camilo',
        password: await import('bcrypt').then(b => b.hash('12345', 10)),
        rol: 'estudiante',
      };

      usuarioService.obtenerUsuarioPorCodigoService.mockResolvedValue(usuarioMock);

      const response = await request(app)
        .post('/api/usuario/login')
        .send({ codUsuario: '1234567', password: '12345' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('mensaje', 'Login exitoso');
      expect(response.body).toHaveProperty('token');
    });

    it('debería fallar si el usuario no existe', async () => {
      usuarioService.obtenerUsuarioPorCodigoService.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/usuario/login')
        .send({ codUsuario: 'noexiste', password: '12345' });

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('mensaje', 'Usuario no encontrado');
    });

    it('debería fallar si falta codUsuario o password', async () => {
      const response = await request(app)
        .post('/api/usuario/login')
        .send({ codUsuario: '' }); // faltando password

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('mensaje', 'codUsuario y password requeridos');
    });

    it('debería fallar con contraseña incorrecta', async () => {
      const usuarioMock = {
        codUsuario: '1234567',
        nombre: 'Camilo',
        password: await import('bcrypt').then(b => b.hash('correcta', 10)),
        rol: 'estudiante',
      };

      usuarioService.obtenerUsuarioPorCodigoService.mockResolvedValue(usuarioMock);

      const response = await request(app)
        .post('/api/usuario/login')
        .send({ codUsuario: '1234567', password: 'incorrecta' });

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('mensaje', 'Password incorrecto');
    });
  });
});
