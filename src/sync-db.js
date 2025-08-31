import sequelize from './config/db.js';
import Admin from './models/admin.model.js';
import Docente from './models/teacher.model.js';
import Materia from './models/subject.model.js';

// Relaciones
Docente.hasMany(Materia, {
  foreignKey: 'docenteId',
  as: 'materias'
});

Materia.belongsTo(Docente, {
  foreignKey: 'docenteId',
  as: 'docente'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conectado correctamente');

    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente');

    const [creado] = await Admin.findOrCreate({
      where: { usuario: 'admin' },
      defaults: { contraseña: 'admin123' } 
    });

    console.log(creado ? 'Admin creado' : 'Admin ya existía');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
})();
