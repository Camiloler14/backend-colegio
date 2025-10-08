import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const useSSL = process.env.DB_USE_SSL === "true";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
    retry: { max: 5 },
    dialectOptions: useSSL
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false, 
          },
        }
      : {},
  }
);

export default sequelize;
