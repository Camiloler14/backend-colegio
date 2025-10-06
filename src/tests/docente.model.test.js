import sequelize from "../config/db.js";
import Usuario from "../models/usuario.model.js";
import Docente from "../models/docente.model.js";
import bcrypt from "bcrypt";

describe("Pruebas del modelo Docente", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("Debe crear automáticamente un usuario al crear un docente (hook beforeCreate)", async () => {
    const docente = await Docente.create({
      codigo: 1010,
      primerNombre: "Juan",
      segundoNombre: "Camilo",
      primerApellido: "Lerma",
      segundoApellido: "Balanta",
      email: "docente@test.com",
      telefono: "3216549870",
      direccion: "Calle 10 #20-30",
      barrio: "La Flora",
      ciudad: "Cali",
      fechaIngreso: new Date(),
      documento: 999999,
    });

    const usuario = await Usuario.findOne({
      where: { codigo: docente.codigo },
    });

    expect(usuario).not.toBeNull();
    expect(usuario.nombre).toContain("Juan");
    expect(await bcrypt.compare("docente123", usuario.contraseña)).toBe(true);
  });

  test("Debe generar correctamente el nombreCompleto (campo virtual)", async () => {
    const docente = await Docente.findOne({ where: { codigo: 1010 } });
    expect(docente.nombreCompleto).toBe("Juan Camilo Lerma Balanta");
  });

  test("Debe eliminar el usuario asociado al eliminar un docente (hook afterDestroy)", async () => {
    const docente = await Docente.findOne({ where: { codigo: 1010 } });
    await docente.destroy();

    const usuarioEliminado = await Usuario.findOne({
      where: { codigo: docente.codigo },
    });

    expect(usuarioEliminado).toBeNull();
  });
});
