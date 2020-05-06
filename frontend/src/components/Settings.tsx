import React, { FC, useCallback } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { AddComponent } from './AddComponent';
import { Subreddit } from './Subreddit';
import { Alert } from './Alert';
import {
  GET_ALL_SUBREDDITS,
  AllSubredditsData,
} from '../gql/allSubredditsQuery';

import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(20),
      display: 'block',
      height: '100%',
      background: '#fffff',
    },
    addButton: {
      '& > *': {
        position: 'absolute',
        background: 'primary',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

type SettingsPrompts = {
  showAddComponent: boolean;
  showRedditList: boolean;
  setAddComponent: (newValue: boolean) => void;
  setShowRedditList: (newValue: boolean) => void;
  showEditComponent: boolean;
  setShowEditComponent: (newValue: boolean) => void;
};

export const Settings: FC<SettingsPrompts> = ({
  showAddComponent,
  showRedditList,
  setAddComponent,
  setShowRedditList,
  showEditComponent,
  setShowEditComponent,
}) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery<AllSubredditsData>(
    GET_ALL_SUBREDDITS,
    {
      pollInterval: 500,
    },
  );

    const allSubreddits = data ? data.allSubreddits : []

  
    const redirectSettings = useCallback(() => {
        setAddComponent(false);
        setShowRedditList(true);
    }, [setAddComponent, setShowRedditList]);

    const handleAddRedditClick = () => {
        if (allSubreddits.length === 3) {
            setAddComponent(false);
        } else {
            setAddComponent(true);
            setShowRedditList(false);
        }
    };


  return (
    <div className={classes.root}>
      <div className={classes.addButton} onClick={handleAddRedditClick}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>


      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <Alert title={'Error'}>Unauthorized</Alert>
      ) : (
        data &&
        !showAddComponent &&
        showRedditList && (
          <div>
            {data.allSubreddits.map((elem) => (
              <Subreddit
                reddit={elem.name}
                date={elem.createdOn}
                id={elem._id}
                keywords={elem.keywords}
                answer={elem.answer}
                active={elem.active}
                showEditComponent={showEditComponent}
                setShowEditComponent={setShowEditComponent}
              />
            ))}
          </div>
        )
      )}
      {showAddComponent && (
        <AddComponent
          onRedirectSettings={redirectSettings}
          editName={''}
          editKeywords={[]}
          editAnswer={''}
          editActive={true}
          editMode={false}
          id={''}
        />
      )}
    </div>
  );
};
