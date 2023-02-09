import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

export { sequelize };
