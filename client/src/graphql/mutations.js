import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUserMutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        bio
        createdAt
        updatedAt
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    addUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
      user {
        _id
        firstName
        lastName
        email
        bio
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: String!
    $firstName: String
    $lastName: String
    $bio: String
    $password: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      password: $password
    ) {
      token
      user {
        _id
        firstName
        lastName
        email
        bio
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_PHOTO = gql`
  mutation updatePhoto($file: Upload) {
    updatePhoto(file: $file)
  }
`;
