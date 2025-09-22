/** 
Importa la función 'login' desde 
el servicio de autenticación
*/
import { login } from "../services/auth.service.js";

/**
Controlador para iniciar sesión como administrador.
Este endpoint espera un cuerpo (body) con los campos:
 - usuario: string (nombre de usuario)
 - contraseña: string (clave de acceso)
Si las credenciales son válidas, responde con un token de autenticación.
En caso contrario, devuelve un error con el estado HTTP correspondiente.
 
@param {Request} req - Objeto de solicitud (request) de Express
@param {Response} res - Objeto de respuesta (response) de Express
*/
export async function loginAdmin(req, res) {
  const { usuario, contraseña } = req.body; // Extrae las credenciales del cuerpo de la solicitud

  // Validación de parámetros de entrada: ambos campos son obligatorios
  if (!usuario || !contraseña) {
    return res
      .status(400)
      .json({ mensaje: "Usuario y contraseña son obligatorios" });
  }

  try {
    // Llama al servicio de autenticación para validar las credenciales
    const { token } = await login(usuario, contraseña);

    // Si las credenciales son válidas, devuelve el token al cliente
    return res.json({ token });
  } catch (error) {
    // Muestra el error en consola para propósitos de 
    // depuración (sin exponer detalles al cliente)
    console.error("Error en loginAdmin:", error.message);

    // Devuelve una respuesta genérica para evitar revelar 
    // si el fallo fue por usuario o contraseña
    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  }
}
