import React, {FC} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));

type DashboardElemProps = {
    name: string;
    description: string;
    icon: string;
    number_answers: number;
};

export const DashboardElement: FC<DashboardElemProps> =  ({name, description, icon, number_answers}) =>{
    const classes = useStyles();
    const color = "80d8ff";

    return (
            <div className={classes.root}>
                <Box
                    display="flex"
                    alignItems="center"
                    p={1}
                    m={1}
                    bgcolor="#80d8ff"
                >
                    <Box p={1} bgcolor={color}>
                        {icon}
                    </Box>
                    <Box p={1} bgcolor={color}>
                        <p>{name}</p>
                        <p>{description}</p>
                    </Box>
                    <Box p={1} bgcolor={color}>
                        <ChatIcon/>
                        {number_answers}
                    </Box>
                </Box>
            </div>
    );
}
