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
  query getStoriesQuery {
    stories {
      _id
      name
      numberOfPossibleEndings
      firstStorySlide
    }
  }
`;

export const QUERY_ALL_STORY_SLIDES = gql`
  query getStorySlidesQuery {
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
  query getStoryOptionsQuery {
    storyOptions {
      _id
      text
      nextStorySlide
    }
  }
`;

export const QUERY_SINGLE_STORY = gql`
  query getSingleStoryQuery($storyId: ID!) {
    story(id: $storyId) {
      name
      backgroundImage
      numberOfPossibleEndings
      firstStorySlide {
        _id
        text
        options {
          text
          nextStorySlide {
            _id
          }
          _id
        }
      }
    }
  }
`;

export const QUERY_SINGLE_STORY_SLIDE = gql`
  query StorySlide($storySlideId: ID!) {
    storySlide(id: $storySlideId) {
      _id
      text
      backgroundImage
      options {
        text
        nextStorySlide {
          _id
        }
        _id
      }
      endSlide
    }
  }
`;

export const QUERY_SINGLE_STORY_OPTION = gql`
  query getSingleStoryOptionQuery($storyOptionId: ID!) {
    storyOption(id: $storyOptionId) {
      _id
      text
      nextStorySlide {
        _id
      }
    }
  }
`;
