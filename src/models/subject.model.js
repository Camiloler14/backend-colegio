import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Materia = sequelize.define('Materia', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  intensidad_horaria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  docenteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'docentes',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
}, {
  tableName: 'materias',
  timestamps: false,
});

export default Materia;

