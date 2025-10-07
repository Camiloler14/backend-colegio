// src/tests/materia.repository.test.js
import MateriaRepository from "../repositories/materia.repository.js";
import Materia from "../models/materia.model.js";
import Docente from "../models/docente.model.js";

jest.mock("../models/materia.model.js");
jest.mock("../models/docente.model.js");

describe("MateriaRepository", () => {
  const materiaMock = {
    codigoMateria: "MAT101",
    nombreMateria: "Matemáticas",
    codDocente: "DOC1",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("crearMateria crea un nuevo registro", async () => {
    Materia.create.mockResolvedValue(materiaMock);

    const result = await MateriaRepository.crearMateria(materiaMock);

    expect(Materia.create).toHaveBeenCalledWith(materiaMock);
    expect(result).toEqual(materiaMock);
  });

  test("obtenerMaterias retorna todas las materias con docente", async () => {
    Materia.findAll.mockResolvedValue([materiaMock]);

    const result = await MateriaRepository.obtenerMaterias();

    expect(Materia.findAll).toHaveBeenCalledWith({
      include: [
        {
          model: Docente,
          as: "docente",
          attributes: ["codDocente", "primerNombre", "primerApellido"],
        },
      ],
    });
    expect(result).toEqual([materiaMock]);
  });

  test("obtenerMateriaPorCodigo retorna la materia específica con docente", async () => {
    Materia.findByPk.mockResolvedValue(materiaMock);

    const result = await MateriaRepository.obtenerMateriaPorCodigo("MAT101");

    expect(Materia.findByPk).toHaveBeenCalledWith("MAT101", {
      include: [
        {
          model: Docente,
          as: "docente",
          attributes: ["codDocente", "primerNombre", "primerApellido"],
        },
      ],
    });
    expect(result).toEqual(materiaMock);
  });

  test("actualizarMateria actualiza la materia", async () => {
    Materia.update.mockResolvedValue([1]);

    const result = await MateriaRepository.actualizarMateria("MAT101", { nombreMateria: "Física" });

    expect(Materia.update).toHaveBeenCalledWith({ nombreMateria: "Física" }, { where: { codigoMateria: "MAT101" } });
    expect(result).toEqual([1]);
  });

  test("eliminarMateria elimina la materia", async () => {
    Materia.destroy.mockResolvedValue(1);

    const result = await MateriaRepository.eliminarMateria("MAT101");

    expect(Materia.destroy).toHaveBeenCalledWith({ where: { codigoMateria: "MAT101" } });
    expect(result).toEqual(1);
  });
});