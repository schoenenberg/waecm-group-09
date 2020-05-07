import React, { FC, MouseEventHandler, useState } from 'react';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { ADD_SUBREDDIT, NewSubredditInput } from '../gql/addSubredditMutation';
import {
  UPDATE_SUBREDDIT,
  UpdateSubredditInput,
} from '../gql/updateSubredditMutation';
import {
  GET_ALL_SUBREDDITS,
  AllSubredditsData,
} from '../gql/allSubredditsQuery';

import { useMutation, useQuery } from '@apollo/react-hooks';

type AddComponentPrompts = {
  onRedirectSettings: MouseEventHandler;
  editName: string;
  editKeywords: string[];
  editAnswer: string;
  editActive: boolean;
  editMode: boolean;
  id: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(0.5),
      '& > *': {
        width: '100%',
        height: '100%',
      },
    },
    input: {
      '& > *': {
        marginTop: '6%',
        marginLeft: '5%',
        marginRight: '5%',
        width: '90%',
      },
    },
    switch: {
      marginTop: '6%',
      marginLeft: '5%',
    },
    button1: {
      marginTop: '6%',
      marginLeft: '5%',
      marginBottom: '7%',
    },
    button2: {
      marginTop: '6%',
      marginLeft: '5%',
      marginBottom: '7%',
    },
  }),
);

export const AddComponent: FC<AddComponentPrompts> = ({
  onRedirectSettings,
  editName,
  editKeywords,
  editAnswer,
  editActive,
  editMode,
  id,
}) => {
  const classes = useStyles();

  const [inputState, setInputState] = useState({
    active: editActive,
    redditState: '',
    keywordState: '',
    answerState: '',
  });

  const [AlertState, setAlertState] = useState({
    emtyFieldState: false,
    storageState: false,
    redditAmountState: false,
    redditDuplicateState: false,
    gqlErrorState: false,
  });

  const [editedState, setEditedState] = useState({
    redditState: false,
    keywordState: false,
    answerState: false,
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //Reset all previous Alerts
    if (AlertState.emtyFieldState) {
      setAlertState({ ...AlertState, emtyFieldState: false });
    }
    if (AlertState.redditAmountState) {
      setAlertState({ ...AlertState, redditAmountState: false });
    }
    if (AlertState.redditDuplicateState) {
      setAlertState({ ...AlertState, redditDuplicateState: false });
    }
    if (AlertState.storageState) {
      setAlertState({ ...AlertState, storageState: false });
    }
    if (AlertState.gqlErrorState) {
      setAlertState({ ...AlertState, gqlErrorState: false });
    }

    //set the states depending on user input
    setInputState({ ...inputState, [event.target.id]: event.target.value });

    //change edit State
    setEditedState({ ...editedState, [event.target.id]: true });
  };

  const handleOnSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({ ...inputState, [event.target.id]: event.target.checked });
  };

  //GQL Querys and Mutations
  const [addSubreddit, { error: addError }] = useMutation<
    { newSubredditData: AllSubredditsData },
    { input: NewSubredditInput }
  >(ADD_SUBREDDIT);
  const [updateSubreddit, { error: updateError }] = useMutation<
    { updatedSubredditData: AllSubredditsData },
    { _id: string; input: UpdateSubredditInput }
  >(UPDATE_SUBREDDIT);
  const { data } = useQuery<AllSubredditsData>(GET_ALL_SUBREDDITS);

  //get all Subreddits form GQL and store it in a array
  const allSubreddits = data ? data.allSubreddits : [];

  //Handle how to handle the saving/updating of a subreddit, depending on currend mode
  const handleSave = () => {
    setAlertState({ ...AlertState, gqlErrorState: true });
    if (editMode) {
      editModeSaveCheck();
    } else {
      normalModeSaveCheck();
    }
  };

  //Validity Checks for editing a subreddit
  const editModeSaveCheck = () => {
    //Set default values to new input values
    if (inputState.redditState !== '') {
      editName = inputState.redditState;
    }
    if (inputState.keywordState !== '') {
      editKeywords = inputState.keywordState.split(' ');
    }
    if (inputState.answerState !== '') {
      editAnswer = inputState.answerState;
    }

    //Check if input field is empty
    if (
      (editedState.redditState && inputState.redditState.length === 0) ||
      (editedState.answerState && inputState.answerState.length === 0) ||
      (editedState.keywordState &&
        inputState.keywordState.toString().length === 0)
    ) {
      setAlertState({ ...AlertState, emtyFieldState: true });
      //Check for duplicates
    } else if (!checkForDuplicates()) {
      setAlertState({ ...AlertState, redditDuplicateState: true });
    } else {
      const updateSubredditInput = {
        name: editName,
        active: inputState.active,
        answer: editAnswer,
        keywords: editKeywords,
      };

      //Update the subreddit and check if it returns an error
      updateSubreddit({ variables: { _id: id, input: updateSubredditInput } })
        .then(() => setAlertState({ ...AlertState, storageState: true }))
        .catch(() => {});
    }
  };

  //Validity Checks for adding a new subreddit
  const normalModeSaveCheck = () => {
    //Check if fields are not empty
    if (
      inputState.redditState.length < 2 ||
      inputState.keywordState.toString().length < 2 ||
      inputState.answerState.length < 2
    ) {
      setAlertState({ ...AlertState, emtyFieldState: true });
      //Check for enough storage space
    } else if (allSubreddits.length === 3) {
      setAlertState({ ...AlertState, redditAmountState: true });
      //Check for duplicates
    } else if (allSubreddits.length > 0 && !checkForDuplicates()) {
      setAlertState({ ...AlertState, redditDuplicateState: true });
    } else {
      const newSubredditInput = {
        name: inputState.redditState.toString(),
        active: inputState.active,
        answer: inputState.answerState.toString(),
        keywords: inputState.keywordState.split(' '),
        createdOn: new Date(),
      };

      addSubreddit({ variables: { input: newSubredditInput } })
        .then(() => setAlertState({ ...AlertState, storageState: true }))
        .catch(() => {});
    }
  };

  //Check if the subreddit already exists
  function checkForDuplicates(): boolean {
    if (allSubreddits.length === 0) {
      return false;
    } else {
      for (let i = 0; i < allSubreddits.length; i++) {
        if (
          allSubreddits.length > 0 &&
          allSubreddits[i].name === inputState.redditState.toString() &&
          !(allSubreddits[i]._id === id)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <div className={classes.paper}>
      <Paper elevation={3}>
        <form className={classes.input} noValidate autoComplete="off">
          <TextField
            required
            id="redditState"
            label="Subreddit"
            onChange={handleOnChange}
            defaultValue={editName}
          />
          <TextField
            required
            id="keywordState"
            label="Keywords"
            defaultValue={editKeywords}
            onChange={handleOnChange}
          />
          <TextField
            required
            id="answerState"
            label="Answer"
            defaultValue={editAnswer}
            onChange={handleOnChange}
          />
        </form>
        <FormGroup className={classes.switch}>
          <FormControlLabel
            control={
              <Switch
                checked={inputState.active}
                onChange={handleOnSwitchChange}
                color="primary"
                id="active"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
            label="Active"
          />
        </FormGroup>
        {AlertState.emtyFieldState && (
          <Alert severity="error">
            All fields musst be filled and the input must be longer or equal to
            2!
          </Alert>
        )}
        {AlertState.redditDuplicateState && (
          <Alert severity="error">Subreddit already exists!</Alert>
        )}
        {AlertState.redditAmountState && (
          <Alert severity="error">
            To many Items in Storage, delete first!
          </Alert>
        )}
        {AlertState.gqlErrorState && addError && (
          <Alert severity="error"> {addError.message}</Alert>
        )}
        {AlertState.gqlErrorState && updateError && (
          <Alert severity="error"> {updateError.message}</Alert>
        )}
        {AlertState.storageState && (
          <Alert severity="success">Subreddit successfully stored!</Alert>
        )}

        <Button
          className={classes.button1}
          variant="contained"
          onClick={onRedirectSettings}
        >
          Cancel
        </Button>
        <Button
          className={classes.button2}
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </Paper>
    </div>
  );
};
