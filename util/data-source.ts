import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Burrito } from "../src/entity/Burrito";
import { Order } from "../src/entity/Order";
import { OrderItem } from "../src/entity/OrderItem";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Burrito, Order, OrderItem],
  migrations: ["./src/migration/*.ts"],
  subscribers: [],
});
