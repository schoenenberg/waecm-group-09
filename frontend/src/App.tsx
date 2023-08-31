import React, { useState, useCallback, createRef } from 'react';
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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import 'custom-banner-web-element';
import { Alert } from '@material-ui/lab';
import { Policy } from './pages/Policy';
import { Dashboard } from './pages/Dashboard';

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

  const bannerRef = createRef();

  // check if user is already logged in
  const getIsLoggedIn = () => {
    return window.sessionStorage.getItem('currentToken') != null;
  };

  const [guidelineAccepted, setGuidelineAccepted] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [policyAcceptedMessage, setPolicyAcceptedMessage] = useState(false);
  const initialValue = getIsLoggedIn();
  const [interactionAllowed, setInteractionAllowed] = useState(
    classes.noInteraction,
  );
  const [isLoggedIn, setIsLoggedIn] = useState(initialValue);
  const [token_id, setTokenId] = useState('');
  const [oldToken, setOldToken] = useState('');
  const [isProfileDetailPage, setIsProfileDetailPage] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
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

  /*const getGuidelineState = (() => {
    const guidelineAcceptedStorageValue = window.sessionStorage.getItem('guidelineAccepted');
    if (guidelineAcceptedStorageValue != null) {
      return guidelineAcceptedStorageValue === "true";
    } else {
      return false;
    }
  });*/

  const handleGuidelineAccepted = useCallback((newState: boolean) => {
    if (newState) {
      setGuidelineAccepted(true);
      setBannerVisible(false);
      window.sessionStorage.setItem('guidelineAccepted', 'true');
    } else {
      setGuidelineAccepted(false);
      window.sessionStorage.setItem('guidelineAccepted', 'false');
    }
  }, []);

  useEffect(() => {
    //add functionality to
    if (bannerVisible) {
      const el: any = bannerRef.current;
      el.addEventListener('on-accept', () => {
        // callback function for whatever you want to do after accept is clicked
        setPolicyAcceptedMessage(true);
        setInteractionAllowed(classes.withInteraction);
        handleGuidelineAccepted(true);
        setBannerVisible(false);
      });
    }

    const guidelineAcceptedStorageValue = window.sessionStorage.getItem(
      'guidelineAccepted',
    );
    if (guidelineAcceptedStorageValue != null) {
      if (guidelineAcceptedStorageValue === 'true') {
        setGuidelineAccepted(true);
        setInteractionAllowed(classes.withInteraction);
        setBannerVisible(false);
      } else {
        setGuidelineAccepted(false);
      }
    } else {
      setGuidelineAccepted(false);
    }

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
    bannerVisible,
    bannerRef,
    classes.withInteraction,
    handleGuidelineAccepted,
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
    setPolicyAcceptedMessage(false);
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
      <Router>
        <Switch>
          <Route path={'/policy'}>
            <Policy
              guidelineAccepted={guidelineAccepted}
              setGuidelineAccepted={handleGuidelineAccepted}
            />
          </Route>
          <Route path={'/dashboard'}>
            {isLoggedIn ? (
              <Dashboard
                interactionAllowed={interactionAllowed}
                setGuidelineAccepted={handleGuidelineAccepted}
                guidelineAccepted={guidelineAccepted}
                logoutHandler={logout}
              />
            ) : (
              <Redirect to={'/'} />
            )}
          </Route>
          <Route path={'/'}>
            {isLoggedIn ? (
              <Redirect to={'/dashboard'} />
            ) : (
              <Container component="main" className={classes.container}>
                <div className={interactionAllowed}>
                  <header>
                    <div>
                      <h1 className={classes.fonts}>WAECM Project</h1>
                      <h1 className={classes.names}>
                        Max, Sigrid, Alicia, Elli
                      </h1>
                      <Divider variant="middle" />
                    </div>
                  </header>
                  <Login
                    accessDenied={accessDenied}
                    onLogin={login}
                    onLogout={logout}
                    onRedirectStartpage={redirectStartPage}
                    isProfileDetailPage={isProfileDetailPage}
                  />
                </div>
              </Container>
            )}
          </Route>
        </Switch>
      </Router>
      {policyAcceptedMessage && (
        <Alert severity="success" className={classes.policyAccepted}>
          Datenschutz-Richtlinie zugestimmt
        </Alert>
      )}
      {bannerVisible && !guidelineAccepted && (
        <custom-banner
          class={classes.banner}
          ref={bannerRef}
          application-name="WAECM"
          policy-link="policy"
        />
      )}
    </ApolloProvider>
  );
};
export default App;
