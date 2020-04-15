import React, {FC, MouseEventHandler} from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button } from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

type AddComponentPrompts = {
    onRedirectSettings: MouseEventHandler;
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
}) => {

  const classes = useStyles();

  const [Inputstate, setInputState] = React.useState({
    active: true,
    redditState: "",
    keywordState: "",
    answerState: ""
  });

  const [AlertState, setAlertState] = React.useState({
      emtyFieldState: false,
      storageState: false,
      redditAmountState: false,
      redditDuplicateState: false, 
    })

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({ ...Inputstate, [event.target.id]: event.target.value})
  };

  const ls: any[] =  JSON.parse(localStorage.getItem("Reddit") || "[]");

  function checkForDuplicates (): boolean{
    for(let i = 0; i < ls.length; i++){
        if (ls.length > 0 && ls[i].reddit === Inputstate.redditState.toString()){
            return false;
        }         
    }
    return true; 
  }

    const handleSave = () => {

        //TODO: Change to Graph QL
        //Check for empty fiels
        if(Inputstate.redditState === "" || Inputstate.keywordState === "" || Inputstate.answerState === ""){
            setAlertState({ ...AlertState, ["emtyFieldState"]: true});
        //Check for enough storage space
        } else if (ls.length === 3 ) {
            setAlertState({ ...AlertState, ["redditAmountState"]: true});
        //Check for duplicates
        } else if ((ls.length > 1) && checkForDuplicates() === false) {
            setAlertState({ ...AlertState, ["redditDuplicateState"]: true});
        } else {

            const date = new Date();
            const dateOfAdding = date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString();

            //check if storage already contains reddit 
            const newReddit = JSON.parse('{ "ID":' + '"' + ls.length + '"' 
            + ', "reddit":'+ '"' + Inputstate.redditState.toString() + '"' 
            + ', "answer":'+ '"' + Inputstate.answerState.toString() + '"'
            + ', "keyword":'+ '"' + Inputstate.keywordState.toString() + '"'
            + ', "active":'+ '"' + Inputstate.active.toString() + '"'
            + ', "date":'+ '"' + dateOfAdding + '"'
            + '}');

            ls.push(newReddit);
            if (ls.length > 0){
              localStorage.removeItem("Reddit"); 
            }
            
            localStorage.setItem("Reddit", JSON.stringify(ls)); 

            setAlertState({ ...AlertState, ["storageState"]: true});
        }
    };
 

  return (
    <div className={classes.paper}>
      <Paper elevation={3}>
        <form className={classes.input} noValidate autoComplete="off">
        <TextField  required id="redditState" 
                    label="Subreddit" 
                    onChange={handleOnChange}
        />
        <TextField required id="keywordState" label="Keywords"  onChange={handleOnChange}/>
        <TextField required id="answerState" label="Answer"  onChange={handleOnChange}/>
        </form>

        <FormGroup className={classes.switch}>
        <FormControlLabel
            control={<Switch checked={Inputstate.active} onChange={handleOnChange} color="primary" id="active" inputProps={{ "aria-label": "secondary checkbox" }} />}
            label="Active"
        />
        </FormGroup>
        {AlertState.emtyFieldState && <Alert severity="error">Fill all Fields!</Alert>}
        {AlertState.redditDuplicateState && <Alert severity="error">Subreddit already exists!</Alert>}
        {AlertState.redditAmountState && <Alert severity="error">To many Items in Storage, delete First!</Alert>}
        {AlertState.storageState && <Alert severity="success">Subreddit successfully stored!</Alert>}

        <Button className={classes.button1} variant="contained" onClick={onRedirectSettings}>Cancel</Button>
        <Button className={classes.button2} variant="contained" onClick={handleSave}>Save</Button>
      </Paper>
    </div>
  );


}