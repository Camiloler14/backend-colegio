import request from 'supertest';
import app from '../app.js'; 
import Admin from '../models/admin.model.js'; 
import sequelize from '../config/db.js'; 

describe('Rutas de Autenticación (/api/auth)', () => {
  const usuarioTest = 'adminTest';
  const contraseñaTest = 'password123';

  beforeAll(async () => {
    // Limpia antes de ejecutar, en caso de que el usuario ya exista
    await Admin.destroy({ where: { usuario: usuarioTest } });
  });

  afterAll(async () => {
    // Limpia la base de datos después de las pruebas
    await Admin.destroy({ where: { usuario: usuarioTest } });

    // Cierra conexión a BD si es necesario
    if (sequelize?.close) await sequelize.close();
  });

  it('POST /api/auth/register - debe registrar un nuevo admin', async () => {
    const res = await request(app).post('/api/auth/register').send({
      usuario: usuarioTest,
      contraseña: contraseñaTest,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.mensaje).toBe('Administrador creado correctamente');
  });

  it('POST /api/auth/login - debe iniciar sesión y retornar un token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      usuario: usuarioTest,
      contraseña: contraseñaTest,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    // No asignamos token porque no se usa luego
  });

  it('GET /api/auth/admin/:usuario - debe retornar el admin', async () => {
    const res = await request(app).get(`/api/auth/admin/${usuarioTest}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.usuario).toBe(usuarioTest);
  });

  it('PUT /api/auth/admin/:usuario - debe editar la contraseña', async () => {
    const res = await request(app).put(`/api/auth/admin/${usuarioTest}`).send({
      contraseña: 'newPass456',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toBe('Administrador editado correctamente');
  });

  it('DELETE /api/auth/admin/:usuario - debe eliminar al admin', async () => {
    const res = await request(app).delete(`/api/auth/admin/${usuarioTest}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toBe('Administrador eliminado correctamente');
  });

  it('GET /api/auth/admin/:usuario - ahora debe devolver 404', async () => {
    const res = await request(app).get(`/api/auth/admin/${usuarioTest}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.mensaje).toBe('Administrador no encontrado');
  });
});
