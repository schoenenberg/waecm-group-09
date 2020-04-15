import React, { FC, /*MouseEventHandler,*/ useCallback, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { AddComponent } from "./AddComponent";
import { Subreddit } from "./Subreddit"; 

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: theme.spacing(20),
        },
        addButton: {
            "& > *": {
                position: 'absolute',
                background: "#4287f5",
                bottom: theme.spacing(5),
                right: theme.spacing(5),
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

    const [showField, setShowField] = React.useState({
    showReddit1: false, 
    showReddit2: false, 
    showReddit3: false, 
    })

    const ls: any[] =  JSON.parse(localStorage.getItem("Reddit") || "[]");

    const deleteReddit = useCallback(() => {
    ls.splice(0, 1); 
    localStorage.setItem("Reddit", JSON.stringify(ls));
    setShowField({ ...showField, ["showReddit1"]: false});
    }, []);

    const redirectSettings = useCallback(() => {
    setAddComponent(false); 
    setShowRedditList(true);
    }, []);

   const handleAddRedditClick = () => {       
       if (ls.length == 3){
        setAddComponent(false);
      } else {
        setAddComponent(true); 
        setShowRedditList(false); 
      }
   } 


    const subredditElementList = ls.map(
    index => {
        switch (ls.length) {
        case 1:
            return <Subreddit onDeleteReddit={deleteReddit}
            reddit ={index.reddit}
            date = {index.date}/>;
        case 2:
            return (
            <div>
                <Subreddit onDeleteReddit={deleteReddit}
                reddit ={ls[0].reddit}
                date = {ls[0].date}/>
                <Subreddit onDeleteReddit={deleteReddit}
                reddit ={ls[1].reddit}
                date = {ls[1].date}/>
            </div>);
        case 3:
            return (
            <div>
            <Subreddit onDeleteReddit={deleteReddit}
            reddit ={ls[0].reddit}
            date = {ls[0].date}/>
            <Subreddit onDeleteReddit={deleteReddit}
            reddit ={ls[1].reddit}
            date = {ls[1].date}/>
            <Subreddit onDeleteReddit={deleteReddit}
            reddit ={ls[2].reddit}
            date = {ls[2].date}/>
            </div>); 
        default:
            return (
            <div></div>
            );
        }
    }
    )[0];


    return (
    <div className={classes.root}>
        <div className={classes.addButton} onClick={handleAddRedditClick}>
        <Fab color="primary" aria-label="add">
            <AddIcon />
        </Fab>
        </div>
        
        {showRedditList && <div>{subredditElementList}</div>}
        {showAddComponent && <AddComponent onRedirectSettings={redirectSettings}/>}
    </div>
    );
}