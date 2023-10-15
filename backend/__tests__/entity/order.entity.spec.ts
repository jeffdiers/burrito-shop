import { AppDataSource } from "../../util/data-source";
import { Order } from "../../src/entity/Order";
import { OrderItem } from "../../src/entity/OrderItem";
import { Burrito } from "../../src/entity/Burrito";
import { DataSource, Repository } from "typeorm";

describe("Order Entity", () => {
  let connection: DataSource;
  let orderRepository: Repository<Order>;
  let orderItemRepository: Repository<OrderItem>;
  let burritoRepository: Repository<Burrito>;

  beforeEach(async () => {
    connection = await AppDataSource.initialize();
    orderRepository = connection.manager.getRepository(Order);
    orderItemRepository = connection.manager.getRepository(OrderItem);
    burritoRepository = connection.manager.getRepository(Burrito);
  });

  afterEach(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should create a new Order", async () => {
    // Create new order
    const newOrder = new Order();
    const savedOrder = await orderRepository.save(newOrder);

    expect(savedOrder).toBeDefined();
  });
});
