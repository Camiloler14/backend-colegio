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

    const validPassword = await bcrypt.compare(adminData.contraseña, admin.contraseña);
    expect(validPassword).toBe(true);
  });

  test('No debería hashear si la contraseña ya está hasheada al crear', async () => {
    const hashed = await bcrypt.hash('password123', 10);
    const admin = await Admin.create({ usuario: 'admin2', contraseña: hashed });

    expect(admin.contraseña).toBe(hashed);
  });

  test('No debería permitir crear dos admins con el mismo usuario', async () => {
    const adminData = {
      usuario: 'adminUnico',
      contraseña: 'pass1234',
    };

    await Admin.create(adminData);

    await expect(Admin.create(adminData)).rejects.toThrow();
  });

  test('Debería hashear la contraseña si se actualiza y no está hasheada', async () => {
    const admin = await Admin.create({
      usuario: 'adminUpdate',
      contraseña: 'oldPassword',
    });

    const oldHash = admin.contraseña;

    admin.contraseña = 'newPassword';
    await admin.save();

    expect(admin.contraseña).not.toBe('newPassword');
    expect(admin.contraseña).not.toBe(oldHash);
    expect(admin.contraseña.startsWith('$2b$')).toBe(true);

    const validPassword = await bcrypt.compare('newPassword', admin.contraseña);
    expect(validPassword).toBe(true);
  });

  test('No debería hashear si la contraseña ya está hasheada al actualizar', async () => {
    const hashed = await bcrypt.hash('password456', 10);
    const admin = await Admin.create({ usuario: 'admin3', contraseña: hashed });

    admin.contraseña = hashed;  // Asignamos la misma contraseña hasheada
    await admin.save();

    expect(admin.contraseña).toBe(hashed);
  });

  test('No debería hashear si la contraseña no cambió al actualizar', async () => {
    const admin = await Admin.create({
      usuario: 'adminNoChange',
      contraseña: 'passwordNoChange',
    });

    const oldPassword = admin.contraseña;
    await admin.save();  // Guardamos sin cambiar la contraseña

    expect(admin.contraseña).toBe(oldPassword);
  });
});
