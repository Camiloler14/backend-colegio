import * as usuarioService from "../services/usuario.service.js";
import * as usuarioRepo from "../repositories/usuario.repository.js";

jest.mock("../repositories/usuario.repository.js");

describe("UsuarioService", () => {
  const usuarioMock = {
    codUsuario: "U001",
    nombre: "Juan",
    contraseña: "1234",
    rol: "estudiante",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("crearUsuarioService crea un usuario", async () => {
    usuarioRepo.crearUsuario.mockResolvedValue(usuarioMock);

    const result = await usuarioService.crearUsuarioService(usuarioMock);

    expect(usuarioRepo.crearUsuario).toHaveBeenCalledWith(usuarioMock);
    expect(result).toEqual(usuarioMock);
  });

  test("obtenerUsuarioPorCodigoService devuelve un usuario", async () => {
    usuarioRepo.obtenerUsuarioPorCodigo.mockResolvedValue(usuarioMock);

    const result = await usuarioService.obtenerUsuarioPorCodigoService("U001");

    expect(usuarioRepo.obtenerUsuarioPorCodigo).toHaveBeenCalledWith("U001");
    expect(result).toEqual(usuarioMock);
  });

  test("obtenerTodosUsuariosService devuelve todos los usuarios", async () => {
    usuarioRepo.obtenerTodosUsuarios.mockResolvedValue([usuarioMock]);

    const result = await usuarioService.obtenerTodosUsuariosService();

    expect(usuarioRepo.obtenerTodosUsuarios).toHaveBeenCalled();
    expect(result).toEqual([usuarioMock]);
  });

  test("actualizarUsuarioService actualiza un usuario", async () => {
    usuarioRepo.actualizarUsuario.mockResolvedValue([1]);

    const result = await usuarioService.actualizarUsuarioService("U001", { nombre: "Pedro" });

    expect(usuarioRepo.actualizarUsuario).toHaveBeenCalledWith("U001", { nombre: "Pedro" });
    expect(result).toEqual([1]);
  });

  test("eliminarUsuarioService elimina un usuario", async () => {
    usuarioRepo.eliminarUsuario.mockResolvedValue(true);

    const result = await usuarioService.eliminarUsuarioService("U001");

    expect(usuarioRepo.eliminarUsuario).toHaveBeenCalledWith("U001");
    expect(result).toEqual(true);
  });
});
