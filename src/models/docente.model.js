import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Usuario from "./usuario.model.js";
import Materia from "./materia.model.js";

const Docente = sequelize.define(
  "Docente",
  {
    codDocente: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    documento: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    primerNombre: { type: DataTypes.STRING(100), allowNull: false },
    segundoNombre: { type: DataTypes.STRING(100) },
    primerApellido: { type: DataTypes.STRING(100), allowNull: false },
    segundoApellido: { type: DataTypes.STRING(100) },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    telefono: { type: DataTypes.STRING(15), allowNull: false },
    direccion: { type: DataTypes.TEXT, allowNull: false },
    barrio: { type: DataTypes.STRING(100), allowNull: false },
    ciudad: { type: DataTypes.STRING(100), allowNull: false },
    fechaIngreso: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "docentes",
    timestamps: false,
  }
);

export default Docente;
