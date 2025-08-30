import { login } from '../services/auth.service.js';

export async function loginAdmin(req, res) {
  const { usuario, contraseña } = req.body;

  // Validación de parámetros de entrada
  if (!usuario || !contraseña) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña son obligatorios' });
  }

  try {
    // Intentar autenticar al usuario
    const { token } = await login(usuario, contraseña);
    
    // Si el login es exitoso, devolver el token
    return res.json({ token });

  } catch (error) {
    // Registrar el error en el servidor para fines de depuración
    console.error('Error en loginAdmin:', error.message);

    // No revelar si el error fue por usuario o contraseña incorrecta
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }
}


