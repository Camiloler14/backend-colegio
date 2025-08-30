import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/db.js';

const Admin = sequelize.define('Admin', {
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'admins',
  timestamps: false,
  hooks: {
    beforeCreate: async (admin) => {
      // Cifrar la contraseña antes de almacenarla en la base de datos
      if (admin.contraseña) {
        admin.contraseña = await bcrypt.hash(admin.contraseña, 10);
      }
    },
    beforeUpdate: async (admin) => {
      // Cifrar la contraseña si se actualiza
      if (admin.contraseña) {
        admin.contraseña = await bcrypt.hash(admin.contraseña, 10);
      }
    }
  }
});

export default Admin;

