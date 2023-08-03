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

export const QUERY_STORY = gql`
  query getStoryQuery {
    story {
      _id
      name
      numberOfPossibleEndings
      firstStorySlide
    }
  }
`;

export const QUERY_STORYSLIDE = gql`
  query getStoryQuery {
    story {
      _id
      text
      backgroundImage
      options
      endSlide
    }
  }
`;

export const QUERY_STORYOPTION = gql`
  query getStoryQuery {
    story {
      _id
      text
      nextStorySlide
    }
  }
`;