import {
  crearDocenteServicio,
  obtenerDocentesServicio,
  obtenerDocentePorDocumentoServicio,
  actualizarDocenteServicio,
  eliminarDocenteServicio,
} from "../services/docente.service.js";

export async function crearDocente(req, res) {
  const {
    codigo,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
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

    const docente = result.data.toJSON();

    const nombres = [docente.primerNombre, docente.segundoNombre]
      .filter(Boolean)
      .join(" ");
    const apellidos = [docente.primerApellido, docente.segundoApellido]
      .filter(Boolean)
      .join(" ");

    const docenteConNombre = {
      ...docente,
      nombreCompleto: `${nombres} ${apellidos}`.replace(/\s+/g, " ").trim(),
    };

    return res.status(201).json(docenteConNombre);
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

    const docentes = result.data.map((doc) => {
      const d =
        typeof doc.toJSON === "function" ? doc.toJSON() : doc.dataValues || doc;
      const nombres = [d.primerNombre, d.segundoNombre]
        .filter(Boolean)
        .join(" ");
      const apellidos = [d.primerApellido, d.segundoApellido]
        .filter(Boolean)
        .join(" ");

      return {
        ...d,
        nombreCompleto: `${nombres} ${apellidos}`.replace(/\s+/g, " ").trim(),
      };
    });

    return res.json(docentes);
  } catch (error) {
    console.error("Error al obtener docentes:", error);
    return res.status(500).json({
      mensaje: "Error interno del servidor",
      error: error.message,
    });
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
      nombreCompleto: [
        docente.primerNombre,
        docente.segundoNombre,
        docente.primerApellido,
        docente.segundoApellido,
      ]
        .filter(Boolean)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim(),
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
