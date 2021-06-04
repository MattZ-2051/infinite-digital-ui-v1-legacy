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
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

if (config.logging.sentryDsn) {
  Sentry.init({
    dsn: config.logging.sentryDsn,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: config.logging.sentrySampleRate,
    ...(config.metadata.environmentName
      ? {
          environment: config.metadata.environmentName,
        }
      : {}),
  });
}

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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
