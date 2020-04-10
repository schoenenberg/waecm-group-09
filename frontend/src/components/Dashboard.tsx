import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(30),
    },

}));

export default function Dashboard() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <p>This is the dashboard</p>
        </div>
    );
}