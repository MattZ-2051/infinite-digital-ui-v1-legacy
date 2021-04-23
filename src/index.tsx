import React from 'react';
import ReactDOM from 'react-dom';
import { config } from './config';
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

const persistor = persistStore(store);

const providerConfig = {
  domain: config.auth.auth0Domain,
  clientId: config.auth.auth0ClientId,
  audience: config.auth.auth0Audience,
  redirectUri: window.location.origin,
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
