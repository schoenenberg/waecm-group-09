import React, {FC, MouseEventHandler} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {UserInformation} from "./UserInformation";
import {Box, Tab, Tabs} from "@material-ui/core";
import PropTypes from 'prop-types';
import Settings from "./Settings";
import Dashboard from "./Dashboard";
import {AlertDialog} from "./AlertDialog";

type NavigationProps = {
    onLogout: MouseEventHandler;
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const MenuAppBar: FC<NavigationProps> =  ({onLogout}) => {
    const classes = useStyles(); // defines styles for the class
    const [value, setValue] = React.useState(0); // value of the tab (either settings or dashboard


    const handleChange = (_event: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                   <Typography variant="h6" className={classes.title}>
                        <UserInformation />
                    </Typography>
                    <IconButton color="inherit">
                        <AlertDialog
                            buttonOpenText={"Logout"}
                            onAcceptDialog={onLogout}
                            title={"Logout?"}
                            text={"Do you really want to log out?"}
                        />
                    </IconButton>
                </Toolbar>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Settings" {...a11yProps(0)}/>
                    <Tab label="Dashboard" {...a11yProps(1)}/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                  <Settings/>

            </TabPanel>
            <TabPanel value={value} index={1}>
                <Dashboard/>
            </TabPanel>
        </div>
    );
}