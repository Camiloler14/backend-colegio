import Usuario from "./usuario.model.js";
import Estudiante from "./estudiante.model.js";
import Docente from "./docente.model.js";
import Materia from "./materia.model.js";

// Asociación Usuario ↔ Estudiante
Usuario.hasOne(Estudiante, {
  foreignKey: "codEstudiante",
  sourceKey: "codUsuario",
  as: "estudiante",
});

Estudiante.belongsTo(Usuario, {
  foreignKey: "codEstudiante",
  targetKey: "codUsuario",
  as: "usuario",
});

// Asociación Usuario ↔ Docente
Usuario.hasOne(Docente, {
  foreignKey: "codDocente",
  sourceKey: "codUsuario",
  as: "docente",
});

Docente.belongsTo(Usuario, {
  foreignKey: "codDocente",
  targetKey: "codUsuario",
  as: "usuario",
});

// Asociación Docente ↔ Materia
Docente.hasMany(Materia, {
  foreignKey: "codDocente",
  sourceKey: "codDocente",
  as: "materias",
});

Materia.belongsTo(Docente, {
  foreignKey: "codDocente",
  targetKey: "codDocente",
  as: "docente",
});

export { Usuario, Estudiante, Docente, Materia };
