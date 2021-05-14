import { getEnvVar } from './utils';

interface AppConfig {
  auth: {
    auth0Domain: string;
    auth0ClientId: string;
    auth0Audience: string;
  };
  backend: {
    apiEndpoint: string;
  };
  misc: {
    coinbaseCheckoutId: string;
  };
  blockchain: {
    chainId: number;
    apiKey: string;
  };
}

export const config: AppConfig = {
  auth: {
    auth0Domain: getEnvVar('REACT_APP_AUTH0_DOMAIN', true),
    auth0ClientId: getEnvVar('REACT_APP_AUTH0_CLIENT_ID', true),
    auth0Audience: getEnvVar('REACT_APP_AUTH0_AUDIENCE', true),
  },
  backend: {
    apiEndpoint: getEnvVar('REACT_APP_API_ENDPOINT', true),
  },
  misc: {
    coinbaseCheckoutId:
      getEnvVar('REACT_APP_COINBASE_CHECKOUT_ID', false) ||
      'd7589053-50e2-4560-b25c-5058274d6b0d',
  },
  blockchain: {
    chainId:
      parseInt(getEnvVar('REACT_APP_BLOCKCHAIN_CHAIN_ID', false), 10) || 3,
    apiKey:
      getEnvVar('REACT_APP_BLOCKCHAIN_API_KEY', false) ||
      '1TBA6MAXS6YTBXRY4RCS9PQE2RBX23PA83',
  },
};
