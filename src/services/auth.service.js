import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminRepository from '../repository/admin.repository.js';

const JWT_SECRET = process.env.JWT_SECRET || 'open system';  
export async function login(usuario, contraseña) {
  try {
    // Buscar el administrador por su nombre de usuario
    const admin = await AdminRepository.findByUsuario(usuario);
    if (!admin) {
      throw new Error('Usuario no encontrado');
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const isValid = await bcrypt.compare(contraseña, admin.contraseña);
    if (!isValid) {
      throw new Error('Contraseña incorrecta');
    }

    // Generar el token JWT con la información del administrador
    const token = jwt.sign({ id: admin.id, usuario: admin.usuario }, JWT_SECRET, {
      expiresIn: '1h',  // El token expira en 1 hora
    });

    return { token };

  } catch (error) {
    // Si hay un error, devolverlo de manera más estructurada
    if (error.message === 'Usuario no encontrado') {
      throw { status: 404, message: 'El usuario no se encuentra registrado.' };
    }
    if (error.message === 'Contraseña incorrecta') {
      throw { status: 401, message: 'La contraseña ingresada es incorrecta.' };
    }
    throw { status: 500, message: 'Ocurrió un error en el servidor.' };  // Error genérico para otros casos
  }
}

