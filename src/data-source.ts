import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

console.log(
  "ENV VARS",
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME
);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
