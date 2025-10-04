import * as estudianteService from "../services/estudiante.service.js";
import EstudianteRepository from "../repositories/estudiante.repository.js";
import Usuario from "../models/usuario.model.js";

jest.mock("../repositories/estudiante.repository.js");

describe("EstudianteServicio", () => {
  let findByPkSpy;
  let createSpy;

  beforeEach(() => {
    // Limpia mocks antes de cada test
    jest.clearAllMocks();

    // Espías para Usuario
    findByPkSpy = jest.spyOn(Usuario, "findByPk");
    createSpy = jest.spyOn(Usuario, "create");
  });

  test("crearEstudianteService crea usuario y estudiante si no existe usuario", async () => {
    const mockDatos = {
      usuarioCodigo: "1001",
      primerNombre: "Juan",
      segundoNombre: "Carlos",
      identificacion: "12345",
    };

    // Usuario no existe
    findByPkSpy.mockResolvedValue(null);

    // Usuario creado
    createSpy.mockResolvedValue({
      codigo: "1001",
      nombre: "Juan Carlos",
      contraseña: "hashedPassword",
    });

    // Estudiante creado
    EstudianteRepository.crear.mockResolvedValue({
      identificacion: "12345",
      primerNombre: "Juan",
      segundoNombre: "Carlos",
    });

    const res = await estudianteService.crearEstudianteService(mockDatos);

    expect(findByPkSpy).toHaveBeenCalledWith("1001");
    expect(createSpy).toHaveBeenCalled();
    expect(EstudianteRepository.crear).toHaveBeenCalledWith({
      ...mockDatos,
      usuarioCodigo: "1001",
    });

    expect(res.usuario.nombre).toBe("Juan Carlos");
    expect(res.usuario.contraseña).toBe("******");
  });

  test("obtenerEstudiantesService llama a Estudiante.findAll", async () => {
    const estudiantesMock = [{ identificacion: "12345" }];
    // No mockeamos Estudiante, solo controlamos el resultado si es necesario
    // Alternativa: se puede usar spyOn si quieres mockear
    const spy = jest.spyOn(
      estudianteService,
      "obtenerEstudiantesService"
    );
    spy.mockResolvedValue(estudiantesMock);

    const res = await estudianteService.obtenerEstudiantesService();
    expect(res).toEqual(estudiantesMock);
    spy.mockRestore();
  });

  test("obtenerEstudiantePorIdentificacionService llama a Estudiante.findOne", async () => {
    const estudianteMock = { identificacion: "12345" };
    const spy = jest.spyOn(
      estudianteService,
      "obtenerEstudiantePorIdentificacionService"
    );
    spy.mockResolvedValue(estudianteMock);

    const res = await estudianteService.obtenerEstudiantePorIdentificacionService(
      "12345"
    );
    expect(res).toEqual(estudianteMock);
    spy.mockRestore();
  });

  test("actualizarEstudianteService llama a actualizarPorIdentificacion", async () => {
    const estudianteMock = { identificacion: "12345", primerNombre: "Juan" };
    EstudianteRepository.actualizarPorIdentificacion.mockResolvedValue(
      estudianteMock
    );

    const res = await estudianteService.actualizarEstudianteService("12345", {
      primerNombre: "Juan",
    });

    expect(EstudianteRepository.actualizarPorIdentificacion).toHaveBeenCalledWith(
      "12345",
      { primerNombre: "Juan" }
    );
    expect(res).toEqual(estudianteMock);
  });

  test("eliminarEstudianteService llama a eliminarPorIdentificacion", async () => {
    EstudianteRepository.eliminarPorIdentificacion.mockResolvedValue({
      success: true,
    });

    const res = await estudianteService.eliminarEstudianteService("12345");

    expect(EstudianteRepository.eliminarPorIdentificacion).toHaveBeenCalledWith(
      "12345"
    );
    expect(res).toBe(true);
  });
});
