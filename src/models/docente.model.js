import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Usuario from "./usuario.model.js";
import bcrypt from "bcrypt";

const Docente = sequelize.define(
  "Docente",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    primerNombre: { type: DataTypes.STRING(100), allowNull: false },
    segundoNombre: { type: DataTypes.STRING(100), allowNull: true },
    primerApellido: { type: DataTypes.STRING(100), allowNull: false },
    segundoApellido: { type: DataTypes.STRING(100), allowNull: true },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    telefono: { type: DataTypes.STRING(15), allowNull: false },
    direccion: { type: DataTypes.TEXT, allowNull: false },
    barrio: { type: DataTypes.STRING(100), allowNull: false },
    ciudad: { type: DataTypes.STRING(100), allowNull: false },
    fechaIngreso: { type: DataTypes.DATE, allowNull: false },
    documento: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    nombreCompleto: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.primerNombre ?? ""} ${this.segundoNombre ?? ""} ${
          this.primerApellido ?? ""
        } ${this.segundoApellido ?? ""}`.trim();
      },
    },
  },
  {
    tableName: "docentes",
    timestamps: false,
  }
);

Usuario.hasOne(Docente, {
  foreignKey: "codigo",
  sourceKey: "codigo",
  onDelete: "CASCADE",
});

Docente.belongsTo(Usuario, {
  foreignKey: "codigo",
  targetKey: "codigo",
  onDelete: "CASCADE",
});

Docente.beforeCreate(async (docente) => {
  try {
    const contraseñaEncriptada = await bcrypt.hash("docente123", 10);

    const usuarioExistente = await Usuario.findOne({
      where: { codigo: docente.codigo },
    });

    if (!usuarioExistente) {
      await Usuario.create({
        codigo: docente.codigo,
        nombre: `${docente.primerNombre ?? ""} ${docente.segundoNombre ?? ""} ${
          docente.primerApellido ?? ""
        } ${docente.segundoApellido ?? ""}`.trim(),
        rol: "docente",
        contraseña: contraseñaEncriptada,
      });

      console.log(
        `Usuario creado automáticamente para el docente ${docente.primerNombre} ${docente.primerApellido}`
      );
    }
  } catch (error) {
    console.error("Error al crear usuario automáticamente:", error);
  }
});

Docente.afterDestroy(async (docente) => {
  try {
    await Usuario.destroy({ where: { codigo: docente.codigo } });
    console.log(
      `Usuario con código ${docente.codigo} eliminado al borrar Docente`
    );
  } catch (error) {
    console.error("Error al eliminar usuario automáticamente:", error);
  }
});

export default Docente;
