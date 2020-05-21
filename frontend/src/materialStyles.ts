import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100vh',
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
    headerMode: 'screen',
  },
  banner: {
    position: 'absolute',
    bottom: theme.spacing(1),
  },

  policyAccepted: {
    position: 'absolute',
    bottom: theme.spacing(1),
  },

  noInteraction:{
    pointerEnabled: false,
    pointerEvents: 'none'
  },

  withInteraction:{
    pointerEnabled: true
  },

  fonts: {
    ...theme.typography.h4,
    paddingTop: theme.spacing(5),
    margin: 0,
    color: '#132639',
    textAlign: 'center',
  },
  names: {
    ...theme.typography.h5,
    paddingTop: theme.spacing(2),
    margin: 0,
    textAlign: 'center',
    color: '#132639',
  },
}));
