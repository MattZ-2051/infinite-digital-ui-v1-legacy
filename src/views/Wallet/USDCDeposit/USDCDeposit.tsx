import { useAuth0 } from '@auth0/auth0-react';
import { USDCAddress } from 'entities/usdcAddress';
import React, { useState } from 'react';
import { generateUSDCAddress } from 'services/api/userService';
import { S as StylesFromCreditCard } from '../AddCC/styles';
import { S as StylesFromWallet } from '../index';

interface IUSDCDepositProps {
  existingCard?: boolean;
}

export const USDCDeposit = ({}: IUSDCDepositProps): JSX.Element => {
  const [usdcAddress, setUsdcAddress] = useState<USDCAddress>();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();

  const { getAccessTokenSilently } = useAuth0();

  async function getUSDCAddress() {
    setButtonDisabled(true);
    try {
      const usdcAddress = await generateUSDCAddress(
        await getAccessTokenSilently()
      );
      setUsdcAddress(usdcAddress);
    } catch (e) {
      setErrorMsg(e.message);
    }
  }

  return (
    <>
      <h3>USDC Deposit</h3>
      <p>
        Funds sent to the following address will be credited to your wallet:
      </p>
      <div style={{ textAlign: 'center' }}>
        <p>
          {!buttonDisabled && (
            <StylesFromWallet.ActionButton onClick={getUSDCAddress}>
              Generate USDC Address
            </StylesFromWallet.ActionButton>
          )}
        </p>
        <p>
          {buttonDisabled && !usdcAddress && <p>Loading...</p>}
          {usdcAddress && (
            <StylesFromCreditCard.FormInput
              size="medium"
              fullWidth
              disabled
              value={usdcAddress?.address}
            />
          )}
        </p>
        {usdcAddress && (
          <p style={{ maxWidth: '300px', margin: 'auto' }}>
            <small>
              This is a USDC (Ethereum mainnet) address. Please do not send any
              other currencies to this address, it accepts USDC only. Funds sent
              to this address will be automatically credited to your account.
            </small>
          </p>
        )}
        <p>{errorMsg}</p>
      </div>
    </>
  );
};
