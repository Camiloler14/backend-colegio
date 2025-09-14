import { loginAdmin } from '../controllers/auth.controller.js';
import * as authService from '../services/auth.service.js';

describe('loginAdmin', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  it('debe responder con 400 si falta usuario o contraseña', async () => {
    req.body = { usuario: '', contraseña: '' };

    await loginAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Usuario y contraseña son obligatorios' });
  });

  it('debe llamar a login y devolver token si las credenciales son correctas', async () => {
    req.body = { usuario: 'admin', contraseña: '1234' };

    // Mock del servicio login para que retorne un token
    jest.spyOn(authService, 'login').mockResolvedValue({ token: 'token123' });

    await loginAdmin(req, res);

    expect(authService.login).toHaveBeenCalledWith('admin', '1234');
    expect(res.json).toHaveBeenCalledWith({ token: 'token123' });
  });

  it('debe responder con 401 si login lanza error', async () => {
    req.body = { usuario: 'admin', contraseña: '1234' };

    jest.spyOn(authService, 'login').mockRejectedValue(new Error('Credenciales inválidas'));

    // Para que no se muestre error en consola durante el test, mockear console.error
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await loginAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Credenciales inválidas' });

    console.error.mockRestore();
  });
});
