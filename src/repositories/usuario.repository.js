import Usuario from "../models/usuario.model.js";

export const crearUsuario = async (data) => {
  return await Usuario.create(data);
};

export const obtenerUsuarioPorCodigo = async (codUsuario) => {
  return await Usuario.findOne({ where: { codUsuario } });
};

export const obtenerTodosUsuarios = async () => {
  return await Usuario.findAll({
    attributes: { exclude: ["password"] },
  });
};

export const actualizarUsuario = async (codUsuario, data) => {
  const usuario = await Usuario.findByPk(codUsuario);
  if (!usuario) return null;
  if (data.nombre) usuario.nombre = data.nombre;
  if (data.rol) usuario.rol = data.rol;
  if (data.password) {
    usuario.password = data.password;
  }

  await usuario.save();
// eslint-disable-next-line no-unused-vars
  const { password, ...usuarioSinPassword } = usuario.toJSON();
  return usuarioSinPassword;
};

export const eliminarUsuario = async (codUsuario) => {
  const usuario = await Usuario.findByPk(codUsuario);
  if (!usuario) return null;

  await usuario.destroy();
  return usuario;
};
