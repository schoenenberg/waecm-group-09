import gql from 'graphql-tag';

export type NewSubredditInput = {    
    name: string, 
    answer: string,
    active: boolean,
    keywords: string[]
};

export const ADD_SUBREDDIT = gql`
    mutation addSubreddit($input: NewSubredditInput!) {
        createNewSubreddit(
        input: $input
        ) 
        { 
            _id
            name
        }
  }
`;
