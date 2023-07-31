const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type UserStory {
    story: Story
    endings: [storySlide]
  }

  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String!
    bio: String
    createdAt: String
    updatedAt: String
  }

  type storyOption {
    _id: ID!
    text: String!
    nextStorySlide: storySlide
  }

  type storySlide {
    _id: ID!
    text: String!
    backgroundImage: String!
    options: [storyOption]
    endSlide: Boolean
  }

  type Story {
    _id: ID!
    name: String!
    numberOfPossibleEndings: Int!
    firstStorySlide: storySlide
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(
      firstName: String
      lastName: String
      email: String!
      password: String!
    ): Auth
    loginUser(email: String!, password: String!): Auth
    updateUser(
      id: String!
      firstName: String
      lastName: String
      bio: String
      password: String
    ): Auth
    updatePhoto(file: Upload): String
  }
`;

module.exports = typeDefs;
