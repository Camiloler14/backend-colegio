import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminRepository from '../repository/admin.repository.js';
import { login } from '../services/auth.service.js';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../repository/admin.repository.js');

describe('auth.service - login', () => {
  const adminMock = {
    id: 1,
    usuario: 'adminuser',
    contraseña: 'hashedpassword',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debería devolver token si usuario y contraseña son correctos', async () => {
    AdminRepository.findByUsuario.mockResolvedValue(adminMock);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token123');

    const result = await login('adminuser', 'password');

    expect(AdminRepository.findByUsuario).toHaveBeenCalledWith('adminuser');
    expect(bcrypt.compare).toHaveBeenCalledWith('password', adminMock.contraseña);
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: adminMock.id, usuario: adminMock.usuario },
      expect.any(String),
      { expiresIn: '1h' }
    );
    expect(result).toEqual({ token: 'token123' });
  });

  test('debería lanzar error 404 si usuario no existe', async () => {
    AdminRepository.findByUsuario.mockResolvedValue(null);

    await expect(login('usernoexiste', 'password')).rejects.toEqual({
      status: 404,
      message: 'El usuario no se encuentra registrado.',
    });

    expect(AdminRepository.findByUsuario).toHaveBeenCalledWith('usernoexiste');
  });

  test('debería lanzar error 401 si contraseña incorrecta', async () => {
    AdminRepository.findByUsuario.mockResolvedValue(adminMock);
    bcrypt.compare.mockResolvedValue(false);

    await expect(login('adminuser', 'wrongpassword')).rejects.toEqual({
      status: 401,
      message: 'La contraseña ingresada es incorrecta.',
    });

    expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', adminMock.contraseña);
  });

  test('debería lanzar error 500 para errores inesperados', async () => {
    AdminRepository.findByUsuario.mockRejectedValue(new Error('DB error'));

    await expect(login('adminuser', 'password')).rejects.toEqual({
      status: 500,
      message: 'Ocurrió un error en el servidor.',
    });
  });
});
