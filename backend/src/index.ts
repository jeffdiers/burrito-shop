import express from "express";
import { AppDataSource } from "../util/data-source";
import { BurritoResolver } from "./resolver/BurritoResolver";
import { OrderItemResolver } from "./resolver/OrderItemResolver";
import { OrderResolver } from "./resolver/OrderResolver";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { UserRole } from "../util/authChecker";
import { customAuthChecker } from "../util/authChecker";

async function main() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [BurritoResolver, OrderItemResolver, OrderResolver],
    authChecker: customAuthChecker,
  });

  const app = express();
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      // Get the user token from the headers and use it to find the user
      const token = req.headers.authorization;
      const currentUser =
        token === process.env.API_KEY
          ? { id: "1", username: "test", role: UserRole.ADMIN }
          : null;

      return { currentUser };
    },
  });
  await server.start();

  server.applyMiddleware({ app, path: "/" });

  app.listen({ port: 4000 });

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

main().catch((err) => console.error(err));
