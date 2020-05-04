import gql from "graphql-tag";

export type RedditId = {
  _id: string;
};

export const DELETE_SUBREDDIT = gql`
  mutation DeleteSubreddit($_id: String!) {
    deleteSubreddit(_id: $_id) {
      name
    }
  }
`;
