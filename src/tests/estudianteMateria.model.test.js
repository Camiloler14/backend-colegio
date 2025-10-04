import EstudianteMateria from "../models/estudianteMateria.model.js";
import Estudiante from "../models/estudiante.model.js";
import Materia from "../models/materia.model.js";

describe("Modelo EstudianteMateria", () => {
  test("debe tener los campos correctos", () => {
    const attributes = EstudianteMateria.getAttributes();

    expect(attributes).toHaveProperty("id");
    expect(attributes).toHaveProperty("codigoEstudiante");
    expect(attributes).toHaveProperty("codigoMateria");
    expect(attributes).toHaveProperty("notaPeriodo1");
    expect(attributes).toHaveProperty("notaPeriodo2");
    expect(attributes).toHaveProperty("notaPeriodo3");
    expect(attributes).toHaveProperty("notaPeriodo4");
    expect(attributes).toHaveProperty("promedio");
  });

  test("debe estar asociado con Estudiante y Materia mediante belongsToMany", () => {
    const estudianteAssociations = Estudiante.associations;
    const materiaAssociations = Materia.associations;

    expect(estudianteAssociations).toHaveProperty("materias");
    expect(estudianteAssociations.materias.through.model.name).toBe(
      "EstudianteMateria"
    );

    expect(materiaAssociations).toHaveProperty("estudiantes");
    expect(materiaAssociations.estudiantes.through.model.name).toBe(
      "EstudianteMateria"
    );
  });
});
