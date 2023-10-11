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
   * Deletes an order from the database.
   * @param orderId
   * @returns {Promise<Order>} A promise that resolves to an order item.
   */
  @Mutation(() => Order)
  async deleteOrder(@Arg("id") id: number): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ["items", "items.burrito"],
      });
      if (!order) {
        throw new Error("Order not found");
      }

      // Remove all order items
      for (const item of order.items) {
        await AppDataSource.getRepository("OrderItem").delete(item.id);
      }

      await this.orderRepository.delete(id);
      return order;
    } catch (error) {
      throw new Error(error);
    }
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
