import { gql } from "apollo-boost";

export type CurrentUser = {
  username: string;
  picture: string;
};

export type CurrentUserData = {
  currentUser: CurrentUser;
};

export const GET_CURRENT_USER = gql`
  {
    currentUser {
      username
      picture
    }
  }
`;
