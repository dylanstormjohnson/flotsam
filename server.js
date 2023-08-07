const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const giphySchema = require('./schemas/giphySchema');

// Set up the Express server
const app = express();

// Create the /giphy endpoint for GraphQL
app.use('/giphy', graphqlHTTP({ schema: giphySchema, graphiql: true }));

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
