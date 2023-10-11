import { AppDataSource } from "../../util/data-source";
import { Order } from "../../src/entity/Order";
import { Burrito } from "../../src/entity/Burrito";
import { OrderItem } from "../../src/entity/OrderItem";
import { OrderResolver } from "../../src/resolver/OrderResolver";
import { DataSource } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

describe("Order Resolver", () => {
  let connection: DataSource;
  let apolloServer: ApolloServer;

  beforeAll(async () => {
    try {
      connection = await AppDataSource.initialize();

      const schema = await buildSchema({
        resolvers: [OrderResolver],
      });
      apolloServer = new ApolloServer({ schema });
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should create an order", async () => {
    const response = await apolloServer.executeOperation({
      query: `
        mutation {
          createOrder {
            id
          }
        }
      `,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(response.data!.createOrder).toBeDefined();
  });

  it("should fetch an order by ID with the correct total price", async () => {
    // Create new order
    const newOrder = new Order();
    await connection.getRepository("Order").save(newOrder);

    // Create Burrito for OrderItem
    const newBurrito = new Burrito();
    newBurrito.name = "Test Burrito";
    newBurrito.size = "Regular";
    newBurrito.price = 4;
    await connection.getRepository("Burrito").save(newBurrito);

    // Create OrderItems for Order
    const newOrderItem1 = new OrderItem();
    newOrderItem1.quantity = 2;
    newOrderItem1.burrito = newBurrito;
    newOrderItem1.order = newOrder;
    await connection.getRepository("OrderItem").save(newOrderItem1);

    const newOrderItem2 = new OrderItem();
    newOrderItem2.quantity = 1;
    newOrderItem2.burrito = newBurrito;
    newOrderItem2.order = newOrder;
    await connection.getRepository("OrderItem").save(newOrderItem2);

    const response = await apolloServer.executeOperation({
      query: `
        query {
          order(orderId: ${newOrder.id}) {
            id
            items {
              id
              quantity
              burrito {
                name
                price
              }
            }
            totalPrice
          }
        }
      `,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(response.data!.order).toBeDefined();
    expect(response.data!.order!.items).toBeDefined();
    expect(response.data!.order.totalPrice).toEqual(12);
  });

  it("should fetch all orders", async () => {
    const response = await apolloServer.executeOperation({
      query: `
        query {
          orders {
            id
            items {
              id
              quantity
              burrito {
                name
                price
              }
            }
            totalPrice
          }
        }
      `,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(response.data!.orders).toBeDefined();
    expect(response.data!.orders.length).toEqual(2);
    expect(response.data!.orders[0].totalPrice).toEqual(12);
  });
});
