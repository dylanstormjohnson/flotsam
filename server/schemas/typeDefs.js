import { gql } from "apollo-server-express"

const typeDefs = gql`
  scalar Date

   scalar Upload

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
    profilePhoto: String
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
    singleUpload(file: Upload!, id: String!): Auth
  }
`;

export default typeDefs;
