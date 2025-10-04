import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Estudiante from "./estudiante.model.js";
import Materia from "./materia.model.js";

const EstudianteMateria = sequelize.define(
  "EstudianteMateria",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    codigoEstudiante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Estudiante, key: "identificacion" },
    },
    codigoMateria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Materia, key: "codigoMateria" },
    },
    notaPeriodo1: { type: DataTypes.FLOAT, allowNull: true },
    notaPeriodo2: { type: DataTypes.FLOAT, allowNull: true },
    notaPeriodo3: { type: DataTypes.FLOAT, allowNull: true },
    notaPeriodo4: { type: DataTypes.FLOAT, allowNull: true },
    promedio: { type: DataTypes.FLOAT, allowNull: true },
  },
  {
    tableName: "estudiante_materias",
    timestamps: false,
  }
);

Estudiante.belongsToMany(Materia, {
  through: EstudianteMateria,
  foreignKey: "codigoEstudiante",
  otherKey: "codigoMateria",
  as: "materias",
});

Materia.belongsToMany(Estudiante, {
  through: EstudianteMateria,
  foreignKey: "codigoMateria",
  otherKey: "codigoEstudiante",
  as: "estudiantes",
});

export default EstudianteMateria;
