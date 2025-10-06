import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import usuarioRoutes from "./routes/usuario.route.js";
import estudianteRoutes from "./routes/estudiante.route.js";
import docenteRoutes from "./routes/docente.route.js";
import materiaRoutes from "./routes/materia.route.js";
import estudianteMateriaRoutes from "./routes/estudianteMateria.route.js";

import { swaggerDocs } from "./docs/swagger.js";

dotenv.config({ quiet: true });

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/usuario", usuarioRoutes);
app.use("/api/estudiante", estudianteRoutes);
app.use("/api/docente", docenteRoutes);
app.use("/api/materia", materiaRoutes);
app.use("/api/inscripciones", estudianteMateriaRoutes);

swaggerDocs(app);

export default app;
