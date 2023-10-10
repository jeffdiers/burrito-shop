import { AppDataSource } from "../../util/data-source";
import { Order } from "../../src/entity/Order";
import { DataSource, Repository } from "typeorm";

describe("Order Entity", () => {
  let connection: DataSource;
  let orderRepository: Repository<Order>;

  beforeEach(async () => {
    connection = await AppDataSource.initialize();
    orderRepository = connection.manager.getRepository(Order);
  });

  afterEach(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should create a new Order", async () => {
    const newOrder = new Order();
    newOrder.totalCost = 10.99;

    const savedOrder = await orderRepository.save(newOrder);

    expect(savedOrder).toBeDefined();
    expect(savedOrder.totalCost).toEqual(savedOrder.totalCost);
  });

  it("should fetch an Order", async () => {
    const newOrder = new Order();
    newOrder.totalCost = 10.99;

    await orderRepository.save(newOrder);

    const foundOrder = await orderRepository.findOne({
      where: {
        id: newOrder.id,
      },
    });

    expect(foundOrder).toBeDefined();
    expect(foundOrder.totalCost).toEqual(newOrder.totalCost.toString());
  });
});
