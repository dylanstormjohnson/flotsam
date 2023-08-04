import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query getMeQuery {
    me {
      _id
      firstName
      lastName
      email
      bio
      storiesPlayed
      profilePhoto
      createdAt
      updatedAt
    }
  }
`;

export const QUERY_ALL_STORIES = gql`
  query getStoryQuery {
    stories {
      _id
      name
      numberOfPossibleEndings
      firstStorySlide
    }
  }
`;

export const QUERY_ALL_STORY_SLIDES = gql`
  query getStorySlideQuery {
    storySlides {
      _id
      text
      backgroundImage
      options
      endSlide
    }
  }
`;

export const QUERY_ALL_STORY_OPTIONS = gql`
  query getStoryOptionQuery {
    storyOptions {
      _id
      text
      nextStorySlide
    }
  }
`;

export const QUERY_SINGLE_STORY = gql`
  query Query($storyId: ID!) {
    story(id: $storyId) {
      name
      backgroundImage
      numberOfPossibleEndings
      firstStorySlide {
        _id
      }
    }
  }
`;

export const QUERY_SINGLE_STORY_SLIDE = gql`
  query Query($storySlideId: ID!) {
    storySlide(id: $storySlideId) {
      _id
      text
      options {
        _id
      }
      backgroundImage
      endSlide
    }
  }
`;

export const QUERY_SINGLE_STORY_OPTION = gql`
  query Query($storyOptionId: ID!) {
    storyOption(id: $storyOptionId) {
      _id
      text
      nextStorySlide {
        _id
      }
    }
  }
`;
