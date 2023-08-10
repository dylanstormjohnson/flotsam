const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  scalar Upload

  type PlayedStory {
    story: Story
    endings: [StorySlide]
  }

  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String!
    bio: String
    storiesPlayed: [PlayedStory]
    profilePhoto: String
    createdAt: String
    updatedAt: String
  }

  type StoryOption {
    _id: ID!
    text: String!
    nextStorySlide: StorySlide!
  }

  type StorySlide {
    _id: ID!
    text: String!
    backgroundImage: String
    options: [StoryOption]
    endSlide: Boolean!
  }

  type Story {
    _id: ID!
    name: String!
    backgroundImage: String!
    numberOfPossibleEndings: Int!
    firstStorySlide: StorySlide!
    createdAt: String
    updatedAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    allStories: [Story]
    story(id: ID!): Story
    allStorySlides: [StorySlide]
    storySlide(id: ID!): StorySlide
    allStoryOptions: [StoryOption]
    storyOption(id: ID!): StoryOption
    nextStorySlide(category: ID, name: String): StorySlide
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

    updateUserStoriesPlayed(storyId: String!, storySlideId: String): User

    singleUpload(file: Upload!, id: String!): Auth
    addStory(
      name: String!
      backgroundImage: String!
      numberOfPossibleEndings: Int!
      firstStorySlide: StorySlideInput
    ): Story

    addStorySlide(
      text: String!
      backgroundImage: String
      options: [StoryOptionInput]
      endSlide: Boolean!
    ): StorySlide

    addStoryOption(text: String!, nextStorySlide: StorySlideInput): StoryOption

    updateStory(
      id: String!
      name: String
      backgroundImage: String
      numberOfPossibleEndings: Int
      firstStorySlide: StorySlideInput
    ): Story

    updatePlayedStory(
      id: String!
      name: String
      endings: [StorySlideInput]
    ): PlayedStory

    updateStorySlide(
      id: String!
      text: String
      backgroundImage: String
      options: [StoryOptionInput]
      endSlide: Boolean!
    ): StorySlide

    updateStoryOption(
      id: String!
      text: String
      nextStorySlide: StorySlideInput
    ): StoryOption
  }

  input StorySlideInput {
    text: String
    backgroundImage: String
    options: [StoryOptionInput]
    endSlide: Boolean
  }

  input StoryOptionInput {
    text: String
    nextStorySlide: ID
  }
`;

module.exports = typeDefs;
