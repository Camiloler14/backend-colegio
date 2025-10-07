import Docente from "../models/docente.model.js";

describe("Docente Model", () => {
  test("debe existir el modelo Docente", () => {
    expect(Docente).toBeDefined();
  });

  test("puede crear un objeto Docente", () => {
    const docente = Docente.build({
      codDocente: "D001",
      documento: 12345678,
      primerNombre: "Juan",
      segundoNombre: "Carlos",
      primerApellido: "Pérez",
      segundoApellido: "Gómez",
      email: "juan@example.com",
      telefono: "3001234567",
      direccion: "Calle Falsa 123",
      barrio: "Centro",
      ciudad: "Cali",
      fechaIngreso: new Date("2025-01-01"),
    });

    expect(docente.codDocente).toBe("D001");
    expect(docente.primerNombre).toBe("Juan");
    expect(docente.segundoApellido).toBe("Gómez");
  });

});
