import Usuario from "../models/usuario.model.js";
import sequelize from "../config/db.js";
import bcrypt from "bcrypt";

describe("Modelo Usuario", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await Usuario.destroy({ where: {} });
  });

  test("Se puede crear un usuario con hash de contraseña", async () => {
    const data = {
      codUsuario: "U001",
      nombre: "Camilo",
      password: "123456",
      rol: "estudiante",
    };

    const usuario = await Usuario.create(data);

    
    expect(usuario.codUsuario).toBe(data.codUsuario);
    expect(usuario.nombre).toBe(data.nombre);
    expect(usuario.rol).toBe(data.rol);

  
    expect(usuario.password).not.toBe(data.password);
    const match = await bcrypt.compare(data.password, usuario.password);
    expect(match).toBe(true);
  });

  test("No re-hashea una contraseña ya hasheada", async () => {
    const hashed = await bcrypt.hash("123456", 10);

    const data = {
      codUsuario: "U002",
      nombre: "Juan",
      password: hashed,
      rol: "docente",
    };

    const usuario = await Usuario.create(data);

    expect(usuario.password).toBe(hashed); 
  });

  test("Se puede actualizar la contraseña y se vuelve a hashear", async () => {
    const data = {
      codUsuario: "U003",
      nombre: "Laura",
      password: "pass123",
      rol: "admin",
    };

    const usuario = await Usuario.create(data);

    usuario.password = "nuevaPass";
    await usuario.save();

    expect(usuario.password).not.toBe("nuevaPass");
    const match = await bcrypt.compare("nuevaPass", usuario.password);
    expect(match).toBe(true);
  });

  test("Debe fallar si no se proporciona rol, nombre o contraseña", async () => {
    await expect(
      Usuario.create({ codUsuario: "U004" })
    ).rejects.toThrow();
  });
});
