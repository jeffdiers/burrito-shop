import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Burrito } from "../src/entity/Burrito";
import { Order } from "../src/entity/Order";
import { OrderItem } from "../src/entity/OrderItem";

export const TestAppDataSource = new DataSource({
  type: "postgres",
  host: process.env.TEST_DB_HOST,
  port: parseInt(process.env.TEST_DB_PORT, 10),
  username: process.env.TEST_DB_USER,
  password: process.env.TEST_DB_PASSWORD,
  database: process.env.TEST_DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Burrito, Order, OrderItem],
  migrations: ["./src/migration/*.ts"],
  subscribers: [],
});
