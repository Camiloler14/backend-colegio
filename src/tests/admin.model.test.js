import sequelize from '../config/db.js';
import Admin from '../models/admin.model.js';
import bcrypt from 'bcrypt';

describe('Tests para el modelo Admin', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // Limpia tabla admins para test limpio
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Debería crear un admin con contraseña hasheada', async () => {
    const adminData = {
      usuario: 'admin1',
      contraseña: 'password123',
    };

    const admin = await Admin.create(adminData);

    expect(admin.usuario).toBe(adminData.usuario);
    expect(admin.contraseña).not.toBe(adminData.contraseña);

    const isHashed = admin.contraseña.startsWith('$2b$');
    expect(isHashed).toBe(true);

    // Verificar que el hash corresponde a la contraseña original
    const validPassword = await bcrypt.compare(adminData.contraseña, admin.contraseña);
    expect(validPassword).toBe(true);
  });

  test('No debería permitir crear dos admins con el mismo usuario', async () => {
    const adminData = {
      usuario: 'adminUnico',
      contraseña: 'pass1234',
    };

    await Admin.create(adminData);

    // Intentamos crear otro admin con mismo usuario, debería fallar
    await expect(Admin.create(adminData)).rejects.toThrow();
  });

  test('Debería hashear la contraseña si se actualiza', async () => {
    const admin = await Admin.create({
      usuario: 'adminUpdate',
      contraseña: 'oldPassword',
    });

    const oldHash = admin.contraseña;

    // Actualizamos la contraseña sin hashear
    admin.contraseña = 'newPassword';
    await admin.save();

    expect(admin.contraseña).not.toBe('newPassword');
    expect(admin.contraseña).not.toBe(oldHash);
    expect(admin.contraseña.startsWith('$2b$')).toBe(true);

    const validPassword = await bcrypt.compare('newPassword', admin.contraseña);
    expect(validPassword).toBe(true);
  });
});
