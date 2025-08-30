import sequelize from '../config/db.js';

describe('Test conexión a la base de datos', () => {
  test('Debería conectarse sin errores', async () => {
    await expect(sequelize.authenticate()).resolves.not.toThrow();
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
