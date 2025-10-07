import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/db.js";
import Estudiante from "./estudiante.model.js";
import Docente from "./docente.model.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    codUsuario: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    contraseña: { type: DataTypes.STRING, allowNull: false },
    rol: {
      type: DataTypes.ENUM("admin", "estudiante", "docente"),
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.contraseña && !usuario.contraseña.startsWith("$2b$")) {
          usuario.contraseña = await bcrypt.hash(usuario.contraseña, 10);
        }
      },
      beforeUpdate: async (usuario) => {
        if (
          usuario.changed("contraseña") &&
          !usuario.contraseña.startsWith("$2b$")
        ) {
          usuario.contraseña = await bcrypt.hash(usuario.contraseña, 10);
        }
      },
    },
  }
);

export default Usuario;
