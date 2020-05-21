import React, { FC } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import { DashboardElement } from './DashboardElement';
import { AddComponent } from './AddComponent';
import { AlertWithTitle } from './AlertWithTitle';

import {
  GET_ALL_SUBREDDITS,
  AllSubredditsData,
} from '../gql/allSubredditsQuery';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(19),
    display: 'block',
    height: '100%',
  },
  link: {
    color: '#FFFFFF',
  },
}));

type DashboardProps = {
  showAddComponent: boolean;
  setShowAddComponent: (newValue: boolean) => void;
  noReddits: boolean;
};

export const Dashboard: FC<DashboardProps> = ({
  showAddComponent,
  setShowAddComponent,
  noReddits,
}) => {
  const classes = useStyles();

  // query to get all subreddit data from db
  const { loading, error, data } = useQuery<AllSubredditsData>(
    GET_ALL_SUBREDDITS,
    {
      pollInterval: 500,
    },
  );

  // called when adding a component is finished
  const redirectSettings = () => {
    setShowAddComponent(false);
  };

  return (
    <div className={classes.root}>
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
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <AlertWithTitle title={'Error'}>Unauthorized</AlertWithTitle>
      ) : (
        data &&
        !showAddComponent && (
          <div>
            {data.allSubreddits.map(elem => (
              <DashboardElement
                name={elem.name}
                description={elem.description}
                icon={elem.icon}
                number_answers={elem.answeredCommentIDs.length}
              />
            ))}
          </div>
        )
      )}
      {noReddits && !showAddComponent && (
        <Link
          href="#"
          onClick={() => setShowAddComponent(true)}
          className={classes.link}
        >
          <strong> Add Subreddits now! </strong>
        </Link>
      )}
    </div>
  );
};
