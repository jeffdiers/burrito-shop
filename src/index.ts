import { AppDataSource } from "../util/data-source";
import { BurritoResolver } from "./resolver/BurritoResolver";
import { OrderItemResolver } from "./resolver/OrderItemResolver";
import { OrderResolver } from "./resolver/OrderResolver";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";

async function main() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [BurritoResolver, OrderItemResolver, OrderResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen(4000);

  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

main().catch((err) => console.error(err));
