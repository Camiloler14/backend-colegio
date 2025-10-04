import {
  crearDocenteServicio,
  obtenerDocentesServicio,
  obtenerDocentePorDocumentoServicio,
  actualizarDocenteServicio,
  eliminarDocenteServicio,
} from "../services/docente.service.js";

export async function crearDocente(req, res) {
  // eslint-disable-next-line no-unused-vars
  const {
  codigo,
  primerNombre,
  segundoNombre: _segundoNombre,
  primerApellido,
  segundoApellido: _segundoApellido,
  email,
  telefono,
  direccion,
  barrio,
  ciudad,
  fechaIngreso,
  documento,
} = req.body;

  if (
    !codigo ||
    !primerNombre ||
    !primerApellido ||
    !email ||
    !telefono ||
    !direccion ||
    !barrio ||
    !ciudad ||
    !fechaIngreso ||
    !documento
  ) {
    return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
  }

  try {
    const result = await crearDocenteServicio(req.body);
    if (!result.success) {
      return res.status(400).json({ mensaje: result.message });
    }
    return res.status(201).json(result.data);
  } catch (error) {
    console.error("Error al crear docente:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

export async function obtenerDocentes(req, res) {
  try {
    const result = await obtenerDocentesServicio();
    if (!result.success) {
      return res.status(400).json({ mensaje: result.message });
    }

    const docentesConNombre = result.data.map((doc) => {
      const nombres = [doc.primerNombre, doc.segundoNombre]
        .filter(Boolean)
        .join(" ");
      const apellidos = [doc.primerApellido, doc.segundoApellido]
        .filter(Boolean)
        .join(" ");
      return {
        ...doc,
        nombreCompleto: `${nombres} ${apellidos}`.trim(),
      };
    });

    return res.json(docentesConNombre);
  } catch (error) {
    console.error("Error al obtener docentes:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

export async function obtenerDocente(req, res) {
  try {
    const result = await obtenerDocentePorDocumentoServicio(
      req.params.documento
    );
    if (!result.success) {
      return res.status(404).json({ mensaje: result.message });
    }

    const docente = result.data;
    const docenteConNombre = {
      ...docente.dataValues,
      nombreCompleto: `${docente.primerNombre} ${docente.segundoNombre ?? ""} ${
        docente.primerApellido
      } ${docente.segundoApellido ?? ""}`.trim(),
    };

    return res.json(docenteConNombre);
  } catch (error) {
    console.error("Error al obtener docente:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

export async function actualizarDocente(req, res) {
  try {
    const result = await actualizarDocenteServicio(
      req.params.documento,
      req.body
    );
    if (!result.success) {
      return res.status(404).json({ mensaje: result.message });
    }
    return res.json(result.data);
  } catch (error) {
    console.error("Error al actualizar docente:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

export async function eliminarDocente(req, res) {
  try {
    const result = await eliminarDocenteServicio(req.params.documento);
    if (!result.success) {
      return res.status(404).json({ mensaje: result.message });
    }
    return res.json({ mensaje: result.message });
  } catch (error) {
    console.error("Error al eliminar docente:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}
