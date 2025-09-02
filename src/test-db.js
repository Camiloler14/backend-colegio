import sequelize from './config/db.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conexión con la base de datos establecida correctamente');
  } catch (error) {
    console.error('🔴 No se pudo conectar a la base de datos:', error);
  }
})();



