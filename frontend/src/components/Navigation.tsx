import React, {
    FC,
    MouseEventHandler,
    ReactNode, useEffect,
    /* useCallback,*/ useState,
} from 'react';

import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {UserInformation} from "./UserInformation";
import {Box, Tab, Tabs} from "@material-ui/core";

import {Settings} from "./Settings";
import {AlertDialog} from "./AlertDialog";
import {PrimaryButton} from "./PrimaryButton";
import {Dashboard} from "./Dashboard";
import {useQuery} from "@apollo/react-hooks";
import {AllSubredditsData, GET_ALL_SUBREDDITS} from "../gql/allSubredditsQuery";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        background: "#336699"
    }
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
};

type TabPanelProps = {
  children?: ReactNode;
  value: number;
  index: number;
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type MenuAppBarProps = {
  onLogout: MouseEventHandler;
};

export const MenuAppBar: FC<MenuAppBarProps> = ({onLogout}) => {

    // query to get all subrredit data
    const {loading, error, data} = useQuery<AllSubredditsData>(
        GET_ALL_SUBREDDITS,
        {
            pollInterval: 500
        }
    );

    const classes = useStyles(); // defines styles for the class
    const [value, setValue] = React.useState(0); // value of the tab (either settings or dashboard
    const [showSettingsComponent, setSettingsComponent] = useState(true);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [showAddComponent, setAddComponent] = useState(false);
    const [showAddComponentDashboard, setAddComponentDashboard] = useState(false);
    const [showRedditList, setShowRedditList] = useState(true);

    useEffect(() => {
        if(!error && !loading) {
            setNoReddits(allReddits.length === 0);
        }
    }, [data, error, loading])

    const getData = (): any[]  => {
        if (data === undefined) {
            return [];
        } else {
            return data.allSubreddits;
        }
    }

    const allReddits: any[] = getData();
    const [noReddits, setNoReddits] = useState(allReddits.length === 0);


    // called when clicked on a tab (also when clicked on same tab)
    const handleTabClick = () => {
        handleSetAddComponentDashboard(false);
        if (allReddits.length === 0) {
            setNoReddits(true);
        } else {
            setNoReddits(false);
        }
    }
  };

  // called when the tab value changes
  const handleChange = (
    _event: any,
    newValue: React.SetStateAction<number>,
  ) => {
    setValue(newValue);
    handleSetAddComponentSettings(false);
    handleSetAddComponentDashboard(false);
    handleSetEditComponent(false);
    handleShowRedditList(true);
    handleSetAddComponentDashboard(false);
    if (newValue === 0) {
      setSettingsComponent(true);
    }
  };

  const onCloseAlertDialog = () => {
    setAlertDialogOpen(false);
  };

  const handleSetAddComponentSettings = (newValue: boolean) => {
    setAddComponent(newValue);
  };

  const handleSetAddComponentDashboard = (newValue: boolean) => {
    setAddComponentDashboard(newValue);
  };

  const handleSetEditComponent = (newValue: boolean) => {
    setShowEditComponent(newValue);
  };

  const handleShowRedditList = (newValue: boolean) => {
    setShowRedditList(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <UserInformation />
          </Typography>
          <IconButton color="inherit">
            <PrimaryButton onClickHandler={() => setAlertDialogOpen(true)}>
              Logout
            </PrimaryButton>
            {alertDialogOpen && (
              <AlertDialog
                alertDialogOpen={alertDialogOpen}
                onCloseAlertDialog={onCloseAlertDialog}
                onAcceptDialog={onLogout}
                title={'Logout?'}
                text={'Do you really want to log out?'}
              />
            )}
          </IconButton>
        </Toolbar>
        <Tabs
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          onClick={handleTabClick}
        >
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Settings" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Dashboard
          showAddComponent={showAddComponentDashboard}
          setAddComponent={handleSetAddComponentDashboard}
          noReddits={noReddits}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {showSettingsComponent && (
          <Settings
            showAddComponent={showAddComponent}
            setAddComponent={handleSetAddComponentSettings}
            setShowRedditList={handleShowRedditList}
            showRedditList={showRedditList}
            showEditComponent={showEditComponent}
            setShowEditComponent={setShowEditComponent}
          />
        )}
      </TabPanel>
    </div>
  );
};
