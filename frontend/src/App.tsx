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
  submit: {
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
    align: 'center'
  }
}));



function App() {
  const [token_id, setTokenId] = useState("aba");
  const classes = useStyles();
  const [hidden, setHidden] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [oldToken, setOldTOken] = useState("aba");
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
      console.error(error);
      return <div>Error!</div>;
    }
    const result = data;
    return <div><Avatar alt="Remy Sharp" src={result.currentUser.picture} className = {classes.large}/><h2 className={classes.fonts}>{result.currentUser.username}</h2></div>;
  };


  const useReactPath = () => {
    const [path, setPath] = React.useState(window.location.href);
    const listenToPopstate = () => {
      const winPath = window.location.href;
      setPath(winPath);
    };

    useEffect(() => {
      window.addEventListener("popstate", listenToPopstate);
      return () => {
        window.removeEventListener("popstate", listenToPopstate);
      };
    }, []);
    return path;
  };

  const href = useReactPath();

  useEffect(() => {

    if(href.includes("id_token")){
      setOldTOken(token_id);
      if(!oldToken.includes(href.split("token=")[1])) {
        setHidden(true);
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
        console.log(token_id);
      }
    }
    if(href.includes("access_denied")){
      setAccessDenied(true);
    }
  }, [href, token_id, hidden, accessDenied, client, oldToken]);


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
    setHidden(false);
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
                    className={classes.submit}
                    onClick={redirectStartPage}>
              Redirect to start page
            </Button>
          </div>}

          {hidden && !accessDenied &&
          <div className = {classes.profile_details}>
            <UserInformation/>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={logout}>
              Logout
            </Button>
          </div>
          }
          {!hidden && !accessDenied &&
          <div className={classes.login}>
             <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
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
