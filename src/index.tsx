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
// import ReactGA from 'react-ga';
import GA4React, { useGA4React } from "ga-4-react";

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

function addHubspot(portalId: string) {
  const tagId = `hs-script-loader-${portalId}`;
  if (document.getElementById(tagId)) {
    return;
  }
  const script = document.createElement("script");
  script.id = tagId;
  script.src = `//js.hs-scripts.com/${portalId}.js`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

const Main = () => {
  React.useEffect(
    () => {
      // addGtag();
      addHubspot(config.hubspot.helpSection.portalId);
      addHubspot(config.hubspot.mailSubscribingSection.portalId);
    },
    []
  );
  return (
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
    </React.StrictMode>
  );
};

let ga4react: GA4React | null = null;
if (config.gtag.id) {
  // ReactGA.initialize(config.gtag.id);
  // ReactGA.pageview(window.location.pathname + window.location.search);
  ga4react = new GA4React(config.gtag.id);
}

(async () => {
  if (ga4react) {
    await ga4react.initialize();
  }
  ReactDOM.render(
    <Main />,
    document.getElementById('root')
  );
})();

reportWebVitals();
