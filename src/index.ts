import "dotenv/config";

import { AppDataSource } from "../util/data-source";
import { Burrito } from "./entity/Burrito";
import { OrderItem } from "./entity/OrderItem";
import { Order } from "./entity/Order";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new Burrito into the database...");
    const newBurrito = new Burrito();
    newBurrito.name = "Chicken Burrito";
    newBurrito.size = "Regular";
    newBurrito.price = 3.0;
    const savedBurrito = await AppDataSource.manager.save(newBurrito);

    const orderBurrito = await AppDataSource.manager.findOne(Burrito, {
      where: {
        id: savedBurrito.id,
      },
    });

    // Create a new OrderItem and associate it with the Burrito
    const orderItem = new OrderItem();
    orderItem.quantity = 2;
    orderItem.burrito = orderBurrito;
    const savedOrder = await AppDataSource.manager.save(orderItem);

    console.log("Saved order", savedOrder);

    const order = new Order();
    order.totalCost = 10.99;
    order.items = [savedOrder];
    const savedOrder2 = await AppDataSource.manager.save(order);

    console.log("Saved order2", savedOrder2);

    console.log("Loading Order from the database...");
    const users = await AppDataSource.manager.find(OrderItem, {
      relations: ["burrito"],
    });
    console.log("Loaded Orders: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));
