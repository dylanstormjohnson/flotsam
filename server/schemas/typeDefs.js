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
    allStories: [Story]
    story(id: ID!): Story
    storySlide(id: ID!): StorySlide
    storyOption(id: ID!): StoryOption
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
    addStory(
      name: String!
      numberOfPossibleEndings: Int!
      firstStorySlide: storySlide
    )
    addStorySlide(
      text: String!
      backgroundImage: String!
      options: [storyOption]
      endSlide: Boolean
    )
    addStoryOption(
      text: String!
      nextStorySlide: storySlide
    )
    updateStory(
      id: String!
      name: String!
      numberOfPossibleEndings: Int!
      firstStorySlide: storySlide
    )
    updateStorySlide(
      id: String!
      text: String!
      backgroundImage: String!
      options: [storyOption]
      endSlide: Boolean
    )
    updateStoryOption(
      id: String!
      text: String!
      nextStorySlide: storySlide
    )
  }
`;

module.exports = typeDefs;
