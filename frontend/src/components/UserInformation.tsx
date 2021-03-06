import { useQuery } from '@apollo/react-hooks';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { AlertWithTitle } from './AlertWithTitle';
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

export const UserInformation = () => {
  const styles = useStyles();

  const { loading, error, data } = useQuery<CurrentUserData>(GET_CURRENT_USER);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <AlertWithTitle title={'Error'}>Unauthorized</AlertWithTitle>
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
