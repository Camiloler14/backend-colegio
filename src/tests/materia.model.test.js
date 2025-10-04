import Materia from "../models/materia.model.js";
import Docente from "../models/docente.model.js";

describe("Modelo Materia", () => {
  test("debe tener los campos correctos", () => {
    const attributes = Materia.getAttributes();

    expect(attributes).toHaveProperty("codigoMateria");
    expect(attributes).toHaveProperty("nombreMateria");
    expect(attributes).toHaveProperty("codigoDocente");
  });

  test("debe estar asociada con Docente", () => {
    const materiaAssociations = Materia.associations;
    const docenteAssociations = Docente.associations;

    // Materia -> Docente
    expect(materiaAssociations).toHaveProperty("docente");
    expect(materiaAssociations.docente.target.name).toBe("Docente");

    // Docente -> Materia
    expect(docenteAssociations).toHaveProperty("materias");
    expect(docenteAssociations.materias.target.name).toBe("Materia");
  });
});
