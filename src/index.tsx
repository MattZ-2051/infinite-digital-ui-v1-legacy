import React from 'react';
import ReactDOM from 'react-dom';
import { config } from './config';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './store';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import ReactGA from 'react-ga';
import GA4React, { useGA4React } from 'ga-4-react';
import Auth0ProviderWithHistory from 'utils/auth0Provider/auth0ProviderWithHistory';
import { BrowserRouter } from 'react-router-dom';

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

const persistor = persistStore(store);

function addHubspot(portalId: string) {
  const tagId = `hs-script-loader-${portalId}`;
  if (document.getElementById(tagId)) {
    return;
  }
  const script = document.createElement('script');
  script.id = tagId;
  script.src = `//js.hs-scripts.com/${portalId}.js`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

const Main = () => {
  React.useEffect(() => {
    // addGtag();
    addHubspot(config.hubspot.helpSection.portalId);
    addHubspot(config.hubspot.mailSubscribingSection.portalId);
  }, []);
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Auth0ProviderWithHistory>
                <App />
              </Auth0ProviderWithHistory>
            </BrowserRouter>
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
  try {
    ga4react = new GA4React(config.gtag.id);
  } catch (e) {
    console.error(e);
  }
}

if (config.gtag.uaId) {
  ReactGA.initialize(config.gtag.uaId);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

(async () => {
  if (ga4react) {
    try {
      await ga4react.initialize();
    } catch (e) {
      console.error(e);
    }
  }
  ReactDOM.render(<Main />, document.getElementById('root'));
})();

reportWebVitals();
