import { Usuario, Estudiante, Docente, Materia } from "../models/asociaciones.js";

describe("Asociaciones de modelos", () => {
  test("Los modelos deben estar definidos", () => {
    expect(Usuario).toBeDefined();
    expect(Estudiante).toBeDefined();
    expect(Docente).toBeDefined();
    expect(Materia).toBeDefined();
  });

  test("Se puede acceder a las asociaciones", () => {
    expect(Usuario.associations.estudiante).toBeDefined();
    expect(Usuario.associations.docente).toBeDefined();
    expect(Docente.associations.materias).toBeDefined();
    expect(Estudiante.associations.usuario).toBeDefined();
    expect(Docente.associations.usuario).toBeDefined();
    expect(Materia.associations.docente).toBeDefined();
  });
});
