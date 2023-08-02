import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query getMeQuery {
    me {
      _id
      firstName
      lastName
      email
      bio
      profilePhoto
      createdAt
      updatedAt
    }
  }
`;

