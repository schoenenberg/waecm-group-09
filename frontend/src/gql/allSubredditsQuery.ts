import gql from 'graphql-tag';

export type AllSubreddits = {
  _id: string;
  name: string;
  description: string;
  icon: string;
  answeredCommentIDs: string[];
  answer: string;
  active: boolean;
  keywords: string[];
  createdOn: Date;
};

export type AllSubredditsData = {
  allSubreddits: [AllSubreddits];
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
      createdOn
    }
  }
`;
