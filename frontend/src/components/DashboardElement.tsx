import React, {FC} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import ChatIcon from '@material-ui/icons/Chat';
import {Grid, Link} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "#80d8ff"
    },
}));

type DashboardElemProps = {
    name: string;
    description: string;
    icon: string;
    number_answers: number;
    url: string;
};

export const DashboardElement: FC<DashboardElemProps> =  ({name, description, icon, number_answers, url}) =>{
    const classes = useStyles();
    const color = "#80d8ff";

    return (

            <div className={classes.root}>
                <Box
                    display="flex"
                    alignItems="center"
                    p={1}
                    m={1}
                    bgcolor="#80d8ff"
                    width={3/4}
                >
                    <Box p={1} bgcolor={color} width={1/4}>
                        <img src={icon} width="70%" height="70%"/>
                    </Box>
                    <Box p={1} bgcolor={color} width={1/2}>
                            <Link
                                component="button"
                                variant="body1"
                                onClick={() => {
                                    window.open(url, '_blank');
                                }}
                            >
                                {name}
                            </Link>
                        {description}
                    </Box>
                    <Box p={1} bgcolor={color} width={1/4}>
                        <Grid container spacing={3} className={classes.paper}>
                            <Grid item xs={12} >
                                <ChatIcon/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} className={classes.paper}>
                            <Grid item xs={12}>
                                {number_answers}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
    );
}
