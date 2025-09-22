import { verificarToken } from '../middlewares/auth.middleware.js'; 
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken'); // Mock completo de jwt

describe('Middleware: verificarToken', () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Debe responder 401 si no hay header Authorization', () => {
    const req = { headers: {} };

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Token no proporcionado' });
    expect(next).not.toHaveBeenCalled();
  });

  it('Debe responder 401 si el token está mal formado', () => {
    const req = {
      headers: {
        authorization: 'TokenInvalido',
      },
    };

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Token mal formado, debe ser "Bearer <token>"',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('Debe responder 403 si el token es inválido', () => {
    const req = {
      headers: {
        authorization: 'Bearer token_invalido',
      },
    };

    jwt.verify.mockImplementation(() => {
      throw new Error('Token inválido');
    });

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      mensaje: 'Token inválido o expirado',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('Debe llamar a next() si el token es válido', () => {
    const req = {
      headers: {
        authorization: 'Bearer token_valido',
      },
    };

    const decoded = { id: '123', email: 'admin@example.com' };

    jwt.verify.mockReturnValue(decoded);

    verificarToken(req, res, next);

    expect(req.admin).toEqual(decoded);
    expect(next).toHaveBeenCalled();
  });
});
