import * as docenteRepo from "../repositories/docente.repository.js";
import Docente from "../models/docente.model.js";
import Usuario from "../models/usuario.model.js";
import Materia from "../models/materia.model.js";

// Mock de Sequelize
jest.mock("../models/docente.model.js");
jest.mock("../models/usuario.model.js");
jest.mock("../models/materia.model.js");

describe("Docente Repository", () => {
  const docenteMock = {
    codDocente: "D001",
    primerNombre: "Juan",
    primerApellido: "Pérez",
    save: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("crearDocente crea un docente correctamente", async () => {
    Docente.create.mockResolvedValue(docenteMock);
    const result = await docenteRepo.crearDocente(docenteMock);

    expect(Docente.create).toHaveBeenCalledWith(docenteMock);
    expect(result).toEqual(docenteMock);
  });

  test("obtenerDocentePorCodigo devuelve un docente con relaciones", async () => {
    const docenteConRelaciones = {
      ...docenteMock,
      usuario: { codUsuario: "U001", nombre: "Admin", rol: "docente" },
      materias: [],
    };

    Docente.findOne.mockResolvedValue(docenteConRelaciones);

    const result = await docenteRepo.obtenerDocentePorCodigo("D001");

    expect(Docente.findOne).toHaveBeenCalledWith({
      where: { codDocente: "D001" },
      include: [
        { model: Usuario, as: "usuario", attributes: ["codUsuario", "nombre", "rol"] },
        { model: Materia, as: "materias" },
      ],
    });
    expect(result.usuario.codUsuario).toBe("U001");
  });

  test("obtenerTodosDocentes devuelve todos los docentes con relaciones", async () => {
    Docente.findAll.mockResolvedValue([docenteMock]);

    const result = await docenteRepo.obtenerTodosDocentes();

    expect(Docente.findAll).toHaveBeenCalledWith({
      include: [
        { model: Usuario, as: "usuario", attributes: ["codUsuario", "nombre", "rol"] },
        { model: Materia, as: "materias" },
      ],
    });
    expect(result).toHaveLength(1);
  });

  test("actualizarDocente actualiza un docente existente", async () => {
    Docente.findByPk.mockResolvedValue(docenteMock);
    const dataUpdate = { primerNombre: "Carlos" };

    const result = await docenteRepo.actualizarDocente("D001", dataUpdate);

    expect(Docente.findByPk).toHaveBeenCalledWith("D001");
    expect(docenteMock.save).toHaveBeenCalled();
    expect(result.primerNombre).toBe("Carlos");
  });

  test("actualizarDocente devuelve null si no existe", async () => {
    Docente.findByPk.mockResolvedValue(null);

    const result = await docenteRepo.actualizarDocente("D002", { primerNombre: "Carlos" });

    expect(result).toBeNull();
  });

  test("eliminarDocente elimina un docente existente", async () => {
    Docente.findByPk.mockResolvedValue(docenteMock);

    const result = await docenteRepo.eliminarDocente("D001");

    expect(Docente.findByPk).toHaveBeenCalledWith("D001");
    expect(docenteMock.destroy).toHaveBeenCalled();
    expect(result).toEqual(docenteMock);
  });

  test("eliminarDocente devuelve null si no existe", async () => {
    Docente.findByPk.mockResolvedValue(null);

    const result = await docenteRepo.eliminarDocente("D002");

    expect(result).toBeNull();
  });
});