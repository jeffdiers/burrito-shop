import { AppDataSource } from "../../util/data-source";
import { Burrito } from "../../src/entity/Burrito";
import { BurritoResolver } from "../../src/resolver/BurritoResolver";
import { DataSource, Repository } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

describe("Burrito Entity", () => {
  let connection: DataSource;
  let burritoRepository: Repository<Burrito>;
  let apolloServer: ApolloServer;

  beforeAll(async () => {
    connection = await AppDataSource.initialize();
    burritoRepository = connection.manager.getRepository(Burrito);

    const schema = await buildSchema({
      resolvers: [BurritoResolver],
    });
    apolloServer = new ApolloServer({ schema });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should fetch all burritos", async () => {
    const newBurrito1 = new Burrito();
    newBurrito1.name = "Test Burrito";
    newBurrito1.size = "Regular";
    newBurrito1.price = 4.99;

    const newBurrito2 = new Burrito();
    newBurrito2.name = "Test Burrito - 2";
    newBurrito2.size = "Regular";
    newBurrito2.price = 4.99;

    await burritoRepository.save(newBurrito1);
    await burritoRepository.save(newBurrito2);

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
    expect(response.data!.burritos.length).toEqual(2);
    expect(response.data!.burritos[0].name).toEqual(newBurrito1.name);
  });
});
