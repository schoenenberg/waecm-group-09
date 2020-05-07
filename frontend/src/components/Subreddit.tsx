import React, { FC, useEffect, useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from '@material-ui/core/Link';

import { AlertDialog } from './AlertDialog';
import { AddComponent } from './AddComponent';
import { DELETE_SUBREDDIT } from './../gql/deleteSubredditMutation';

import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0.5),
      flexWrap: 'wrap',
    },
    paper: {
      maxWidth: 400,
      padding: theme.spacing(0.5),
    },
    paperInactive: {
      maxWidth: 400,
      padding: theme.spacing(0.5),
      color: '#b3cce6',
    },
  }),
);

type SubredditPrompts = {
  reddit: string;
  date: any;
  id: any;
  keywords: string[];
  active: boolean;
  answer: string;
  editingASubreddit: boolean;
  setEditingASubreddit: (newValue: boolean) => void;
  tabClick: boolean;
  handleSettingsTabClick: (newValue: boolean) => void;
};

export const Subreddit: FC<SubredditPrompts> = ({
  reddit,
  date,
  id,
  keywords,
  active,
  answer,
  editingASubreddit,
  setEditingASubreddit,
  tabClick,
  handleSettingsTabClick,
}) => {
  const classes = useStyles();
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [deleteSubreddit] = useMutation(DELETE_SUBREDDIT);
  const [edit, setEdit] = useState(false);

  const onCloseAlertDialog = () => {
    setAlertDialogOpen(false);
  };

  const deleteReddit = () => {
    deleteSubreddit({ variables: { _id: id } });
    setAlertDialogOpen(false);
  };

    useEffect(() => {
    //called when user clicks on settings tab
    if(tabClick) {
      setEdit(false);
      handleSettingsTabClick(false);
    }
  }, [tabClick])

  return (
    <div className={classes.root}>
      {!edit && !editingASubreddit && (
        <Paper
          className={active ? classes.paper : classes.paperInactive}
          elevation={3}
          id={id}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
              <Typography component="div">
                <Box fontSize="h6.fontSize" m={1}>
                  <Link
                    href="#"
                    onClick={() => {setEdit(true); setEditingASubreddit(true)}}
                    color="inherit"
                  >
                    r/{reddit}
                  </Link>
                </Box>
                <Box m={1}>Added: {date}</Box>
              </Typography>
            </Grid>
            <Grid item>
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => setAlertDialogOpen(true)}
              >
                <DeleteIcon />
              </Fab>
              {alertDialogOpen && (
                <AlertDialog
                  alertDialogOpen={alertDialogOpen}
                  onCloseDialog={onCloseAlertDialog}
                  onAcceptDialog={deleteReddit}
                  title={'Delete?'}
                  text={'Do you really want to delete this reddit?'}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      )}
      {edit && (
        <AddComponent
          onRedirectSettings={() => {setEdit(false); setEditingASubreddit(false)}}
          editName={reddit}
          editKeywords={keywords}
          editAnswer={answer}
          editActive={active}
          editMode={true}
          id={id}
        />
      )}
    </div>
  );
};
