const { gql } = require('apollo-server-express');

const giphyTypeDefs = gql`
  type Giphy {
    url: String
  }

  type Query {
    getGiphy(search: String): Giphy
  }
`;

module.exports = giphyTypeDefs;
