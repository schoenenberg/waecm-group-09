import React, { FC } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import { DashboardElement } from './DashboardElement';
import { AddComponent } from './AddComponent';
import { Alert } from './Alert';

import {
  GET_ALL_SUBREDDITS,
  AllSubredditsData,
} from '../gql/allSubredditsQuery';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(27),
    display: 'block',
    height: '100%',
  },
  link:{
    color: "#FFFFFF"
  }
}));

type DashboardProps = {
  showAddComponent: boolean;
  setAddComponent: (newValue: boolean) => void;
  noReddits: boolean;
};

export const Dashboard: FC<DashboardProps> = ({
  showAddComponent,
  setAddComponent,
  noReddits,
}) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery<AllSubredditsData>(
    GET_ALL_SUBREDDITS,
    {
      pollInterval: 500,
    },
  );

  const redirectSettings = () => {
    setAddComponent(false);
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
        <Alert title={'Error'}>Unauthorized</Alert>
      ) : (
        data &&
        !showAddComponent && (
          <div>
            {data.allSubreddits.map((elem) => (
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
          <Link href="#" onClick={() => setAddComponent(true)} className={classes.link}>
            <strong> Add Subreddits now! </strong>
          </Link>
      )}
    </div>
  );
};
