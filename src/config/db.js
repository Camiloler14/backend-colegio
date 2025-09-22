/** 
Importa la clase Sequelize del paquete 'sequelize', 
utilizada para interactuar con bases de datos SQL
*/
import { Sequelize } from "sequelize";

/**  
Importa el paquete 'dotenv' para cargar 
variables de entorno desde un archivo .env 
*/
import dotenv from "dotenv";

/**  
Carga las variables de entorno definidas en el archivo 
.env al entorno de ejecución de Node.js 
*/
dotenv.config();

/**
Crea una nueva instancia de Sequelize para conectarse 
a una base de datos PostgreSQL
*/
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña del usuario
  {
    host: process.env.DB_HOST, // Host o dirección del servidor de la base de datos
    port: Number(process.env.DB_PORT), // Puerto en el que se expone la base de datos (convertido a número)
    dialect: "postgres", // Especifica que se usará PostgreSQL como sistema de base de datos
    logging: false, // Desactiva el logging de consultas SQL en consola
  }
);

/**
 Función asíncrona para probar la conexión con la base de datos.
 Utiliza el método `authenticate()` de Sequelize para verificar la conexión.
 Si la conexión es exitosa, muestra un mensaje en consola.
 Si falla, muestra el error y lanza una excepción.
 */
export async function testConnection() {
  try {
    await sequelize.authenticate(); // Intenta autenticar la conexión a la base de datos
    console.log("Conexión a PostgreSQL exitosa"); // Mensaje si la conexión fue exitosa
  } catch (error) {
    console.error("No se pudo conectar a PostgreSQL:", error); // Mensaje si hubo un error en la conexión
    throw error; // Lanza el error para que pueda ser capturado por quien llame esta función 
  }
}

/** 
Exporta la instancia de Sequelize para que pueda ser 
utilizada en otras partes de la aplicación 
*/
export default sequelize;
