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
      // Solo hashear si la contraseña no está ya hasheada
      if (admin.contraseña && !admin.contraseña.startsWith('$2b$')) {
        admin.contraseña = await bcrypt.hash(admin.contraseña, 10);
      }
    },
    beforeUpdate: async (admin) => {
      // Solo hashear si la contraseña cambió y no está hasheada
      if (admin.changed('contraseña') && !admin.contraseña.startsWith('$2b$')) {
        admin.contraseña = await bcrypt.hash(admin.contraseña, 10);
      }
    }
  }
});

export default Admin;
