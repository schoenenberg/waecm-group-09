import React, {FC, useState} from "react";

import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import Link from '@material-ui/core/Link';

import {AlertDialog} from "./AlertDialog";
import { AddComponent } from "./AddComponent";
import { DELETE_SUBREDDIT } from "./../gql/deleteSubredditMutation";

import { useMutation } from "@apollo/react-hooks";

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
    paperInactive: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
      //background: '#b3cce6',
      color: '#b3cce6'  
    },
  }),
);

type SubredditPrompts = {
    reddit: String,
    date: any,
    id: any, 
    keywords: String[]; 
    active: boolean; 
    answer: String; 
}

export const Subreddit: FC<SubredditPrompts> = ({
    reddit,
    date, 
    id, 
    keywords,
    active,
    answer,
}) => {
    const classes = useStyles();
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [showAddComponent, setAddComponent] = useState(false);

    const [deleteSubreddit] = useMutation(DELETE_SUBREDDIT);
    

    const onCloseAlertDialog = () => {
      setAlertDialogOpen(false);
    };

    const deleteReddit = () => { 
      console.log(id); 
      deleteSubreddit({ variables: { _id: id }});
      setAlertDialogOpen(false);
      }; 


return (
    <div className={classes.root}>

      <Paper className={active ? classes.paper : classes.paperInactive} elevation={3} id={id}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
            <Typography component="div">
                <Box fontSize="h6.fontSize"m={1}>
                <Link href="#" onClick={() => setAddComponent(true)} color="inherit">
                  r/{reddit}
                </Link>
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
            {alertDialogOpen && (<AlertDialog
                                alertDialogOpen ={alertDialogOpen}
                                onCloseAlertDialog={onCloseAlertDialog}
                                onAcceptDialog={deleteReddit}
                                title={"Delte?"}
                                text={"Do you really want to delete this reddit?"}
                            />)}
          </Grid>
        </Grid>
      </Paper>
      {showAddComponent && <AddComponent 
                    onRedirectSettings={() => setAddComponent(false)}
                    editName= {reddit}
                    editKeywords= {keywords}
                    editAnswer= {answer}
                    editActive= {active}
                    editMode= {true}
                    id={id}/>}
    </div>
  );
}
