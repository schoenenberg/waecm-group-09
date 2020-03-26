import { useQuery } from "@apollo/react-hooks";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { useStyles } from "../materialStyles";
import { Alert } from "./Alert";
import { CurrentUserData, GET_CURRENT_USER } from "../gql/currentUserQuery";

export const UserInformation = () => {
  const classes = useStyles();

  const { loading, error, data } = useQuery<CurrentUserData>(GET_CURRENT_USER);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <Alert title={"Error"}>Unauthorized</Alert>
      ) : (
        <div>
          {data && (
            <>
              <Avatar
                alt="Remy Sharp"
                src={data.currentUser.picture}
                className={classes.large}
              />
              <h2 className={classes.username}>{data.currentUser.username}</h2>
            </>
          )}
        </div>
      )}
    </>
  );
};
