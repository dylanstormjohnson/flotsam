import express from 'express'
import path from 'path'
import { ApolloServer } from 'apollo-server-express'
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import dotenv from 'dotenv';
dotenv.config();

// Import the two parts of a GraphQL schema
import { typeDefs, resolvers } from './schemas/index.js'
import { authMiddleware } from './utils/auth.js'

import db from './config/connection.js'

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(graphqlUploadExpress());

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {

  console.log(__dirname);

  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  })
}


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer();
