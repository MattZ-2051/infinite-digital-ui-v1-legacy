import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { config } from 'config';

const Auth0ProviderWithHistory = ({ children }) => {
  const providerConfig = {
    domain: config.auth.auth0Domain,
    clientId: config.auth.auth0ClientId,
    audience: config.auth.auth0Audience,
    redirectUri: window.location.origin,
  };

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    if (appState && appState.returnTo) {
      history.push(appState.returnTo);
    }
  };

  return (
    <Auth0Provider
      {...providerConfig}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
