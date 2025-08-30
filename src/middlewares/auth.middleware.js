import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; 

export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  // Verifica si el formato del token es correcto (Bearer <token>)
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ mensaje: 'Token mal formado, debe ser "Bearer <token>"' });
  }

  const token = parts[1];

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;  // Guarda la información decodificada en la solicitud
    next();  // Continúa con la ejecución de la siguiente función de middleware o controlador
  } catch (err) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
}
