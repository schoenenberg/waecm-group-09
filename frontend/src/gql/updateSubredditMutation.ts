import gql from 'graphql-tag';

export type RedditId = {
  _id: string; 
};

export type UpdateSubredditInput = {    
    name: string, 
    active: boolean,
};


export const UPDATE_SUBREDDIT = gql`
mutation UpdateSubreddit($_id: String!, $input: UpdateSubredditInput!){
    updateSubreddit( 
      _id: $_id
      input: $input
      ) 
    { 
    name
    }
}
`;







