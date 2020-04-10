import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {DashboardElement} from "./DashboardElement";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(30),
    },

}));

export const Dashboard = () => {
    const classes = useStyles();

    //mockdata

    const mocks = [];
    mocks.push({
        name: "/r/react.js",
        description: "The front page of react",
        icon: "blabla",
        number_answers: 1000
    });
    mocks.push({
        name: "/r/Angular2",
        description: "Angular 2+",
        icon: "blabla",
        number_answers: 1000
    });
    const data ={mocks
    }

    return (
        <div className={classes.root}>
            <p>This is the dashboard</p>
            {data.mocks.map((elem) => (
                <DashboardElement
                    name={elem.name}
                    description={elem.description}
                    icon={elem.icon}
                    number_answers={elem.number_answers}
                />
            ))}/>
        </div>
    );
}