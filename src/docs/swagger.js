import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Colegio',
      version: '1.0.0',
      description: 'Documentación de la API para la gestión de usuarios y estudiantes',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
 apis: [
  './src/routes/usuario.route.js',
  './src/routes/estudiante.route.js',
  './src/routes/docente.route.js',
  './src/routes/subject.routes.js'
],
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs disponibles en http://localhost:3000/api/docs');
}
