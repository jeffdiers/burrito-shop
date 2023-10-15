"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
var typeorm_1 = require("typeorm");
var Burrito_1 = require("../src/entity/Burrito");
var Order_1 = require("../src/entity/Order");
var OrderItem_1 = require("../src/entity/OrderItem");
// Set the database name based on the environment
var DATABASE = process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_NAME
    : process.env.DB_NAME;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: DATABASE,
    synchronize: true,
    logging: false,
    entities: [Burrito_1.Burrito, Order_1.Order, OrderItem_1.OrderItem],
    migrations: ["./src/migration/*.ts"],
    subscribers: [],
});
