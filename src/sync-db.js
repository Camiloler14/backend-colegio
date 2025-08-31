import sequelize from './config/db.js';
import Admin from './models/admin.model.js';
import Docente from './models/teacher.model.js';
import Materia from './models/subject.model.js';
// eslint-disable-next-line no-unused-vars
import Estudiante from './models/student.model.js';

// ✅ Relaciones: Materia <-> Docente por "documento" y no por "id"
Docente.hasMany(Materia, {
  foreignKey: 'docenteDocumento',     // Campo en la tabla Materia
  sourceKey: 'documento',             // Campo en la tabla Docente
  as: 'materias'
});

Materia.belongsTo(Docente, {
  foreignKey: 'docenteDocumento',     // Campo en la tabla Materia
  targetKey: 'documento',             // Campo en la tabla Docente
  as: 'docente'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conectado correctamente');

    await sequelize.sync({ alter: true }); 
    console.log('Tablas sincronizadas correctamente');

    const [, creado] = await Admin.findOrCreate({
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
