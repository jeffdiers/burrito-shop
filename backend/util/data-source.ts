import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Burrito } from "../src/entity/Burrito";
import { Order } from "../src/entity/Order";
import { OrderItem } from "../src/entity/OrderItem";

// Set the database name based on the environment
const DATABASE =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_NAME
    : process.env.DB_NAME;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: false,
  entities: [Burrito, Order, OrderItem],
  migrations: ["./src/migration/*.ts"],
  subscribers: [],
});
