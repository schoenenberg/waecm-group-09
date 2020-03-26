import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  login: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  profile_details: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  access_denied: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #b3cce6 30%, #c6d9ec 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(19, 38, 57, .3)",
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40)
  },
  container: {
    width: "100vw",
    height: "100vh",
    margin: 0, 
    marginRight: 0, 
    marginLeft: 0, 
    headerMode: "screen"
  },
  fonts: {
    ...theme.typography.h4, 
    paddingTop: theme.spacing(15),
    margin: 0,
    textAlign: "center", 
    color: "#19334d"
  },
  names: {
    ...theme.typography.h5, 
    paddingTop: theme.spacing(1),
    margin: 0,
    textAlign: "center", 
    color: "#19334d"
  },
  username: {
    ...theme.typography.h6,
    margin: 0,
    color: "#c6d9ec",
    textAlign: "center"
  }
}));
