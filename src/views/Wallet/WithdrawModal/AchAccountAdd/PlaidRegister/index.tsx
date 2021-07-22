import React, { useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { usePlaidLink } from 'react-plaid-link';
import { getPlaidAccessToken } from 'services/api/walletService';
import { IBillingForAch } from 'components/BillingFormForAch';

interface IPlaidRegisterProps {
  onSuccess: (a: {
    itemId: any;
    accessToken: any;
    isItemAccess: boolean;
  }) => any;
  onError: (Error) => any;
  onExit: () => any;
  linkToken: string;
  billing: IBillingForAch;
  email: string;
}

const PlaidRegister = ({
  onSuccess,
  onError,
  onExit,
  linkToken,
  billing,
  email,
}: IPlaidRegisterProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const onSuccessPlaid = useCallback(
    async (publicToken: string, metadata: any) => {
      if (!billing) {
        return;
      }
      const authToken = await getAccessTokenSilently();
      // ToDo: Cancel request on unmount...
      let accessToken;
      let err;
      try {
        accessToken = await getPlaidAccessToken(
          authToken,
          publicToken,
          billing,
          metadata
        );
      } catch (error) {
        err = error;
      }
      if (!err) {
        onSuccess(accessToken);
      } else {
        onError(err);
      }
    },
    [linkToken, billing, getAccessTokenSilently, email]
  );
  const { open, ready, exit } = usePlaidLink({
    token: linkToken,
    onSuccess: onSuccessPlaid,
    onExit,
  });
  useEffect(() => {
    if (ready) {
      open();
      return () => exit();
    }
  }, [ready, open, exit]);
  return null;
};

PlaidRegister.displayName = 'PlaidRegister';

export default PlaidRegister;
