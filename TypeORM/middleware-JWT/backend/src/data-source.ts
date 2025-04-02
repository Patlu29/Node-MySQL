import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [`${process.cwd()}/src/entity/*.ts`],
  // @ts-ignore
  seeds: [`${process.cwd()}/src/seeders/*.ts`],
  // @ts-ignore
  factories: [`${process.cwd()}/src/factory/*.ts`],
});
