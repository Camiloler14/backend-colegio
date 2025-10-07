import "../models/asociaciones.js"; 
import Materia from "../models/materia.model.js";

describe("Modelo Materia", () => {
  test("El modelo debe estar definido", () => {
    expect(Materia).toBeDefined();
  });

  test("Se puede acceder a la asociación con Docente", () => {
    expect(Materia.associations.docente).toBeDefined();
  });
});
