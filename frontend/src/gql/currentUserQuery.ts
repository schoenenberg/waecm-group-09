import { gql } from "apollo-boost";

export const currentUserQuery = gql`
    {
      currentUser {
        username
        picture
      }
    }
  `;