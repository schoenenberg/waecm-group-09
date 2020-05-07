import { useQuery } from '@apollo/react-hooks';
import Avatar from '@material-ui/core/Avatar';
import React, { FC, useState, useEffect } from 'react';
//import { Alert } from './Alert';
import { CurrentUserData, GET_CURRENT_USER } from '../gql/currentUserQuery';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

type UserInformationProps = {
  handleUnauthorized: () =>void;
};

export const UserInformation: FC<UserInformationProps> = ({handleUnauthorized}) => {
  const styles = useStyles();
  const [errorMessage, setErrorState] = useState("");

  const { loading, error, data } = useQuery<CurrentUserData>(GET_CURRENT_USER);

  useEffect(() => {
    if(error) {
      setErrorState(error.message);
      if (errorMessage === "GraphQL error: Unauthorized") {
        handleUnauthorized();
        console.log("test")
      }
    }
  }, [error]);

  const check = () => {
    if (errorMessage === "GraphQL error: Unauthorized") {
      handleUnauthorized();
    }
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        check()
      ) 
      : (
        <div>
          {data && (
            <>
              <IconButton color="inherit">
                <h6>Hello {data.currentUser.username} </h6>
              </IconButton>
              <IconButton color="inherit">
                <Avatar
                  alt="Remy Sharp"
                  src={data.currentUser.picture}
                  className={styles.avatar}
                />
              </IconButton>
            </>
          )}
        </div>
      )}
    </>
  );
};
