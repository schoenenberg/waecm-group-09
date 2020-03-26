import { makeStyles } from "@material-ui/core/styles";
import Image from "./background_image.jpg";

export const useStyles = makeStyles(theme => ({
  login: {
    marginTop: theme.spacing(25),
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
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    margin: theme.spacing(3, 0, 2)
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40)
  },
  container: {
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    headerMode: "screen"
  },
  fonts: {
    ...theme.typography.h4, 
    paddingTop: theme.spacing(10),
    margin: 0,
    textAlign: "center", 
    color: "#19334d"
  },
  username: {
    ...theme.typography.h6,
    margin: 0,
    color: "white",
    textAlign: "center"
  }
}));
