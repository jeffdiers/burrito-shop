import express from "express";
import { AppDataSource } from "../util/data-source";
import { BurritoResolver } from "./resolver/BurritoResolver";
import { OrderItemResolver } from "./resolver/OrderItemResolver";
import { OrderResolver } from "./resolver/OrderResolver";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import apiKeyMiddleware from "../util/apiKeyMiddleware";

async function main() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [BurritoResolver, OrderItemResolver, OrderResolver],
  });

  const app = express();
  // app.use(apiKeyMiddleware);
  const server = new ApolloServer({ schema });
  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 });

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

main().catch((err) => console.error(err));
