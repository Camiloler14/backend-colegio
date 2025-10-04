import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Docente from "./docente.model.js";

const Materia = sequelize.define(
  "Materia",
  {
    codigoMateria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreMateria: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    codigoDocente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Docente, key: "codigo" },
    },
  },
  {
    tableName: "materias",
    timestamps: false,
  }
);

Materia.belongsTo(Docente, {
  foreignKey: "codigoDocente",
  as: "docente",
});

Docente.hasMany(Materia, {
  foreignKey: "codigoDocente",
  as: "materias",
});

export default Materia;
