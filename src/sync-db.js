import sequelize from './config/db.js';
import Admin from './models/admin.model.js';
import Estudiante from './models/student.model.js';
import Docente from './models/teacher.model.js';
import Materia from './models/subject.model.js';
import bcrypt from 'bcrypt';

// Definir relaciones
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

    // Sincronizar tablas (incluyendo las relaciones)
    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente');

    const passwordPlain = 'admin123';
    const hashedPassword = await bcrypt.hash(passwordPlain, 10);

    const [admin, created] = await Admin.findOrCreate({
      where: { usuario: 'admin' },
      defaults: { contraseña: hashedPassword }
    });

    if (created) {
      console.log('Admin inicial creado');
    } else {
      console.log('Admin ya existía');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
})();

