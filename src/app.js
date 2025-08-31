import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import studentRoutes from './routes/student.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import subjectRoutes from './routes/subject.routes.js'; 

import { swaggerDocs } from './docs/swagger.js';


dotenv.config();

// Crear la aplicación de Express
const app = express();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api', studentRoutes);
app.use('/api', teacherRoutes);
app.use('/api', subjectRoutes); 

// Configuración de Swagger para la documentación de la API
swaggerDocs(app);

// Definir el puerto
const PORT = process.env.PORT || 3000;

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export default app;
