import dotenv from "dotenv";
dotenv.config(); 

import { Sequelize } from "sequelize";
import sequelize from "../config/db.js"; 
describe("db.js", () => {
  it("Debe exportar una instancia de Sequelize", () => {
    expect(sequelize).toBeDefined();
    expect(sequelize).toBeInstanceOf(Sequelize);
  });

  it("Debe tener la configuración correcta", () => {
    const config = sequelize.config;

    expect(config.database).toBe(process.env.DB_NAME);
    expect(config.username).toBe(process.env.DB_USER);
    expect(config.password).toBe(process.env.DB_PASSWORD);
    expect(config.host).toBe(process.env.DB_HOST);
    expect(config.port).toBe(Number(process.env.DB_PORT) || 5432);

    expect(sequelize.options.dialect).toBe("postgres");
    expect(sequelize.options.logging).toBe(false);
    expect(sequelize.options.pool.max).toBe(10);
    expect(sequelize.options.pool.min).toBe(0);
    expect(sequelize.options.pool.acquire).toBe(30000);
    expect(sequelize.options.pool.idle).toBe(10000);
    expect(sequelize.options.retry.max).toBe(5);
  });

  it("Debe poder autenticar la conexión", async () => {
    await expect(sequelize.authenticate()).resolves.not.toThrow();
  });
});