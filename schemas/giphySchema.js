const { makeExecutableSchema } = require('graphql-tools');
const giphyTypeDefs = require('./giphyTypeDefs');
const axios = require('axios');
require('dotenv').config();

const giphyResolvers = {
  Query: {
    getGiphy: async (_, args) => {
      const apiKey = process.env.GIPHY_API_KEY;
      const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${args.search}`;
      try {
        const response = await axios.get(apiUrl);
        const { data } = response.data;
        const gifUrl = data.images.original.url;
        return { url: gifUrl };
      } catch (error) {
        console.error('Error fetching data from Giphy:', error);
        throw new Error('Failed to fetch Giphy data.');
      }
    },
  },
};

module.exports = makeExecutableSchema({
  typeDefs: giphyTypeDefs,
  resolvers: giphyResolvers,
});