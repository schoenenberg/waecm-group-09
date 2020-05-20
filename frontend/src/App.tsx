import React, { useState, useCallback } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { uuid } from 'uuidv4';
import { useEffect } from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { useStyles } from './materialStyles';
import { Login } from './components/Login';
import Divider from '@material-ui/core/Divider';
import { MenuAppBar } from './components/Navigation';

import 'custom-banner-web-element';

const useReactPath = () => {
  const [windowHref, setWindowHref] = useState(window.location.href);
  const listenToPopstate = () => {
    const currentWindowHref = window.location.href;
    setWindowHref(currentWindowHref);
  };
  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);
    return () => {
      window.removeEventListener('popstate', listenToPopstate);
    };
  }, []);
  return windowHref;
};

const App = () => {

  const classes = useStyles();

  // check if user is already logged in
  const getIsLoggedIn = () => {
    return window.sessionStorage.getItem('currentToken') != null;

  };

  const initialValue = getIsLoggedIn();
  const [isLoggedIn, setIsLoggedIn] = useState(initialValue);
  const [token_id, setTokenId] = useState('');
  const [oldToken, setOldToken] = useState('');
  const [isProfileDetailPage, setIsProfileDetailPage] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [interaction] = useState(classes.noInteraction);
  const [client, setClient] = useState(
    new ApolloClient({
      link: new HttpLink({
        uri: 'http://localhost:8080/graphql',
        headers: {
          Authorization:
            `Bearer ` + window.sessionStorage.getItem('currentToken'),
        },
      }),
      cache: new InMemoryCache(),
    }),
  );

  const href = useReactPath();

  useEffect(() => {
    //Local Storge  

    if (window.sessionStorage.getItem('currentToken') != null) {
      setIsLoggedIn(true);
    }
    if (href.includes('id_token')) {
      setOldToken(token_id);
      if (!oldToken.includes(href.split('token=')[1])) {
        setIsProfileDetailPage(true);
        setTokenId(href.split('token=')[1]);
        window.sessionStorage.setItem('currentToken', href.split('token=')[1]);

        setClient(
          new ApolloClient({
            link: new HttpLink({
              uri: 'http://localhost:8080/graphql',
              headers: {
                Authorization:
                  `Bearer ` + window.sessionStorage.getItem('currentToken'),
              },
            }),
            cache: new InMemoryCache(),
          }),
        );
      }
    }
    if (href.includes('access_denied')) {
      setAccessDenied(true);
    }
  }, [
    href,
    token_id,
    isProfileDetailPage,
    accessDenied,
    client,
    oldToken,
    isLoggedIn,
  ]);

  const auth_url = (): string => {
    return (
      'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/auth' +
      '?client_id=waecm' +
      '&response_type=id_token' +
      '&prompt=consent' +
      '&nonce=' +
      uuid() +
      '&scope=openid%20profile' +
      '&redirect_uri=http://localhost:3000'
    );
  };

  const login = useCallback(() => {
    window.location.replace(auth_url());
  }, []);

  const logout = useCallback(() => {
    window.location.replace(
      'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/protocol/openid-connect/logout?post_logout_redirect_uri=http://localhost:3000',
    );
    setIsProfileDetailPage(false);
    window.sessionStorage.removeItem('currentToken');
    setIsLoggedIn(false);
  }, []);

  const redirectStartPage = useCallback(() => {
    window.location.replace('http://localhost:3000');
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className = {interaction}>
      <Container component="main" className={classes.container}>
        <header>
          {isLoggedIn && <MenuAppBar onLogout={logout} />}
          {!isLoggedIn && (
            <div>
              <h1 className={classes.fonts}>WAECM Project</h1>
              <h1 className={classes.names}>Max, Sigrid, Alicia, Elli</h1>
              <Divider variant="middle" />
            </div>
          )}
        </header>
        {!isLoggedIn && (
          <Login
            accessDenied={accessDenied}
            onLogin={login}
            onLogout={logout}
            onRedirectStartpage={redirectStartPage}
            isProfileDetailPage={isProfileDetailPage}
          />
        )}
      </Container>
      </div>
 
      <custom-banner-js 
        application-name="WAECM" 
        policy-link="Link"
        on-accept="tst">
      </custom-banner-js>
    </ApolloProvider>
  );
};
export default App;
