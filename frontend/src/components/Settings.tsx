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
      marginTop: theme.spacing(19),
      display: 'block',
      height: '100%',
    },
    addButton: {
      '& > *': {
        position: 'absolute',
        background: '#336699',
        right: theme.spacing(1),
        bottom: theme.spacing(1),
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
  setShowAddComponent: (newValue: boolean) => void;
  setShowRedditList: (newValue: boolean) => void;
  editingASubreddit: boolean;
  setEditingASubreddit: (newValue: boolean) => void;
  tabClick: boolean;
  handleSettingsTabClick: (newValue: boolean) => void;
};

export const Settings: FC<SettingsPrompts> = ({
  showAddComponent,
  showRedditList,
  setShowAddComponent,
  setShowRedditList,
  editingASubreddit,
  setEditingASubreddit,
  tabClick,
  handleSettingsTabClick
}) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery<AllSubredditsData>(
    GET_ALL_SUBREDDITS,
    {
      pollInterval: 500,
    },
  );

  const allSubreddits = data ? data.allSubreddits : []

  // called when adding a subreddit is finished
    const redirectSettings = useCallback(() => {
        setShowAddComponent(false);
        setShowRedditList(true);
    }, [setShowAddComponent, setShowRedditList]);

  // called add button for adding a subreddit is clicked
    const handleAddRedditClick = () => {
        if (allSubreddits.length === 3) {
            setShowAddComponent(false);
        } else {
            setShowAddComponent(true);
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
                editingASubreddit={editingASubreddit}
                setEditingASubreddit={setEditingASubreddit}
                tabClick={tabClick}
                handleSettingsTabClick={handleSettingsTabClick}
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
