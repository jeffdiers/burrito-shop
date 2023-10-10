import { AppDataSource } from "../../util/data-source";
import { Burrito } from "../../src/entity/Burrito";
import { BurritoResolver } from "../../src/resolver/BurritoResolver";
import { DataSource, Repository } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

describe("Burrito Entity", () => {
  let connection: DataSource;
  let apolloServer: ApolloServer;

  beforeAll(async () => {
    connection = await AppDataSource.initialize();

    const schema = await buildSchema({
      resolvers: [BurritoResolver],
    });
    apolloServer = new ApolloServer({ schema });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should create a burrito", async () => {
    const newBurrito = new Burrito();
    newBurrito.name = "Test Burrito";
    newBurrito.size = "Regular";
    newBurrito.price = 4.99;

    const response = await apolloServer.executeOperation({
      query: `
        mutation {
          createBurrito(
            name: "${newBurrito.name}"
            size: "${newBurrito.size}"
            price: ${newBurrito.price}
          ) {
            id
            name
            size
            price
          }
        }
      `,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(response.data!.createBurrito).toBeDefined();
    expect(response.data!.createBurrito.name).toEqual(newBurrito.name);
  });

  it("should fetch all burritos", async () => {
    const response = await apolloServer.executeOperation({
      query: `
        query {
          burritos {
            id
            name
            size
            price
          }
        }
      `,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(response.data!.burritos).toBeDefined();
    expect(response.data!.burritos.length).toEqual(1);
    expect(response.data!.burritos[0].name).toEqual("Test Burrito");
  });

  it("should get a burrito by ID", async () => {
    const response = await apolloServer.executeOperation({
      query: `
        query {
          getBurritoById(id: 1) {
            id
            name
            size
            price
          }
        }
      `,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(response.data).toEqual({
      getBurritoById: {
        id: "1",
        name: "Test Burrito",
        size: "Regular",
        price: 4.99,
      },
    });
  });

  it("should return null for a non-existent burrito", async () => {
    const response = await apolloServer.executeOperation({
      query: `
        query {
          getBurritoById(id: 2) {
            id
            name
            size
            price
          }
        }
      `,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data).toBeDefined();
    expect(response.data).toEqual({
      getBurritoById: null,
    });
  });
});
