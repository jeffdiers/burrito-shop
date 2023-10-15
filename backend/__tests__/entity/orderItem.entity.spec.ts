import { AppDataSource } from "../../util/data-source";
import { OrderItem } from "../../src/entity/OrderItem";
import { DataSource, Repository } from "typeorm";

describe("OrderItem Entity", () => {
  let connection: DataSource;
  let orderItemRepository: Repository<OrderItem>;

  beforeEach(async () => {
    connection = await AppDataSource.initialize();
    orderItemRepository = connection.manager.getRepository(OrderItem);
  });

  afterEach(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should create a new order item", async () => {
    const orderItem = new OrderItem();
    orderItem.quantity = 2;

    const savedOrderItem = await orderItemRepository.save(orderItem);

    expect(savedOrderItem).toBeDefined();
    expect(savedOrderItem.quantity).toBe(orderItem.quantity);
  });

  it("should fetch an order item", async () => {
    const orderItem = new OrderItem();
    orderItem.quantity = 2;

    await orderItemRepository.save(orderItem);

    const foundOrderItem = await orderItemRepository.findOne({
      where: {
        id: orderItem.id,
      },
    });

    expect(foundOrderItem).toBeDefined();
    expect(foundOrderItem.quantity).toBe(orderItem.quantity);
  });
});
