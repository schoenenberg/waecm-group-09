import React, {FC, MouseEventHandler, useState} from "react";

import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";

import {AlertDialog} from "./AlertDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 2),
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  }),
);

type DeleteSubredditPrompts = {
    onDeleteReddit: MouseEventHandler;
    reddit: String,
    date: any, 
}


export const Subreddit: FC<DeleteSubredditPrompts> = ({
    onDeleteReddit,
    reddit,
    date, 
}) => {
    const classes = useStyles();
    const [alertDialogOpen,setAlertDialogOpen] = useState(false); 

return (
    <div className={classes.root}>

      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
            <Typography component="div">
                <Box fontSize="h6.fontSize"m={1}>
                    /r{reddit}
                </Box>
                <Box m={1}>
                    Added: {date}
                </Box>
            </Typography>
          </Grid>
          <Grid item>
            <Fab color="primary" aria-label="add" onClick={() => setAlertDialogOpen(true)}>
              <DeleteIcon />
            </Fab>
            {alertDialogOpen && <AlertDialog
                            onAcceptDialog={onDeleteReddit}
                            title={"Delte?"}
                            text={"Do you really want to delete this reddit?"}
            />}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
