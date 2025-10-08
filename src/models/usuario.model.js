import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/db.js";

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
    password: { type: DataTypes.STRING, allowNull: false },
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
        if (usuario.password && !usuario.password.startsWith("$2b$")) {
          usuario.password = await bcrypt.hash(usuario.password, 10);
        }
      },
      beforeUpdate: async (usuario) => {
        if (
          usuario.changed("password") &&
          !usuario.password.startsWith("$2b$")
        ) {
          usuario.password = await bcrypt.hash(usuario.password, 10);
        }
      },
    },
  }
);

export default Usuario;
