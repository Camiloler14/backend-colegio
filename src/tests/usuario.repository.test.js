import * as UsuarioRepository from "../repositories/usuario.repository.js";
import Usuario from "../models/usuario.model.js";

jest.mock("../models/usuario.model.js");

describe("UsuarioRepository", () => {
  const usuarioMock = {
    codUsuario: "U123",
    nombre: "Juan",
    rol: "estudiante",
    password: "hashedpass",
    toJSON: function () { return { codUsuario: this.codUsuario, nombre: this.nombre, rol: this.rol }; }
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("crearUsuario crea un nuevo usuario", async () => {
    Usuario.create.mockResolvedValue(usuarioMock);

    const result = await UsuarioRepository.crearUsuario(usuarioMock);

    expect(Usuario.create).toHaveBeenCalledWith(usuarioMock);
    expect(result).toEqual(usuarioMock);
  });

  test("obtenerUsuarioPorCodigo retorna un usuario por código", async () => {
    Usuario.findOne.mockResolvedValue(usuarioMock);

    const result = await UsuarioRepository.obtenerUsuarioPorCodigo("U123");

    expect(Usuario.findOne).toHaveBeenCalledWith({ where: { codUsuario: "U123" } });
    expect(result).toEqual(usuarioMock);
  });

  test("obtenerTodosUsuarios retorna todos los usuarios excluyendo password", async () => {
    Usuario.findAll.mockResolvedValue([usuarioMock]);

    const result = await UsuarioRepository.obtenerTodosUsuarios();

    expect(Usuario.findAll).toHaveBeenCalledWith({ attributes: { exclude: ["password"] } });
    expect(result).toEqual([usuarioMock]);
  });

  test("actualizarUsuario actualiza un usuario existente", async () => {
    Usuario.findByPk.mockResolvedValue(usuarioMock);
    usuarioMock.save = jest.fn().mockResolvedValue(usuarioMock);

    const result = await UsuarioRepository.actualizarUsuario("U123", { nombre: "Pedro", rol: "docente" });

    expect(Usuario.findByPk).toHaveBeenCalledWith("U123");
    expect(usuarioMock.save).toHaveBeenCalled();
    expect(result).toEqual({ codUsuario: "U123", nombre: "Pedro", rol: "docente" });
  });

  test("actualizarUsuario retorna null si el usuario no existe", async () => {
    Usuario.findByPk.mockResolvedValue(null);

    const result = await UsuarioRepository.actualizarUsuario("NOEXISTE", { nombre: "Pedro" });

    expect(result).toBeNull();
  });

  test("eliminarUsuario elimina un usuario existente", async () => {
    Usuario.findByPk.mockResolvedValue(usuarioMock);
    usuarioMock.destroy = jest.fn().mockResolvedValue(usuarioMock);

    const result = await UsuarioRepository.eliminarUsuario("U123");

    expect(Usuario.findByPk).toHaveBeenCalledWith("U123");
    expect(usuarioMock.destroy).toHaveBeenCalled();
    expect(result).toEqual(usuarioMock);
  });

  test("eliminarUsuario retorna null si el usuario no existe", async () => {
    Usuario.findByPk.mockResolvedValue(null);

    const result = await UsuarioRepository.eliminarUsuario("NOEXISTE");

    expect(result).toBeNull();
  });
});
