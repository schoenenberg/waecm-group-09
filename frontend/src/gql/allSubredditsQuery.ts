import gql from 'graphql-tag';

export type AllSubreddits = {
    _id: string; 
    name: string;
    description: string;
    icon: string;
    answerCount: string;
    answer: number;
    active: boolean;
    keywords: string[];
};

export type AllSubredditsData = {
    allSubreddits: AllSubreddits;
};

export const GET_ALL_SUBREDDITS = gql`
    {
        allSubreddits {
            _id
            name
            description
            icon
            answerCount
            answer
            active
            keywords
        }
    }
`;
