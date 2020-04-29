import React, { useState, useCallback }  from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import {DashboardElement} from "./DashboardElement";
import { AddComponent } from "./AddComponent";
import {Alert} from "./Alert";

import {GET_ALL_SUBREDDITS, AllSubredditsData} from "../gql/allSubredditsQuery";
import {useQuery} from "@apollo/react-hooks";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(25),
    },

}));

export const Dashboard = () => {
    const classes = useStyles();


    const { loading, error, data } = useQuery<AllSubredditsData>(GET_ALL_SUBREDDITS, {
        pollInterval: 500,
      });
    
    const [ noReddits ] = useState(getData()); 
    const [showAddComponent, setAddComponent] = useState(false);


    function getData(): boolean {
        if(data === undefined) {
        return true; 
        } else {
        return false;
        }
    }

    const redirectSettings = useCallback(() => {
        setAddComponent(false); 
        }, []);
    


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
        {noReddits && <Link href="#" onClick={() => 
                        setAddComponent(true)} 
                        color="inherit">
                                Add Subreddits now!
                        </Link> }
        </div>
    );
}