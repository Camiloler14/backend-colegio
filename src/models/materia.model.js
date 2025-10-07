import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Materia = sequelize.define(
  "Materia",
  {
    codigoMateria: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    nombreMateria: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    codDocente: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "docentes",
        key: "codDocente",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    tableName: "materias",
    timestamps: false,
  }
);

export default Materia;
