import { useAuth0 } from '@auth0/auth0-react';
import { USDCAddress } from 'entities/usdcAddress';
import React, { useState } from 'react';
import { generateUSDCAddress } from 'services/api/userService';
import etherscanService, {
  usdcAddress,
  CHAIN_ID,
} from 'services/api/etherscan/etherscan.service';
import { S as StylesFromCreditCard } from '../AddCC/styles';
import { ActionButton } from '../styles';
import { PulseLoader } from 'react-spinners';

interface IUSDCDepositProps {
  existingCard?: boolean;
}

export const USDCDeposit = ({}: IUSDCDepositProps): JSX.Element => {
  const [userUsdcAddress, setUserUsdcAddress] = useState<USDCAddress>();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [txLink, setTxLink] = useState<string>();

  const { getAccessTokenSilently } = useAuth0();

  async function getUSDCAddress() {
    setButtonDisabled(true);
    try {
      const userUsdcAddress = await generateUSDCAddress(
        await getAccessTokenSilently()
      );
      setUserUsdcAddress(userUsdcAddress);
      waitForTx(userUsdcAddress.address);
    } catch (e) {
      setErrorMsg(e.message);
    }
  }

  async function waitForTx(address: string, startBlock = '0') {
    if (startBlock === '0') {
      startBlock = (await etherscanService.getCurrentBlock()).result;
    }
    const txList = await etherscanService.getTxList({
      action: 'tokentx',
      address,
      startBlock: startBlock,
      sort: 'dsc',
    });
    const usdcTxs = txList.result.filter(
      (txResponse) =>
        txResponse.contractAddress === usdcAddress &&
        txResponse.blockNumber > startBlock
    );
    if (usdcTxs.length > 0) {
      setTxLink(usdcTxs[0].hash);
    } else {
      setTimeout(() => waitForTx(address, startBlock), 5000);
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
            <ActionButton onClick={getUSDCAddress}>
              Generate USDC Address
            </ActionButton>
          )}
        </p>
        <p>
          {userUsdcAddress && (
            <StylesFromCreditCard.FormInput
              size="medium"
              fullWidth
              disabled
              value={userUsdcAddress?.address}
            />
          )}
        </p>
        {userUsdcAddress && (
          <p style={{ maxWidth: '300px', margin: 'auto' }}>
            <small>
              This is a USDC (Ethereum mainnet) address. Please do not send any
              other currencies to this address, it accepts USDC only. Funds sent
              to this address will be automatically credited to your account.
            </small>
          </p>
        )}
        {userUsdcAddress && !txLink && (
          <p>
            <PulseLoader
              color="#000"
              loading={!txLink}
              css={'display:block;margin: 0 auto;'}
              size={9}
              margin={3}
            />
          </p>
        )}
        <p>{errorMsg}</p>
        {txLink && (
          <>
            <p>Success!</p>
            {CHAIN_ID == 3 ? (
              <a href={'https://ropsten.etherscan.io/tx/' + txLink}>{txLink}</a>
            ) : (
              <a href={'https://etherscan.io/tx/' + txLink}>{txLink}</a>
            )}
            <p>
              Your deposit has been received. It will take a moment for it to
              show up in your transaction history.
            </p>
          </>
        )}
      </div>
    </>
  );
};
