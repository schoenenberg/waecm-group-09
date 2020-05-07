import { useQuery } from '@apollo/react-hooks';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { Alert } from './Alert';
import { CurrentUserData, GET_CURRENT_USER } from '../gql/currentUserQuery';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

export const UserInformation = () => {
  const styles = useStyles();

  const { loading, error, data } = useQuery<CurrentUserData>(GET_CURRENT_USER);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <Alert title={'Error'}>Unauthorized</Alert>
      ) : (
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
