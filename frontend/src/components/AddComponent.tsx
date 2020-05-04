import React, { FC, MouseEventHandler } from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { ADD_SUBREDDIT } from "../gql/addSubredditMutation";
import { UPDATE_SUBREDDIT } from "../gql/updateSubredditMutation";
import {
  GET_ALL_SUBREDDITS,
  AllSubredditsData
} from "../gql/allSubredditsQuery";

import { useMutation, useQuery } from "@apollo/react-hooks";

type AddComponentPrompts = {
  onRedirectSettings: MouseEventHandler;
  editName: String;
  editKeywords: String[];
  editAnswer: String;
  editActive: boolean;
  editMode: boolean;
  id: String;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      width: "90%",
      height: "100%",
      flexWrap: "wrap",
      //flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 2),
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    input: {
      "& > *": {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        width: "60vw"
      }
    },
    switch: {
      marginTop: theme.spacing(5),
      marginLeft: theme.spacing(10)
    },
    button1: {
      marginTop: theme.spacing(5),
      marginLeft: theme.spacing(10),
      marginBottom: theme.spacing(5)
    },
    button2: {
      marginTop: theme.spacing(5),
      marginLeft: theme.spacing(10),
      marginBottom: theme.spacing(5)
    }
  })
);

export const AddComponent: FC<AddComponentPrompts> = ({
  onRedirectSettings,
  editName,
  editKeywords,
  editAnswer,
  editActive,
  editMode,
  id
}) => {
  const classes = useStyles();

  const [Inputstate, setInputState] = React.useState({
    active: editActive,
    redditState: "",
    keywordState: "",
    answerState: ""
  });

  const [AlertState, setAlertState] = React.useState({
    emtyFieldState: false,
    storageState: false,
    redditAmountState: false,
    redditDuplicateState: false,
    gqlErrorState: false
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //Reset all previous Alerts
    if (AlertState.emtyFieldState) {
      setAlertState({ ...AlertState, ["emtyFieldState"]: false });
    }
    if (AlertState.redditAmountState) {
      setAlertState({ ...AlertState, ["redditAmountState"]: false });
    }
    if (AlertState.redditDuplicateState) {
      setAlertState({ ...AlertState, ["redditDuplicateState"]: false });
    }
    if (AlertState.gqlErrorState) {
      setAlertState({ ...AlertState, ["gqlErrorState"]: false });
    }
    if (AlertState.storageState) {
      setAlertState({ ...AlertState, ["storageState"]: false });
    }

    //set the states depending on user input
    setInputState({ ...Inputstate, [event.target.id]: event.target.value });
  };

  const handleOnSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({ ...Inputstate, [event.target.id]: event.target.checked });
  };

  //GQL Querys and Mutations
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);
  const [updateSubreddit] = useMutation(UPDATE_SUBREDDIT);
  const { data } = useQuery<AllSubredditsData>(GET_ALL_SUBREDDITS);

  //get all Subreddits form GQL and store it in a array
  const allReddits: any[] = getData();

  function getData(): any[] {
    if (data === undefined) {
      return [];
    } else {
      return data.allSubreddits;
    }
  }

  //Handle how to handle the saving/updating of a subreddit, depending on currend mode
  const handleSave = () => {
    if (editMode) {
      editModeSaveCheck();
    } else {
      normalModeSaveCheck();
    }
  };

  //Validity Checks for editing a subreddit
  const editModeSaveCheck = () => {
    console.log(id);
    //Check if requried fields are not empty
    if (Inputstate.redditState != "") {
      setAlertState({ ...AlertState, ["emtyFieldState"]: true });
      editName = Inputstate.redditState;
    }
    //Check for duplicates
    if (!checkForDuplicates()) {
      setAlertState({ ...AlertState, ["redditDuplicateState"]: true });
    } else {
      const UpdateSubredditInput = {
        name: editName,
        active: Inputstate.active
      };

      //Update the subreddit and check if it returns an error
      updateSubreddit({
        variables: { _id: id, input: UpdateSubredditInput }
      }).catch(err => {
        setAlertState({ ...AlertState, ["gqlErrorState"]: true });
        console.error("does not exist error " + err);
      });

      if (!AlertState.gqlErrorState) {
        setAlertState({ ...AlertState, ["storageState"]: true });
      }
    }
  };

  //Validity Checks for adding a new subreddit
  const normalModeSaveCheck = () => {
    //Check if fields are not empty
    if (
      Inputstate.redditState === "" ||
      Inputstate.keywordState === "" ||
      Inputstate.answerState === ""
    ) {
      setAlertState({ ...AlertState, ["emtyFieldState"]: true });
      //Check for enough storage space
    } else if (allReddits.length === 3) {
      setAlertState({ ...AlertState, ["redditAmountState"]: true });
      //Check for duplicates
    } else if (allReddits.length > 0 && !checkForDuplicates()) {
      setAlertState({ ...AlertState, ["redditDuplicateState"]: true });
    } else {
      //const dateOfAdding = date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString();

      const NewSubredditInput = {
        name: Inputstate.redditState.toString(),
        active: Inputstate.active,
        answer: Inputstate.answerState.toString(),
        keywords: Inputstate.keywordState.split(" ")
      };

      addSubreddit({ variables: { input: NewSubredditInput } }).catch(err => {
        setAlertState({ ...AlertState, ["gqlErrorState"]: true });
        console.error("does not exist error " + err);
      });

      //wait for some second to see if error occures
      setTimeout(() => {
        if (!AlertState.gqlErrorState) {
          setAlertState({ ...AlertState, ["storageState"]: true });
        }
      }, 3000);
    }
  };

  //Check if the subreddit already exists
  function checkForDuplicates(): boolean {
    if (
      allReddits.length === 0 &&
      allReddits[0].name === Inputstate.redditState.toString()
    ) {
      return false;
    } else {
      for (let i = 0; i < allReddits.length; i++) {
        if (
          allReddits.length > 0 &&
          allReddits[i].name === Inputstate.redditState.toString() &&
          !(allReddits[i].id == id)
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
            disabled={editMode}
          />
          <TextField
            required
            id="answerState"
            label="Answer"
            defaultValue={editAnswer}
            onChange={handleOnChange}
            disabled={editMode}
          />
        </form>

        <FormGroup className={classes.switch}>
          <FormControlLabel
            control={
              <Switch
                checked={Inputstate.active}
                onChange={handleOnSwitchChange}
                color="primary"
                id="active"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            }
            label="Active"
          />
        </FormGroup>
        {AlertState.emtyFieldState && (
          <Alert severity="error">Fill all Fields!</Alert>
        )}
        {AlertState.redditDuplicateState && (
          <Alert severity="error">Subreddit already exists!</Alert>
        )}
        {AlertState.redditAmountState && (
          <Alert severity="error">
            To many Items in Storage, delete First!
          </Alert>
        )}
        {AlertState.gqlErrorState && (
          <Alert severity="error">The subreddit does not exist!</Alert>
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
