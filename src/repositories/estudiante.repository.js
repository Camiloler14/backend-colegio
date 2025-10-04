import Estudiante from "../models/estudiante.model.js";
import Usuario from "../models/usuario.model.js";

const EstudianteRepository = {
  // Crear estudiante asociado a un usuario ya existente
  crear: async (data) => {
    try {
      const usuario = await Usuario.findByPk(data.usuarioCodigo);
      if (!usuario) {
        return {
          success: false,
          message: `No existe un usuario con código ${data.usuarioCodigo}`,
        };
      }

      const estudiante = await Estudiante.create({
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
        grado: data.grado,
        estado: data.estado,
        observaciones: data.observaciones || null,
        usuarioCodigo: data.usuarioCodigo,
      });

      return { success: true, data: estudiante };
    } catch (error) {
      return {
        success: false,
        message: `Error creando estudiante: ${error.message}`,
      };
    }
  },

  actualizarPorIdentificacion: async (identificacion, data) => {
    try {
      const estudiante = await Estudiante.findOne({
        where: { identificacion },
      });
      if (!estudiante)
        return { success: false, message: "Estudiante no encontrado" };

      await estudiante.update(data);

      if (data.primerNombre || data.primerApellido) {
        const usuario = await Usuario.findByPk(estudiante.usuarioCodigo);
        if (usuario) {
          const nuevoNombre = `${
            data.primerNombre || estudiante.primerNombre
          } ${data.primerApellido || estudiante.primerApellido}`;
          await usuario.update({ nombre: nuevoNombre });
        }
      }

      return { success: true, data: estudiante };
    } catch (error) {
      return {
        success: false,
        message: `Error actualizando estudiante: ${error.message}`,
      };
    }
  },

  eliminarPorIdentificacion: async (identificacion) => {
    try {
      const estudiante = await Estudiante.findOne({
        where: { identificacion },
      });
      if (!estudiante)
        return { success: false, message: "Estudiante no encontrado" };

      await estudiante.destroy();

      return { success: true, message: "Estudiante eliminado correctamente" };
    } catch (error) {
      return {
        success: false,
        message: `Error eliminando estudiante: ${error.message}`,
      };
    }
  },

  obtenerTodos: async () => {
    try {
      const estudiantes = await Estudiante.findAll({
        include: [{ model: Usuario, as: "usuario" }],
      });
      return { success: true, data: estudiantes };
    } catch (error) {
      return {
        success: false,
        message: `Error obteniendo estudiantes: ${error.message}`,
      };
    }
  },

  obtenerPorIdentificacion: async (identificacion) => {
    try {
      const estudiante = await Estudiante.findOne({
        where: { identificacion },
        include: [{ model: Usuario, as: "usuario" }],
      });
      if (!estudiante)
        return { success: false, message: "Estudiante no encontrado" };
      return { success: true, data: estudiante };
    } catch (error) {
      return {
        success: false,
        message: `Error obteniendo estudiante: ${error.message}`,
      };
    }
  },
};

export default EstudianteRepository;
