const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const axios = require('axios');
require('dotenv').config();

// Define the GraphQL schema and resolvers
const giphyType = new GraphQLObjectType({
  name: 'Giphy',
  fields: {
    url: { type: GraphQLString },
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getGiphy: {
      type: giphyType,
      args: {
        search: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const apiKey = process.env.GIPHY_API_KEY;
        const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${args.search}`;
        try {
          const response = await axios.get(apiUrl);
          const { data } = response.data;
          const gifUrl = data.images.original.url; // Get the GIF URL from the response
          return { url: gifUrl }; // Return the URL in the GraphQL response
        } catch (error) {
          console.error('Error fetching data from Giphy:', error);
          throw new Error('Failed to fetch Giphy data.');
        }
      },
    },
  },
});


const schema = new GraphQLSchema({
  query: queryType,
});

// Set up the Express server
const app = express();

// Create the /giphy endpoint for GraphQL
app.use('/giphy', graphqlHTTP({ schema, graphiql: true }));

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
