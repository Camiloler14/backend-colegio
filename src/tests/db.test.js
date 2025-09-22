import { testConnection } from '../config/db.js';
import sequelize from '../config/db.js';

describe('Test de conexión a la base de datos', () => {
  test('Debería conectarse sin errores', async () => {
    await expect(testConnection()).resolves.not.toThrow();
  });

  afterAll(async () => {
    await sequelize.close();
  });
});

