import Usuario from "../models/usuario.model.js";

export const crearUsuario = async (data) => {
  return await Usuario.create(data);
};

export const obtenerUsuarioPorCodigo = async (codUsuario) => {
  return await Usuario.findOne({ where: { codUsuario } });
};

export const obtenerTodosUsuarios = async () => {
  return await Usuario.findAll({
    attributes: { exclude: ["contraseña"] },
  });
};

export const actualizarUsuario = async (codUsuario, data) => {
  const usuario = await Usuario.findByPk(codUsuario);
  if (!usuario) return null;
  if (data.nombre) usuario.nombre = data.nombre;
  if (data.rol) usuario.rol = data.rol;
  if (data.contraseña) {
    usuario.contraseña = data.contraseña;
  }

  await usuario.save();

  const { contraseña, ...usuarioSinContraseña } = usuario.toJSON();
  return usuarioSinContraseña;
};

export const eliminarUsuario = async (codUsuario) => {
  const usuario = await Usuario.findByPk(codUsuario);
  if (!usuario) return null;

  await usuario.destroy();
  return usuario;
};
