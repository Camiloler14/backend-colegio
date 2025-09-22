import db from '../config/db.js';

describe('Carga de configuración de la base de datos', () => {
  test('Debería importar la instancia de sequelize correctamente', () => {
    expect(db).toBeDefined();
    expect(typeof db.authenticate).toBe('function');
  });
});
