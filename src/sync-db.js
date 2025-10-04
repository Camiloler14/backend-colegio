import sequelize from "./config/db.js";
import Usuario from "./models/usuario.model.js";
import Docente from "./models/docente.model.js";
import Estudiante from "./models/estudiante.model.js";
import Materia from "./models/materia.model.js";
import EstudianteMateria from "./models/estudianteMateria.model.js";
import bcrypt from "bcrypt";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("🟢 Conectado correctamente a la base de datos");

    Usuario.hasOne(Docente, {
      foreignKey: "usuarioCodigo",
      sourceKey: "codigo",
      onDelete: "CASCADE",
    });
    Docente.belongsTo(Usuario, {
      foreignKey: "usuarioCodigo",
      targetKey: "codigo",
    });

    Usuario.hasOne(Estudiante, {
      foreignKey: "usuarioCodigo",
      sourceKey: "codigo",
      onDelete: "CASCADE",
    });
    Estudiante.belongsTo(Usuario, {
      foreignKey: "usuarioCodigo",
      targetKey: "codigo",
    });

    Docente.hasMany(Materia, {
      foreignKey: "codigoDocente",
      sourceKey: "codigo",
      onDelete: "CASCADE",
    });
    Materia.belongsTo(Docente, {
      foreignKey: "codigoDocente",
      targetKey: "codigo",
    });

    Estudiante.belongsToMany(Materia, {
      through: EstudianteMateria,
      foreignKey: "codigoEstudiante",
      otherKey: "codigoMateria",
      as: "materiasInscritas",
    });

    Materia.belongsToMany(Estudiante, {
      through: EstudianteMateria,
      foreignKey: "codigoMateria",
      otherKey: "codigoEstudiante",
      as: "estudiantesInscritos",
    });

    await sequelize.sync({ alter: true });
    console.log(
      "✅ Tablas sincronizadas correctamente"
    );

    const adminPorDefecto = {
      nombre: "Administrador",
      contraseña: await bcrypt.hash("12345", 10),
      rol: "admin",
      codigo: 123456,
    };

    const [_admin, creado] = await Usuario.findOrCreate({
      where: { codigo: adminPorDefecto.codigo },
      defaults: adminPorDefecto,
    });

    console.log(
      creado ? "Admin creado con contraseña hasheada" : "ℹ Admin ya existía"
    );
  } catch (error) {
    console.error("❌ Error al sincronizar:", error);
  } finally {
    await sequelize.close();
  }
})();
