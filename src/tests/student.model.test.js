import sequelize from '../config/db.js';
import Estudiante from '../models/student.model.js'; 

describe('Modelo Estudiante', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // para que sincronice y limpie tablas
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('debería crear un estudiante válido', async () => {
    const estudianteData = {
      identificacion: '12345678',
      primerNombre: 'Ana',
      primerApellido: 'Gomez',
      edad: 15,
      genero: 'F',
      fechaNacimiento: '2010-01-01',
      acudiente1: 'Pedro Gomez',
      telefonoAcudiente1: '1234567890',
      direccion: 'Calle Falsa 123',
      barrio: 'Centro',
      ciudad: 'Ciudad',
      fechaMatricula: '2025-01-10',
      fechaIngreso: '2025-01-10',
      antiguedad: 0,
      grado: '10',
      estado: 'Activo',
    };

    try {
      const estudiante = await Estudiante.create(estudianteData);
      expect(estudiante.identificacion).toBe(estudianteData.identificacion);
      expect(estudiante.primerNombre).toBe(estudianteData.primerNombre);
      expect(estudiante.edad).toBe(estudianteData.edad);
      expect(estudiante.estado).toBe('Activo');
    } catch (error) {
      console.error('Error creando estudiante:', error);
      throw error;
    }
  });

  test('debería fallar si faltan campos obligatorios', async () => {
    const estudianteInvalido = {
      // Falta identificacion y primerNombre, que son obligatorios
      primerApellido: 'Pérez',
      edad: 15,
      genero: 'M',
      fechaNacimiento: '2010-01-01',
      acudiente1: 'Ana Pérez',
      telefonoAcudiente1: '123456789',
      direccion: 'Calle 123',
      barrio: 'Centro',
      ciudad: 'CiudadX',
      fechaMatricula: '2023-03-01',
      fechaIngreso: '2023-03-02',
      antiguedad: 1,
      grado: '9',
      estado: 'Activo',
    };

    await expect(Estudiante.create(estudianteInvalido)).rejects.toThrow();
  });
});
