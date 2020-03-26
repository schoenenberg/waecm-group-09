import { useQuery } from "@apollo/react-hooks";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { Alert } from "./Alert";
import { CurrentUserData, GET_CURRENT_USER } from "../gql/currentUserQuery";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(40),
    height: theme.spacing(40)
  },
  username: {
    ...theme.typography.h6,
    margin: 0,
    color: "#c6d9ec",
    textAlign: "center",
    marginBottom: theme.spacing(3)
  }
}));

export const UserInformation = () => {
  const styles = useStyles();

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
                className={styles.avatar}
              />
              <h2 className={styles.username}>{data.currentUser.username}</h2>
            </>
          )}
        </div>
      )}
    </>
  );
};
