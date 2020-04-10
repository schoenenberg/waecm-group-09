import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme =>({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(30),
    },

}));

export default function Settings() {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <p>These are the settings!</p>
        </div>
    );
}