import gql from 'graphql-tag';

export type SubredditData = {
  _id: string;
  name: string;
  description: string;
  icon: string;
  answerCount: number;
  answer: string;
  active: boolean;
  keywords: string[];
};

export type AllSubredditsData = {
  allSubreddits: [SubredditData];
};

export const GET_ALL_SUBREDDITS = gql`
  {
    allSubreddits {
      _id
      name
      description
      icon
      answeredCommentIDs
      answer
      active
      keywords
    }
  }
`;
