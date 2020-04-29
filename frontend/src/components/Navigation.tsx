import React, {FC, MouseEventHandler, ReactNode,/* useCallback,*/ useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {UserInformation} from "./UserInformation";
import {Box, Tab, Tabs} from "@material-ui/core";


import { Settings } from "./Settings";
import {AlertDialog} from "./AlertDialog";
import {PrimaryButton} from "./PrimaryButton";
import {Dashboard} from "./Dashboard";



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

const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) => {

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

type TabPanelProps = {
    children?: ReactNode,
    value: number,
    index: number
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

type MenuAppBarProps = {
    onLogout: MouseEventHandler;
};

export const MenuAppBar: FC<MenuAppBarProps> =  ({onLogout}) => {
    const classes = useStyles(); // defines styles for the class
    const [value, setValue] = React.useState(0); // value of the tab (either settings or dashboard
    const [showSettingsComponent, setSettingsComponent] = useState(true);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);

    const [showAddComponent, setAddComponent] = useState(false);
    const [showRedditList, setShowRedditList] = useState(true);

    const handleChange = (_event: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
        handleSetAddComponent(false);
        handleShowRedditList(true);
        if (newValue === 0){
            setSettingsComponent(true);
        }
    };

    const onCloseAlertDialog = () => {
        setAlertDialogOpen(false);
    };

    const handleSetAddComponent = (newValue: boolean) => {
        setAddComponent(newValue)
    };

    const handleShowRedditList = (newValue: boolean) => {
        setShowRedditList(newValue)
    };

    /*const showSettings = useCallback(() => {
        setSettingsComponent(false); 
    }, []);*/

    return (
        <div className={classes.root}>
            <AppBar position="fixed" >
                <Toolbar >
                   <Typography variant="h6" className={classes.title}>
                        <UserInformation />
                    </Typography>
                    <IconButton color="inherit">
                        <PrimaryButton
                                onClickHandler={() =>setAlertDialogOpen(true)}>
                                Logout
                        </PrimaryButton>
                        {alertDialogOpen && (<AlertDialog
                                alertDialogOpen ={alertDialogOpen}
                                onCloseAlertDialog={onCloseAlertDialog}
                                onAcceptDialog={onLogout}
                                title={"Logout?"}
                                text={"Do you really want to log out?"}
                            />)}
                    </IconButton>
                </Toolbar>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Dashboard" {...a11yProps(0)}/>
                    <Tab label="Settings" {...a11yProps(1)}/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Dashboard/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                  {showSettingsComponent &&
                <Settings showAddComponent = {showAddComponent}  setAddComponent={handleSetAddComponent} setShowRedditList ={handleShowRedditList} showRedditList={showRedditList} /*onShowSettings={showSettings}*//>}
            </TabPanel>
        </div>
    );
}
