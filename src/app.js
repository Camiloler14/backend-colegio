import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import usuarioRoutes from "./routes/usuario.routes.js";
import estudianteRoutes from "./routes/estudiante.routes.js";
import docenteRoutes from "./routes/docente.routes.js";
import materiaRoutes from "./routes/materia.routes.js";
import estudianteMateriaRoutes from "./routes/estudianteMateria.routes.js";

import { swaggerDocs } from "./docs/swagger.js";

dotenv.config({ quiet: true });

const app = express();

// Configuración de CORS
const allowedOrigins = [
  /^http:\/\/127\.0\.0\.1:\d+$/,  // cualquier puerto en localhost
  /^http:\/\/localhost:\d+$/       // cualquier puerto en localhost
];

app.use(
  cors({
    origin: "*", // permite cualquier origen (para pruebas)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

// Rutas de la API
app.use("/api/usuario", usuarioRoutes);
app.use("/api/estudiante", estudianteRoutes);
app.use("/api/docente", docenteRoutes);
app.use("/api/materia", materiaRoutes);
app.use("/api/inscripciones", estudianteMateriaRoutes);

swaggerDocs(app);

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error("Error capturado:", err);
  res.status(err.status || 500).json({
    success: false,
    mensaje: err.message || "Error interno del servidor",
  });
});

export default app;

