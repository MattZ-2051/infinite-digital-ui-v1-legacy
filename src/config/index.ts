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
    ccDepositLimit: string;
  };
  gtag: {
    id: string;
  };
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
    usdcTokenContractAddress:
      getEnvVar('REACT_APP_BLOCKCHAIN_API_KEY', false) ||
      '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
  },
  kyc: {
    templateLvl1:
      getEnvVar('REACT_APP_PERSONA_TEMPLATE_LVL_1', false) ||
      'tmpl_RdoVrNaCQZ2mNCm6Q9W7jg2z',
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
      formId: getEnvVar('REACT_APP_HUBSPOT_HELP_FORM_ID', false) || 'a25ae540-4e5a-4858-90fb-20edc5ca1252',
      portalId: getEnvVar('REACT_APP_HUBSPOT_HELP_PORTAL_ID', false) || '8953348',
    },
    mailSubscribingSection: {
      formId: getEnvVar('REACT_APP_HUBSPOT_MAIL_SUBSCRIPTION_FORM_ID', false) || 'ef10e4fd-1595-42d1-b10b-6d6dd9b2b46f',
      portalId: getEnvVar('REACT_APP_HUBSPOT_MAIL_SUBSCRIPTION_PORTAL_ID', false) || '20243335',
    },
  },
  kycLimits: {
    ccDepositLimit:
      getEnvVar('REACT_APP_CC_DEPOSIT_LIMIT_USD', false) || '2000',
  },
  gtag: {
    id: getEnvVar('REACT_APP_GTAG_ID', false) || 'G-KH8PDB7NVR',
  },
};
