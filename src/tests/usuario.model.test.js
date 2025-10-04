import Usuario from "../models/usuario.model.js";
import bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("Modelo Usuario", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("beforeCreate: debe hashear la contraseña si no está hasheada", async () => {
    bcrypt.hash.mockResolvedValue("hashedPassword");

    const usuario = Usuario.build({
      codigo: 1,
      nombre: "Juan Perez",
      contraseña: "12345",
      rol: "docente",
    });

    await Usuario.runHooks("beforeCreate", usuario);

    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith("12345", 10);
    expect(usuario.contraseña).toBe("hashedPassword");
  });

  test("beforeCreate: no debe hashear si la contraseña ya está hasheada", async () => {
    const usuario = Usuario.build({
      codigo: 2,
      nombre: "Ana Gomez",
      contraseña: "$2b$10$alreadyhashed",
      rol: "estudiante",
    });

    await Usuario.runHooks("beforeCreate", usuario);

    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(usuario.contraseña).toBe("$2b$10$alreadyhashed");
  });

  test("beforeUpdate: debe hashear la contraseña si fue cambiada y no está hasheada", async () => {
    bcrypt.hash.mockResolvedValue("newHashed");

    const usuario = Usuario.build({
      codigo: 3,
      nombre: "Pedro",
      contraseña: "abc123",
      rol: "admin",
    });

    // Simulamos que cambió la contraseña
    usuario.changed = jest.fn().mockReturnValue(true);

    await Usuario.runHooks("beforeUpdate", usuario);

    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(usuario.contraseña).toBe("newHashed");
  });

  test("Enum de rol solo acepta valores válidos", () => {
    const validRoles = ["admin", "estudiante", "docente"];
    validRoles.forEach((rol) => {
      const usuario = Usuario.build({
        codigo: 10,
        nombre: "Test",
        contraseña: "123",
        rol,
      });
      expect(usuario.rol).toBe(rol);
    });
  });
});
