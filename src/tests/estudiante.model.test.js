import sequelize from "../config/db.js";
import Usuario from "../models/usuario.model.js";
import Estudiante from "../models/estudiante.model.js";

describe("Modelo Estudiante", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reinicia las tablas
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("debería crear un estudiante con usuario asociado", async () => {
    const usuario = await Usuario.create({
      codigo: 1001,
      nombre: "Juan Pérez",
      contraseña: "12345",
      rol: "estudiante",
    });

    const estudiante = await Estudiante.create({
      identificacion: 55555,
      primerNombre: "Juan",
      segundoNombre: "Camilo",
      primerApellido: "Pérez",
      segundoApellido: "Gómez",
      edad: 18,
      genero: "Masculino",
      fechaNacimiento: "2007-01-01",
      acudiente1: "Carlos Pérez",
      telefonoAcudiente1: "3111111111",
      direccion: "Calle 1",
      barrio: "Centro",
      ciudad: "Cali",
      fechaMatricula: "2024-01-10",
      fechaIngreso: "2024-01-15",
      grado: 11,
      estado: "Activo",
      observaciones: "Ninguna",
      usuarioCodigo: usuario.codigo,
    });

    expect(estudiante.identificacion).toBe(55555);
    const encontrado = await Estudiante.findOne({
      where: { identificacion: 55555 },
      include: [{ model: Usuario, as: "usuario" }],
    });

    expect(encontrado.usuario.nombre).toBe("Juan Pérez");
  });

  test("no debería permitir duplicar identificaciones", async () => {
    expect.assertions(1);
    try {
      await Estudiante.create({
        identificacion: 55555,
        primerNombre: "Ana",
        primerApellido: "López",
        edad: 19,
        genero: "Femenino",
        fechaNacimiento: "2006-01-01",
        acudiente1: "Pedro López",
        telefonoAcudiente1: "3222222222",
        direccion: "Carrera 2",
        barrio: "San Fernando",
        ciudad: "Cali",
        fechaMatricula: "2024-02-01",
        fechaIngreso: "2024-02-02",
        grado: 10,
        estado: "Activo",
        usuarioCodigo: 1001,
      });
    } catch (error) {
      expect(error.name).toBe("SequelizeUniqueConstraintError");
    }
  });

  test("debería eliminar usuario automáticamente al eliminar estudiante", async () => {
    const usuario = await Usuario.create({
      codigo: 2002,
      nombre: "Carlos Ramírez",
      contraseña: "12345",
      rol: "estudiante",
    });

    const estudiante = await Estudiante.create({
      identificacion: 99999,
      primerNombre: "Carlos",
      primerApellido: "Ramírez",
      edad: 20,
      genero: "Masculino",
      fechaNacimiento: "2005-01-01",
      acudiente1: "Ana Ramírez",
      telefonoAcudiente1: "3000000000",
      direccion: "Calle 9",
      barrio: "Meléndez",
      ciudad: "Cali",
      fechaMatricula: "2024-03-01",
      fechaIngreso: "2024-03-02",
      grado: 11,
      estado: "Activo",
      usuarioCodigo: usuario.codigo,
    });

    await estudiante.destroy();

    const usuarioEliminado = await Usuario.findByPk(usuario.codigo);
    expect(usuarioEliminado).toBeNull();
  });
});
