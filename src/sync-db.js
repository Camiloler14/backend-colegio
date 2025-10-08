import sequelize from "./config/db.js";
import "./models/asociaciones.js"; 
import bcrypt from "bcrypt";
import { Usuario } from "./models/asociaciones.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("🟢 Conectado correctamente a la base de datos");

    await sequelize.sync({ alter: true });
    console.log("✅ Tablas y asociaciones sincronizadas correctamente");

  
    const [creado] = await Usuario.findOrCreate({
      where: { codUsuario: "123456" },
      defaults: {
        codUsuario: "123456",
        nombre: "Administrador",
        rol: "admin",
        password: await bcrypt.hash("12345", 10),
      },
    });

    console.log(
      creado ? "Usuario administrador creado" : "Usuario ya existía"
    );
  } catch (error) {
    console.error("Error al sincronizar:", error);
  } finally {
    await sequelize.close();
    console.log("Conexión cerrada");
  }
})();
