import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {DashboardElement} from "./DashboardElement";
import {useQuery} from "@apollo/react-hooks";
import {GET_ALL_SUBREDDITS, AllSubredditsData} from "../gql/subredditQuery";
import {Alert} from "./Alert";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(25),
    },

}));

export const Dashboard = () => {
    const classes = useStyles();

    const { loading, error, data } = useQuery<AllSubredditsData>(GET_ALL_SUBREDDITS);

    return (

        <div className={classes.root}>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <Alert title={"Error"}>Unauthorized</Alert>
            ) :  data && (<div>{data.allSubreddits.map((elem) => (<DashboardElement
                name={elem.name}
                description={elem.description}
                icon={elem.icon}
                number_answers={elem.answerCount}
                url={elem.answer}
            />))}</div>)}
        </div>
    );
}