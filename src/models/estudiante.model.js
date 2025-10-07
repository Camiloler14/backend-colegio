import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Estudiante = sequelize.define(
  "Estudiante",
  {
    codEstudiante: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    identificacion: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    primerNombre: { type: DataTypes.STRING, allowNull: false },
    segundoNombre: { type: DataTypes.STRING },
    primerApellido: { type: DataTypes.STRING, allowNull: false },
    segundoApellido: { type: DataTypes.STRING },
    edad: { type: DataTypes.INTEGER, allowNull: false },
    genero: { type: DataTypes.STRING, allowNull: false },
    fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: false },
    acudiente: { type: DataTypes.STRING, allowNull: false },
    telefonoAcudiente: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    barrio: { type: DataTypes.STRING, allowNull: false },
    ciudad: { type: DataTypes.STRING, allowNull: false },
    fechaMatricula: { type: DataTypes.DATEONLY, allowNull: false },
    fechaIngreso: { type: DataTypes.DATEONLY, allowNull: false },
    grado: { type: DataTypes.INTEGER, allowNull: false },
    estado: { type: DataTypes.STRING, allowNull: false },
    observaciones: { type: DataTypes.TEXT },
  },
  {
    tableName: "estudiantes",
    timestamps: false,
  }
);


export default Estudiante;
