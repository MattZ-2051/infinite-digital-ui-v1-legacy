import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './store';
import { Auth0Provider } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';
import smoothscroll from 'smoothscroll-polyfill';
import { mockServer } from 'mock/server';

// mockServer();
// smoothscroll.polyfill();

const history = createBrowserHistory();
const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

let persistor = persistStore(store);

const providerConfig = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE as string,
  redirectUri: window.location.origin as string,
  onRedirectCallback,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Auth0Provider
          {...providerConfig}
          useRefreshTokens={true}
          cacheLocation="localstorage"
        >
          <App />
        </Auth0Provider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
