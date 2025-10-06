import Docente from "../models/docente.model.js";
import Usuario from "../models/usuario.model.js";
import bcrypt from "bcrypt";

export class DocenteRepository {
  async crearDocente(datos) {
    try {
      const contraseñaHash = await bcrypt.hash(datos.contraseña || "12345", 10);

      const nuevoUsuario = await Usuario.create({
        codigo: datos.codigo,
        nombre: `${datos.primerNombre} ${datos.primerApellido}`,
        contraseña: contraseñaHash,
        rol: "docente",
        barrio: datos.barrio,
        ciudad: datos.ciudad,
      });

      const nuevoDocente = await Docente.create({
        ...datos,
        codigo: nuevoUsuario.codigo,
      });

      return { success: true, data: nuevoDocente };
    } catch (error) {
      return {
        success: false,
        message: `Error creando docente: ${error.message}`,
      };
    }
  }

  async obtenerDocentes() {
    try {
      const docentes = await Docente.findAll({
        attributes: [
          "codigo",
          "primerNombre",
          "segundoNombre",
          "primerApellido",
          "segundoApellido",
          "documento",
          "email",
          "telefono",
          "direccion",
          "barrio",
          "ciudad",
          "fechaIngreso",
          "nombreCompleto",
        ],
        order: [["primerApellido", "ASC"]],
      });

      const docentesJson = docentes.map((d) => d.toJSON());

      return { success: true, data: docentesJson };
    } catch (error) {
      return {
        success: false,
        message: `Error obteniendo docentes: ${error.message}`,
      };
    }
  }

  async obtenerDocentePorDocumento(documento) {
    try {
      const docente = await Docente.findOne({
        where: { documento },
        attributes: { exclude: ["id"] },
      });
      return docente
        ? { success: true, data: docente }
        : { success: false, message: "Docente no encontrado" };
    } catch (error) {
      return {
        success: false,
        message: `Error buscando docente: ${error.message}`,
      };
    }
  }

  async actualizarDocente(documento, datos) {
    try {
      const docente = await Docente.findOne({ where: { documento } });
      if (!docente) return { success: false, message: "Docente no encontrado" };

      await docente.update(datos);

      const usuario = await Usuario.findByPk(docente.codigo);
      if (usuario) {
        const updates = {};
        if (datos.primerNombre || datos.primerApellido) {
          updates.nombre = `${datos.primerNombre || docente.primerNombre} ${
            datos.primerApellido || docente.primerApellido
          }`;
        }
        if (datos.contraseña) {
          updates.contraseña = await bcrypt.hash(datos.contraseña, 10);
        }
        if (datos.barrio) updates.barrio = datos.barrio;
        if (datos.ciudad) updates.ciudad = datos.ciudad;

        await usuario.update(updates);
      }

      return { success: true, data: docente };
    } catch (error) {
      return {
        success: false,
        message: `Error actualizando docente: ${error.message}`,
      };
    }
  }

  async eliminarDocente(documento) {
    try {
      const docente = await Docente.findOne({ where: { documento } });
      if (!docente) return { success: false, message: "Docente no encontrado" };

      const usuario = await Usuario.findByPk(docente.codigo);
      if (usuario) await usuario.destroy();

      await docente.destroy();

      return { success: true, message: "Docente eliminado correctamente" };
    } catch (error) {
      return {
        success: false,
        message: `Error eliminando docente: ${error.message}`,
      };
    }
  }
}

export default new DocenteRepository();
