import * as usuarioRepo from "../repositories/usuario.repository.js";

export const crearUsuarioService = async (data) => {
  return await usuarioRepo.crearUsuario(data);
};

export const obtenerUsuarioPorCodigoService = async (codUsuario) => {
  return await usuarioRepo.obtenerUsuarioPorCodigo(codUsuario);
};

export const obtenerTodosUsuariosService = async () => {
  return await usuarioRepo.obtenerTodosUsuarios();
};

export const actualizarUsuarioService = async (codUsuario, data) => {
  return await usuarioRepo.actualizarUsuario(codUsuario, data);
};

export const eliminarUsuarioService = async (codUsuario) => {
  return await usuarioRepo.eliminarUsuario(codUsuario);
};
