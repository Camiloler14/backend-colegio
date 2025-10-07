import Estudiante from "../models/estudiante.model.js";

describe("Estudiante Model", () => {
  test("debe existir el modelo Estudiante", () => {
    expect(Estudiante).toBeDefined();
  });

  test("puede crear un objeto Estudiante", () => {
    const estudiante = Estudiante.build({
      codEstudiante: "E001",
      identificacion: 987654321,
      primerNombre: "Ana",
      segundoNombre: "Lucía",
      primerApellido: "Martínez",
      segundoApellido: "Lopez",
      edad: 15,
      genero: "F",
      fechaNacimiento: "2010-05-20",
      acudiente: "Carlos Martínez",
      telefonoAcudiente: "3007654321",
      direccion: "Calle 12 #34-56",
      barrio: "Centro",
      ciudad: "Cali",
      fechaMatricula: "2025-02-01",
      fechaIngreso: "2025-02-01",
      grado: 10,
      estado: "Activo",
      observaciones: "Buen desempeño",
    });

    expect(estudiante.codEstudiante).toBe("E001");
    expect(estudiante.primerNombre).toBe("Ana");
    expect(estudiante.acudiente).toBe("Carlos Martínez");
    expect(estudiante.grado).toBe(10);
  });
});
