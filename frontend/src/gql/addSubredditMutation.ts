import gql from "graphql-tag";

export type NewSubredditInput = {
  name: string;
  active: boolean;
  answer: string;
  keywords: string[];
  createdOn: Date;
};

export const ADD_SUBREDDIT = gql`
  mutation addSubreddit($input: NewSubredditInput!) {
    createNewSubreddit(input: $input) {
      _id
      name
    }
  }
`;
