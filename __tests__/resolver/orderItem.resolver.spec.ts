import { AppDataSource } from "../../util/data-source";
import { OrderItem } from "../../src/entity/OrderItem";
import { OrderItemResolver } from "../../src/resolver/OrderItemResolver";
import { DataSource } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

describe("Order Item Resolver", () => {
  let connection: DataSource;
  let apolloServer: ApolloServer;

  beforeAll(async () => {
    connection = await AppDataSource.initialize();

    const schema = await buildSchema({
      resolvers: [OrderItemResolver],
    });
    apolloServer = new ApolloServer({ schema });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should create an order item", async () => {
    const newOrderItem = new OrderItem();
    newOrderItem.quantity = 2;

    // insert an order and burrito
    await connection.getRepository("Order").save({ id: 1, totalCost: 4.99 });
    await connection
      .getRepository("Burrito")
      .save({ id: 1, name: "Test Burrito", size: "Regular", price: 4.99 });

    const response = await apolloServer.executeOperation({
      query: `
        mutation {
          createOrderItem(
            orderId: 1
            burritoId: 1
            quantity: ${newOrderItem.quantity}
            ) {
              id
              quantity
              burrito {
                name
              }
              order {
                id
              }
            }
        }
        `,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(response.data!.createOrderItem).toBeDefined();
    expect(response.data!.createOrderItem.quantity).toEqual(
      newOrderItem.quantity
    );
    expect(response.data!.createOrderItem.burrito.name).toEqual("Test Burrito");
  });

  it("should fetch all order items", async () => {
    const response = await apolloServer.executeOperation({
      query: `
        query {
          orderItems {
            id
            quantity
            burrito {
              name
            }
            order {
              id
            }
          }
        }
      `,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(response.data!.orderItems).toBeDefined();
    expect(response.data!.orderItems.length).toEqual(1);
  });

  it("should update an order item", async () => {
    const response = await apolloServer.executeOperation({
      query: `
        mutation {
          updateOrderItem(
            id: 1
            quantity: 3
            burritoId: 1
            orderId: 1
          ) {
            id
            quantity
          }
        }
      `,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(response.data!.updateOrderItem).toBeDefined();
    expect(response.data!.updateOrderItem.quantity).toEqual(3);
  });

  it("should delete an order item", async () => {
    const response = await apolloServer.executeOperation({
      query: `
        mutation {
          deleteOrderItem(id: 1) {
            id
            quantity
          }
        }
      `,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(response.data!.deleteOrderItem).toBeDefined();
    expect(response.data!.deleteOrderItem.quantity).toEqual(3);
  });
});
