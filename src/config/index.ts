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
    usdcTokenContractAddress: string;
    chainId: number;
    apiKey: string;
  };
  kyc: {
    templateLvl1: string;
    templateLvl2: string;
    environmentType: string;
  };
  logging: {
    sentryDsn: string;
    sentrySampleRate: number;
  };
  metadata: {
    environmentName: string;
  };
  hubspot: {
    region: string;
    helpSection: {
      portalId: string;
      formId: string;
    };
    mailSubscribingSection: {
      portalId: string;
      formId: string;
    };
  };
  kycLimits: {
    ccDepositLimit: number;
    dailyDepositLimit: number;
  };
  gtag: {
    id?: string;
    uaId?: string;
  };
  maintenance: string;
}

export const config: AppConfig = {
  metadata: {
    environmentName: getEnvVar('REACT_APP_ENVIRONMENT_NAME', false),
  },
  auth: {
    auth0Domain: getEnvVar('REACT_APP_AUTH0_DOMAIN', true),
    auth0ClientId: getEnvVar('REACT_APP_AUTH0_CLIENT_ID', true),
    auth0Audience: getEnvVar('REACT_APP_AUTH0_AUDIENCE', true),
  },
  backend: {
    apiEndpoint: getEnvVar('REACT_APP_API_ENDPOINT', true),
  },
  misc: {
    coinbaseCheckoutId: getEnvVar('REACT_APP_COINBASE_CHECKOUT_ID', true),
  },
  blockchain: {
    chainId: parseInt(getEnvVar('REACT_APP_BLOCKCHAIN_CHAIN_ID', true), 10),
    apiKey: getEnvVar('REACT_APP_BLOCKCHAIN_API_KEY', true),
    usdcTokenContractAddress: getEnvVar(
      'REACT_APP_BLOCKCHAIN_ADDRESS_USDC_TOKEN_CONTRACT',
      true
    ),
  },
  kyc: {
    templateLvl1: getEnvVar('REACT_APP_PERSONA_TEMPLATE_LVL_1', true),
    templateLvl2: getEnvVar('REACT_APP_PERSONA_TEMPLATE_LVL_2', true),
    environmentType:
      getEnvVar('REACT_APP_PERSONA_ENVIRONMENT_TYPE', false) || 'sandbox',
  },
  logging: {
    sentryDsn: getEnvVar('REACT_APP_SENTRY_DSN', false),
    sentrySampleRate:
      parseFloat(getEnvVar('REACT_APP_SENTRY_SAMPLE_RATE', false)) || 0.1,
  },
  hubspot: {
    region: getEnvVar('REACT_APP_HUBSPOT_REGION', false) || 'na1',
    helpSection: {
      formId:
        getEnvVar('REACT_APP_HUBSPOT_HELP_FORM_ID', false) ||
        '8a6d1a6a-62f6-41f4-be2c-c2c4f4ab01ea',
      portalId:
        getEnvVar('REACT_APP_HUBSPOT_HELP_PORTAL_ID', false) || '20243335',
    },
    mailSubscribingSection: {
      formId:
        getEnvVar('REACT_APP_HUBSPOT_MAIL_SUBSCRIPTION_FORM_ID', false) ||
        'ef10e4fd-1595-42d1-b10b-6d6dd9b2b46f',
      portalId:
        getEnvVar('REACT_APP_HUBSPOT_MAIL_SUBSCRIPTION_PORTAL_ID', false) ||
        '20243335',
    },
  },
  kycLimits: {
    ccDepositLimit: parseInt(
      getEnvVar('REACT_APP_CC_DEPOSIT_LIMIT_USD', true),
      10
    ),
    dailyDepositLimit: parseInt(
      getEnvVar('REACT_APP_DAILY_DEPOSIT_LIMIT_USD', true),
      10
    ),
  },
  gtag: {
    id: getEnvVar('REACT_APP_GTAG_ID', false),
    uaId: getEnvVar('REACT_APP_GA_UA', false),
  },
  maintenance: getEnvVar('REACT_APP_MAINTENANCE', true),
};
