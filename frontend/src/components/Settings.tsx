import React, { FC, /*MouseEventHandler,*/ useCallback, useState } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { AddComponent } from "./AddComponent";
import { Subreddit } from "./Subreddit"; 
import { Alert } from "./Alert"
import { GET_ALL_SUBREDDITS, AllSubredditsData } from "../gql/allSubredditsQuery";

import { useQuery } from "@apollo/react-hooks";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: theme.spacing(20),
            display: 'block',
            height: '100%',
            background: '#fffff'
        },
        addButton: {
            "& > *": {
                position: 'absolute',
                background: "#336699",
                bottom: theme.spacing(3),
                right: theme.spacing(3),
            },
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }),
);

 type SettingsPrompts = {
    // onShowSettings: MouseEventHandler; 
 }; 

export const Settings: FC<SettingsPrompts> = ({
    //onShowSettings,
}) => {
    const classes = useStyles();
    const [showAddComponent, setAddComponent] = useState(false);
    const [showRedditList, setShowRedditList] = useState(true); 

    const {loading, error, data } = useQuery<AllSubredditsData>(GET_ALL_SUBREDDITS, {
        pollInterval: 500,
      });

    
    const allReddits: any[] = getData(); 
    const date: any = new Date(Date.now());

    function getData(): any[] {
        if(data === undefined) {
          return []; 
        } else {
          return data.allSubreddits;
        }
    }

    const redirectSettings = useCallback(() => {
    setAddComponent(false); 
    setShowRedditList(true);
    }, []);

   const handleAddRedditClick = () => {     
       if (allReddits.length == 3){
        setAddComponent(false);
      } else {
        setAddComponent(true); 
        setShowRedditList(false); 
      }
   } 

    return (
    <div className={classes.root}>
        {showAddComponent && <AddComponent 
                    onRedirectSettings={redirectSettings}
                    editName= {""}
                    editKeywords= {[]}
                    editAnswer= {""}
                    editActive= {true}
                    editMode= {false}
                    id={""}/>}
        <div className={classes.addButton} onClick={handleAddRedditClick}>
        <Fab color="primary" aria-label="add">
            <AddIcon />
        </Fab>
        </div>
        
        {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <Alert title={"Error"}>Unauthorized</Alert>
            ) :  data && showRedditList && (<div>{data.allSubreddits.map((elem) => (<Subreddit 
                 reddit ={elem.name}
                 date = {date}
                 id = {elem._id}
                 keywords = {elem.keywords}
                 answer = {elem.answer}
                 active = {elem.active}
                 />))}</div>)}
    </div>
    );
}