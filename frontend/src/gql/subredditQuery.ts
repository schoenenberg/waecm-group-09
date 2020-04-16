import { gql } from "apollo-boost";

export type Subreddit = {
    link: string;
    description: string;
    icon: string;
    answerCount: string;
};

export type SubredditData = {
    subreddit: Subreddit;
};

export const GET_SUBREDDIT = gql`
  {
    subreddit {
      link
      description
      icon
      answerCount
    }
  }
`;
