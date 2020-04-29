import React, {FC, MouseEventHandler} from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { ADD_SUBREDDIT } from '../gql/addSubredditMutation'; 
import { UPDATE_SUBREDDIT } from '../gql/updateSubredditMutation'; 
import { GET_ALL_SUBREDDITS, AllSubredditsData } from "../gql/allSubredditsQuery";

import { useMutation, useQuery } from "@apollo/react-hooks";

type AddComponentPrompts = {
    onRedirectSettings: MouseEventHandler;
    editName: String;
    editKeywords: String[];
    editAnswer: String;
    editActive: boolean;
    editMode: boolean; 
    id: String; 
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      width: "90%",
      height: "100%",
      //flexWrap: "wrap",
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 2),
      "& > *": {
        margin: theme.spacing(1),   
      },
    },
    input: {
        "& > *": {
          marginTop: theme.spacing(5),
          marginLeft: theme.spacing(10),
          marginRight: theme.spacing(10),
          width: "60vw",
        },
      },
    switch: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(10),
    },
    button1: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(10),
        marginBottom: theme.spacing(5),
    },
    button2: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(10),
        marginBottom: theme.spacing(5),
    }
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
      gqlErrorState: false, 
    })

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({ ...Inputstate, [event.target.id]: event.target.value})
  };

  const handleOnSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({ ...Inputstate, [event.target.id]: event.target.checked });
  };


  const [addSubreddit, { loading: addLoading, error: addError },] = useMutation(ADD_SUBREDDIT);
  const [updateSubreddit, { loading: updateLoading, error: updateError },] = useMutation(UPDATE_SUBREDDIT); 
   const { data, refetch } = useQuery<AllSubredditsData>(GET_ALL_SUBREDDITS
  //   pollInterval: 100,
  // }
  );

  const allReddits: any[] = getData(); 

  function getData(): any[] {
    if(data === undefined) {
      return []; 
    } else {
      return data.allSubreddits;
    }
  }

  const handleSave = () => { 
      if (editMode){
        editModeSaveCheck();     
      } else {
        normalModeSaveCheck();
        //console.log(allReddits.length); 
        //console.log(allReddits);
      }
  };

  const editModeSaveCheck = () => {
    //Check if requried fields are not empty
    if (Inputstate.redditState === ""){
      setAlertState({ ...AlertState, ["emtyFieldState"]: true});
    } else if (!checkForDuplicates()){
      setAlertState({ ...AlertState, ["redditDuplicateState"]: true});
    } else {
      const UpdateSubredditInput = { 
        "name": Inputstate.redditState.toString(), 
        "active": Inputstate.active
      };
      updateSubreddit({variables: {_id: id, input: UpdateSubredditInput}}); 

      //Check if GQL error occurred
      if(updateError){
        setAlertState({ ...AlertState, ["gqlErrorState"]: true});
      } else if (updateLoading){
        console.log("loading");
      } else {
        setAlertState({ ...AlertState, ["storageState"]: true});
        refetch();
      }      
    }
  }; 

  const normalModeSaveCheck = () => {
    //Check if fields are not empty
    if(Inputstate.redditState === "" || Inputstate.keywordState === "" || Inputstate.answerState === ""){
      setAlertState({ ...AlertState, ["emtyFieldState"]: true});
    //Check for enough storage space
    } else if (allReddits.length === 3 ) {
        setAlertState({ ...AlertState, ["redditAmountState"]: true});
    //Check for duplicates
    } else if ((allReddits.length > 1) && checkForDuplicates() === false) {
        setAlertState({ ...AlertState, ["redditDuplicateState"]: true});
    } else {
        console.log(typeof new Date(Date.now()));

        //const dateOfAdding = date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString(); 

        //GQL
        const NewSubredditInput = { 
          "name": Inputstate.redditState.toString(), 
          "answer": Inputstate.answerState.toString(),
          "active": Inputstate.active,
          "keywords": Inputstate.keywordState.split(" ")
        }; 
      
        addSubreddit({ variables: { input: NewSubredditInput }});

        //Check if GQL error occurred
        if(addError){ 
          setAlertState({ ...AlertState, ["gqlErrorState"]: true});
        } else if (addLoading){
          console.log("loading");
        } else {
          setAlertState({ ...AlertState, ["storageState"]: true});
          refetch();
        }        
      }
  }

  function checkForDuplicates (): boolean{
    if (allReddits.length === 1 && allReddits[0].name === Inputstate.redditState.toString()){
        return false; 
    } else {
      for(let i = 0; i < allReddits.length; i++){
        if (allReddits.length > 0 && allReddits[i].name === Inputstate.redditState.toString()){
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
        <TextField  required id="redditState" 
                    label="Subreddit" 
                    onChange={handleOnChange}
                    defaultValue={editName}
        />
        <TextField required     
                  id="keywordState" 
                  label="Keywords"  
                  defaultValue={editKeywords} 
                  onChange={handleOnChange}
                  disabled={editMode}/>
        <TextField required 
                    id="answerState" 
                    label="Answer"  
                    defaultValue={editAnswer} 
                    onChange={handleOnChange}
                    disabled={editMode}
                    />
        </form>

        <FormGroup className={classes.switch}>
        <FormControlLabel
            control={<Switch checked={Inputstate.active} onChange={handleOnSwitchChange} color="primary" id="active" inputProps={{ "aria-label": "secondary checkbox" }} />}
            label="Active"
        />
        </FormGroup>
        {AlertState.emtyFieldState && <Alert severity="error">Fill all Fields!</Alert>}
        {AlertState.redditDuplicateState && <Alert severity="error">Subreddit already exists!</Alert>}
        {AlertState.redditAmountState && <Alert severity="error">To many Items in Storage, delete First!</Alert>}
        {AlertState.gqlErrorState && <Alert severity="error">GQL Error occured!</Alert>}
        {AlertState.storageState && <Alert severity="success">Subreddit successfully stored!</Alert>}

        <Button className={classes.button1} variant="contained" onClick={onRedirectSettings}>Cancel</Button>
        <Button className={classes.button2} variant="contained" onClick={handleSave}>Save</Button>
      </Paper>
    </div>
  );


}