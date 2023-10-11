import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Order } from "../entity/Order";
import { AppDataSource } from "../../util/data-source";
import { type Repository } from "typeorm";

@Resolver(() => Order)
export class OrderResolver {
  private readonly orderRepository: Repository<Order>;

  constructor() {
    this.orderRepository = AppDataSource.getRepository(Order);
  }

  /**
   * Creates a new order in the database.
   * @returns {Promise<OrderItem>} A promise that resolves to an order item.
   */
  @Mutation(() => Order)
  async createOrder(): Promise<Order> {
    const order = this.orderRepository.create();
    await this.orderRepository.save(order);
    return order;
  }

  /**
   * Fetches order by ID.
   * @returns {Promise<Order>} A promise that resolves to an array of order items.
   */
  @Query(() => Order)
  async order(@Arg("orderId") orderId: number): Promise<Order | undefined> {
    return await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ["items", "items.burrito"],
    });
  }

  /**
   * Fetches all orders from the database.
   * @returns {Promise<Order[]>} A promise that resolves to an array of orders.
   */
  @Query(() => [Order])
  async orders(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ["items", "items.burrito"],
    });
  }
}
