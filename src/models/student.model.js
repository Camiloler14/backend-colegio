import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Estudiante = sequelize.define('Estudiante', {
  identificacion: { type: DataTypes.STRING, allowNull: false, unique: true },
  primerNombre: { type: DataTypes.STRING, allowNull: false },
  segundoNombre: { type: DataTypes.STRING, allowNull: true },
  primerApellido: { type: DataTypes.STRING, allowNull: false },
  segundoApellido: { type: DataTypes.STRING, allowNull: true },
  edad: { type: DataTypes.INTEGER, allowNull: false },
  genero: { type: DataTypes.STRING, allowNull: false },
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
  antiguedad: { type: DataTypes.INTEGER, allowNull: false },
  grado: { type: DataTypes.STRING, allowNull: false },
  estado: { type: DataTypes.STRING, allowNull: false },
  observaciones: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'estudiantes',
  timestamps: false,
});

export default Estudiante;
