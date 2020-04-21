import { gql } from "apollo-boost";

export type Subreddit = {
    _id: string;
    name: string;
    description: string;
    icon: string;
    answerCount: string;
};

export type SubredditData = {
    subreddit: Subreddit;
};

export const GET_SUBREDDITS = gql`
  {
     allSubreddits {
    _id
    name
    description
    icon
    answerCount
    }
  }
`;
