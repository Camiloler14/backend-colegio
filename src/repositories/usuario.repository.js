import Usuario from "../models/usuario.model.js";

const UsuarioRepositorio = {
  buscarPorCodigo: async (codigo) =>
    await Usuario.findOne({ where: { codigo } }),
  obtenerTodos: async () => await Usuario.findAll(),
  crear: async (datosUsuario) => await Usuario.create(datosUsuario),
  actualizar: async (codigo, datosUsuario) => {
    const [editado] = await Usuario.update(datosUsuario, { where: { codigo } });
    if (!editado) throw new Error("Usuario no encontrado");
    return Usuario.findOne({ where: { codigo } });
  },
  eliminar: async (codigo) => {
    const eliminado = await Usuario.destroy({ where: { codigo } });
    if (!eliminado) throw new Error("Usuario no encontrado");
    return true;
  },
};

export default UsuarioRepositorio;
