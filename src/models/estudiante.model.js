import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Usuario from "./usuario.model.js";

const Estudiante = sequelize.define(
  "Estudiante",
  {
    identificacion: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    primerNombre: { type: DataTypes.STRING, allowNull: false },
    segundoNombre: { type: DataTypes.STRING, allowNull: true },
    primerApellido: { type: DataTypes.STRING, allowNull: false },
    segundoApellido: { type: DataTypes.STRING, allowNull: true },
    edad: { type: DataTypes.INTEGER, allowNull: false },
    genero: { type: DataTypes.STRING, allowNull: false }, // obligatorio
    fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: false },
    acudiente1: { type: DataTypes.STRING, allowNull: false },
    telefonoAcudiente1: { type: DataTypes.STRING, allowNull: false },
    acudiente2: { type: DataTypes.STRING, allowNull: true },
    telefonoAcudiente2: { type: DataTypes.STRING, allowNull: true },
    direccion: { type: DataTypes.STRING, allowNull: false },
    barrio: { type: DataTypes.STRING, allowNull: false },
    ciudad: { type: DataTypes.STRING, allowNull: false },
    fechaMatricula: { type: DataTypes.DATEONLY, allowNull: false },
    fechaIngreso: { type: DataTypes.DATEONLY, allowNull: false },
    grado: { type: DataTypes.INTEGER, allowNull: false },
    estado: { type: DataTypes.STRING, allowNull: false },
    observaciones: { type: DataTypes.TEXT, allowNull: true },
    usuarioCodigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Usuario, key: "codigo" },
      unique: true,
    },
  },
  {
    tableName: "estudiantes",
    timestamps: false,
  }
);

Estudiante.belongsTo(Usuario, {
  foreignKey: "usuarioCodigo",
  targetKey: "codigo",
  onDelete: "CASCADE",
  as: "usuario",
});

Usuario.hasOne(Estudiante, {
  foreignKey: "usuarioCodigo",
  sourceKey: "codigo",
  as: "estudiante",
});

Estudiante.afterDestroy(async (estudiante, options) => {
  try {
    await Usuario.destroy({ where: { codigo: estudiante.usuarioCodigo } });
    console.log(
      `Usuario con código ${estudiante.usuarioCodigo} eliminado automáticamente al borrar Estudiante`
    );
  } catch (error) {
    console.error("Error al eliminar usuario automáticamente:", error);
  }
});

export default Estudiante;
