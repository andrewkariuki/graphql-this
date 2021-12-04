import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { GraphQLServer } from "graphql-yoga";
import { join } from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { resolvers } from "./resolvers";

const schema = loadSchemaSync(join(__dirname, "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new GraphQLServer({ schema: schemaWithResolvers });

createConnection().then(() => {
  server.start(() => console.log("Server is running on localhost:4000"));
});
