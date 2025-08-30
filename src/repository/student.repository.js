import Estudiante from '../models/student.model.js';

const EstudianteRepository = {
  crear: async (data) => {
    return await Estudiante.create({
      identificacion: data.identificacion,
      primerNombre: data.primerNombre,
      segundoNombre: data.segundoNombre || null,
      primerApellido: data.primerApellido,
      segundoApellido: data.segundoApellido || null,
      edad: data.edad,
      genero: data.genero,
      fechaNacimiento: data.fechaNacimiento,
      acudiente1: data.acudiente1,
      telefonoAcudiente1: data.telefonoAcudiente1,
      acudiente2: data.acudiente2 || null,
      telefonoAcudiente2: data.telefonoAcudiente2 || null,
      direccion: data.direccion,
      barrio: data.barrio,
      ciudad: data.ciudad,
      fechaMatricula: data.fechaMatricula,
      fechaIngreso: data.fechaIngreso,
      antiguedad: data.antiguedad,
      grado: data.grado,
      estado: data.estado,
      observaciones: data.observaciones || null,
    });
  },

  actualizar: async (id, data) => {
    const estudiante = await Estudiante.findByPk(id);
    if (!estudiante) return null;
    return await estudiante.update(data);
  },

  eliminar: async (id) => {
    const estudiante = await Estudiante.findByPk(id);
    if (!estudiante) return false;
    await estudiante.destroy();
    return true;
  },

  obtenerTodos: async () => {
    return await Estudiante.findAll();
  },

  obtenerPorId: async (id) => {
    return await Estudiante.findByPk(id);
  },
};

export default EstudianteRepository;
