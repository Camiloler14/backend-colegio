import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Docente = sequelize.define('Docente', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  primerNombre: { type: DataTypes.STRING(100), allowNull: false },
  segundoNombre: { type: DataTypes.STRING(100), allowNull: true },
  primerApellido: { type: DataTypes.STRING(100), allowNull: false },
  segundoApellido: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  telefono: { type: DataTypes.STRING(15), allowNull: true },
  direccion: { type: DataTypes.TEXT, allowNull: true },
  fecha_ingreso: { type: DataTypes.DATE, allowNull: false },
  documento: { type: DataTypes.INTEGER, allowNull: false, unique: true }
}, {
  tableName: 'docentes',
  timestamps: false
});

export default Docente;


