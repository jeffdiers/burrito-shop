import { Authorized, Resolver, Query, Mutation, Arg } from "type-graphql";
import { OrderItem } from "../entity/OrderItem";
import { Burrito } from "../entity/Burrito";
import { Order } from "../entity/Order";
import { AppDataSource } from "../../util/data-source";
import { type Repository } from "typeorm";
import { UserRole } from "../../util/authChecker";

@Resolver(() => OrderItem)
export class OrderItemResolver {
  private readonly orderItemRepository: Repository<OrderItem>;
  private readonly burritoRepository: Repository<Burrito>;
  private readonly orderRepository: Repository<Order>;

  constructor() {
    this.orderItemRepository = AppDataSource.getRepository(OrderItem);
    this.burritoRepository = AppDataSource.getRepository(Burrito);
    this.orderRepository = AppDataSource.getRepository(Order);
  }

  /**
   * Creates a new order item in the database.
   * @param quantity
   * @param burritoId
   * @param orderId
   * @returns {Promise<OrderItem>} A promise that resolves to an order item.
   */
  @Authorized(UserRole.ADMIN)
  @Mutation(() => OrderItem)
  async createOrderItem(
    @Arg("quantity") quantity: number,
    @Arg("burritoId") burritoId: number,
    @Arg("orderId") orderId: number
  ): Promise<OrderItem> {
    // find the order and burrito
    const burrito = await this.burritoRepository.findOneBy({ id: burritoId });
    const order = await this.orderRepository.findOneBy({ id: orderId });

    if (!burrito || !order) {
      throw new Error("Burrito or order not found");
    }

    const orderItem = this.orderItemRepository.create({
      quantity,
      burrito,
      order,
    });
    await this.orderItemRepository.save(orderItem);
    return orderItem;
  }

  /**
   * Updates an order item in the database.
   * @param id
   * @param quantity
   * @param burritoId
   * @param orderId
   * @returns {Promise<OrderItem>} A promise that resolves to an order item.
   */
  @Authorized(UserRole.ADMIN)
  @Mutation(() => OrderItem)
  async updateOrderItem(
    @Arg("id") id: number,
    @Arg("quantity") quantity: number,
    @Arg("burritoId") burritoId: number,
    @Arg("orderId") orderId: number
  ): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOneBy({ id });
    if (!orderItem) {
      throw new Error("Order item not found");
    }

    // find the order and burrito
    const burrito = await this.burritoRepository.findOneBy({ id: burritoId });
    const order = await this.orderRepository.findOneBy({ id: orderId });

    if (!burrito || !order) {
      throw new Error("Burrito or order not found");
    }

    orderItem.quantity = quantity;
    orderItem.burrito = burrito;
    orderItem.order = order;

    await this.orderItemRepository.save(orderItem);
    return orderItem;
  }

  /**
   * Deletes an order item from the database.
   * @param id
   * @returns {Promise<OrderItem>} A promise that resolves to an order item.
   */
  @Authorized(UserRole.ADMIN)
  @Mutation(() => OrderItem)
  async deleteOrderItem(@Arg("id") id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOneBy({ id });
    if (!orderItem) {
      throw new Error("Order item not found");
    }

    await this.orderItemRepository.delete(id);
    return orderItem;
  }

  /**
   * Fetches all order items from the database.
   * @returns {Promise<OrderItem[]>} A promise that resolves to an array of order items.
   */
  @Query(() => [OrderItem])
  async orderItems(): Promise<OrderItem[]> {
    return await this.orderItemRepository.find({
      relations: ["burrito", "order"],
    });
  }
}
