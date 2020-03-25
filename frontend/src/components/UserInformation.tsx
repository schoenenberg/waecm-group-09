import { useQuery } from "@apollo/react-hooks";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { useStyles } from "../materialStyles";
import { Alert } from "./Alert";
import { currentUserQuery } from "../gql/currentUserQuery";

export const UserInformation = () => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(currentUserQuery);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <Alert title={"Error"}>Unauthorized</Alert>;
  }
  return (
    <div>
      <Avatar
        alt="Remy Sharp"
        src={data.currentUser.picture}
        className={classes.large}
      />
      <h2 className={classes.username}>{data.currentUser.username}</h2>
    </div>
  );
};
