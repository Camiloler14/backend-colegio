import EstudianteMateria from "../models/estudianteMateria.model.js";
import Estudiante from "../models/estudiante.model.js";
import Materia from "../models/materia.model.js";

describe("Modelo EstudianteMateria", () => {
  test("El modelo debe estar definido", () => {
    expect(EstudianteMateria).toBeDefined();
  });

  test("Se puede acceder a las asociaciones", () => {
    expect(Estudiante.associations.materias).toBeDefined();
    expect(Materia.associations.estudiantes).toBeDefined();
  });
});
