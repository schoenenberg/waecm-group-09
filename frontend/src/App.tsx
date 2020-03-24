import React, {useState} from 'react';
import './App.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { uuid } from 'uuidv4';
import { useEffect } from 'react';
import Image from './background_image.jpg';
import {Alert, AlertTitle} from "@material-ui/lab";
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import {gql} from "apollo-boost";

const useStyles = makeStyles(theme => ({
  login: {
    marginTop: theme.spacing(25),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  profile_details: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  access_denied: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
  container:{
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    headerMode: 'screen'
  },
  fonts:{
    margin: 0,
    color: 'white',
  },
  username:{
    margin: 0,
    color: 'white',
    textAlign: 'center'
  }
}));

function App() {
  const classes = useStyles();
  const [token_id, setTokenId] = useState("");
  const [oldToken, setOldToken] = useState("");
  const [onProfileDetailPage, setOnProfileDetailPage] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [client, setClient] = useState(new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:8080/graphql',
      headers: {
        Authorization: `Bearer ` + token_id
      }
    }),
    cache: new InMemoryCache(),
  }));

  const GET_USERINFO = gql`
   {
    currentUser {
      username
      picture
    }
  }
`;

  const UserInformation= () => {
    const { loading, error, data } = useQuery(GET_USERINFO);
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error!</div>;
    }
    return <div><Avatar alt="Remy Sharp" src={data.currentUser.picture} className = {classes.large}/><h2 className={classes.username}>{data.currentUser.username}</h2></div>;
  };

  const useReactPath = () => {
    const [windowHref, setWindowHref] = useState(window.location.href);
    const listenToPopstate = () => {
      const currentWindowHref = window.location.href;
      setWindowHref(currentWindowHref);
    };
    useEffect(() => {
      window.addEventListener("popstate", listenToPopstate);
      return () => {
        window.removeEventListener("popstate", listenToPopstate);
      };
    }, []);
    return windowHref;
  };

  const href = useReactPath();

  useEffect(() => {
    if(href.includes("id_token")){
      setOldToken(token_id);
      if(!oldToken.includes(href.split("token=")[1])) {
        setOnProfileDetailPage(true);
        setTokenId(href.split("token=")[1]);
        setClient(new ApolloClient({
          link: new HttpLink({
            uri: 'http://localhost:8080/graphql',
            headers: {
              Authorization: `Bearer ` + token_id
            }
          }),
          cache: new InMemoryCache(),
        }));
      }
    }
    if(href.includes("access_denied")){
      setAccessDenied(true);
    }
  }, [href, token_id, onProfileDetailPage, accessDenied, client, oldToken]);


  function auth_url () : string {
    return "https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/auth" +
        "?client_id=waecm"
        +"&response_type=id_token"
        +"&prompt=consent"
        +"&nonce="+uuid()
        +"&scope=openid%20profile"
        +"&redirect_uri=http://localhost:3000";
  }

  function login() {
    window.location.replace(auth_url());
  }

  function logout() {
    window.location.replace("https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/logout?post_logout_redirect_uri=http://localhost:3000");
    setOnProfileDetailPage(false);
  }

  function redirectStartPage() {
    window.location.replace("http://localhost:3000");
  }

  return (
      <ApolloProvider client={client}>
        <Container component="main" className = {classes.container}>
          <header>
            <h1 className={classes.fonts}>WAECM Project: Max, Sigrid, Alicia, Elli</h1>
          </header>
          <Container maxWidth="xs">
            <CssBaseline />

            {accessDenied &&
            <div className={classes.access_denied}>
              <Alert severity="error">
                <AlertTitle> Error </AlertTitle>
                Unfortunately the access was denied!
              </Alert>
              <Button fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={redirectStartPage}>
                Redirect to start page
              </Button>
            </div>}

            {onProfileDetailPage && !accessDenied &&
            <div className = {classes.profile_details}>
              <UserInformation/>
              <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={logout}>
                Logout
              </Button>
            </div>
            }

            {!onProfileDetailPage && !accessDenied &&
            <div className={classes.login}>
               <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={login}
                >
                  Login
                </Button>
            </div>}
          </Container>
        </Container>
      </ApolloProvider>
  );
}
export default App;
