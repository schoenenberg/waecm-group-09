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
  backButton: {
    margin: '20px auto !important',
    background: 'linear-gradient(45deg, #b3cce6 30%, #c6d9ec 90%)',
    borderRadius: 3,
    border: 0,
    color: '#132639',
    height: 48,
    padding: '0%',
    boxShadow: '0 5px 7px 4px rgba(19, 38, 57, .5)',
  },
  flexCentering: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  policyAccepted: {
    position: 'absolute',
    bottom: theme.spacing(1),
  },

  noInteraction: {
    pointerEnabled: false,
    pointerEvents: 'none',
  },

  withInteraction: {
    pointerEnabled: true,
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
