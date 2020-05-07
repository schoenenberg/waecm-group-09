import React, {
  FC,
  MouseEventHandler,
  ReactNode, useEffect,
  /* useCallback,*/ useState,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { UserInformation } from './UserInformation';
import { Box, Tab, Tabs } from '@material-ui/core';

import { Settings } from './Settings';
import { AlertDialog } from './AlertDialog';
import { PrimaryButton } from './PrimaryButton';
import { Dashboard } from './Dashboard';
import { useQuery } from '@apollo/react-hooks';
import {
  AllSubredditsData,
  GET_ALL_SUBREDDITS,
} from '../gql/allSubredditsQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(0),
  },
  toolBar: {
    padding: theme.spacing(0),
  },
  toolBar: {
    padding: theme.spacing(0),
  },
  appBar: {
    background: '#336699',
    padding: theme.spacing(0),
  },
}));

const TabPanel: FC<TabPanelProps> = ({ children, value, tabIndex, ...other }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== tabIndex}
      id={`tabpanel-${tabIndex}`}
      aria-labelledby={`tab-${tabIndex}`}
      {...other}
    >
      {value === tabIndex && <Box p={3}>{children}</Box>}
    </Typography>
  );

};

type TabPanelProps = {
  children?: ReactNode;
  value: number;
  tabIndex: number;
};

const tabProps = (tabIndex: number) => {
  return {
    id: `tab-${tabIndex}`,
    'aria-controls': `tabpanel-${tabIndex}`,
  };
}

type MenuAppBarProps = {
  onLogout: MouseEventHandler;
};

export const MenuAppBar: FC<MenuAppBarProps> = ({ onLogout }) => {
  // query to get all subrredit data
  const { loading, error, data } = useQuery<AllSubredditsData>(
    GET_ALL_SUBREDDITS,
    {
      pollInterval: 500,
    },
  );

  const classes = useStyles(); // defines styles for the class
  const [value, setValue] = React.useState(0); // value of the tab (either settings or dashboard)
  const [showSettingsComponent, setShowSettingsComponent] = useState(true);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false); // when alert ist triggered, then alert is set viewable
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [showAddComponentDashboard, setShowAddComponentDashboard] = useState(false);
  const [editingASubreddit, setEditingASubreddit] = useState(false); // settings component can be in two states, either a subreddit is edited or the subreddit list is displayed
  const [showRedditList, setShowRedditList] = useState(true);
  const allSubreddits = data ? data.allSubreddits : []

  // check if subreddits exist
  useEffect(() => {
    if(!error && !loading) {
      setNoReddits(allSubreddits.length === 0);
    }
  }, [data, error, loading])


  const [noReddits, setNoReddits] = useState(allSubreddits.length === 0);
  const [tabClick, setTabClick] = useState(false);


  // called when clicked on a tab (also when clicked on same tab)
  const handleTabClick = () => {
    setTabClick(true);
    handleSetAddComponentDashboard(false);
    handleSetEditComponent(false);
    if (allSubreddits.length === 0) {
      setNoReddits(true);
    } else {
      setNoReddits(false);
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
      setShowSettingsComponent(true);
    }
  };

  const onCloseAlertDialog = () => {
    setAlertDialogOpen(false);
  };

  const handleSetAddComponentSettings = (newValue: boolean) => {
    setShowAddComponent(newValue);
  };

  const handleSetAddComponentDashboard = (newValue: boolean) => {
    setShowAddComponentDashboard(newValue);
  };

  const handleSetEditComponent = (newValue: boolean) => {
    setEditingASubreddit(newValue);
  };

  const handleShowRedditList = (newValue: boolean) => {
    setShowRedditList(newValue);
  };

  const handleSettingsTabClick = (newValue: boolean) => {
    setTabClick(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
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
                onCloseDialog={onCloseAlertDialog}
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
          <Tab label="Dashboard" {...tabProps(0)} />
          <Tab label="Settings" {...tabProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} tabIndex={0}>
        <Dashboard
          showAddComponent={showAddComponentDashboard}
          setShowAddComponent={handleSetAddComponentDashboard}
          noReddits={noReddits}
        />
      </TabPanel>
      <TabPanel value={value} tabIndex={1}>
        {showSettingsComponent && (
          <Settings
            showAddComponent={showAddComponent}
            setShowAddComponent={handleSetAddComponentSettings}
            setShowRedditList={handleShowRedditList}
            showRedditList={showRedditList}
            editingASubreddit={editingASubreddit}
            setEditingASubreddit={handleSetEditComponent}
            tabClick = {tabClick}
            handleSettingsTabClick = {handleSettingsTabClick}
          />
        )}
      </TabPanel>
    </div>
  );
};
