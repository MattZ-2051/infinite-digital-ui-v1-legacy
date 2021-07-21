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
import copy from 'copy-to-clipboard';
import * as S from './styles';
import usdcIcon from 'assets/img/icons/usdc-icon.png';
import { StyledPagination } from 'views/Product/History/styles';

interface IUSDCDepositProps {
  existingCard?: boolean;
  handleClose: () => void;
}

export const USDCDeposit = ({
  handleClose,
}: IUSDCDepositProps): JSX.Element => {
  const [userUsdcAddress, setUserUsdcAddress] = useState<USDCAddress>();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [txLink, setTxLink] = useState<string>();
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleCopied, setToggleCopied] = useState<boolean>(false);

  const { getAccessTokenSilently } = useAuth0();

  async function getUSDCAddress() {
    setLoading(true);
    setButtonDisabled(true);
    try {
      const userUsdcAddress = await generateUSDCAddress(
        await getAccessTokenSilently()
      );
      setUserUsdcAddress(userUsdcAddress);
      waitForTx(userUsdcAddress.address);
      setLoading(false);
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
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

  const handleCopy = () => {
    copy(userUsdcAddress?.address || '', {
      format: 'text/plain',
    });
    setToggleCopied(!toggleCopied);
    setCopied(true);
  };

  return (
    <>
      <S.BodyContainer>
        <S.BodyHeader>
          <S.Icon>
            <img src={usdcIcon} alt="usdcIcon" width="32" height="32" />
          </S.Icon>
          <S.Header
            style={{ marginLeft: '17px', border: '0px', paddingBottom: 0 }}
          >
            USDC Deposit
          </S.Header>
        </S.BodyHeader>
        <S.BodyContent>
          <S.FlexColumn>
            <p>Funds sent to the following address will be</p>
            <p>automatically credited to your account.</p>
          </S.FlexColumn>

          <S.ContainerButton>
            {!buttonDisabled ? (
              <ActionButton
                onClick={getUSDCAddress}
                style={{
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 700,
                }}
              >
                Generate USDC Address
              </ActionButton>
            ) : loading ? (
              <PulseLoader
                color="#000"
                loading={!txLink}
                css={'display:block;margin: 0 auto;'}
                size={9}
                margin={3}
              />
            ) : null}
          </S.ContainerButton>
          <p style={{ width: '100%' }}>
            {userUsdcAddress && (
              <S.AddressButton style={{ marginTop: 0 }} onClick={handleCopy}>
                <span className="account-address">
                  {userUsdcAddress?.address}
                  {!copied ? <S.CopyIcon /> : <S.CheckIcon />}
                </span>
              </S.AddressButton>
            )}
          </p>
          {userUsdcAddress && (
            <S.InfoText style={{ maxWidth: '400px', margin: 'auto' }}>
              This is a USDC (Ethereum mainnet) address. Please do not send any
              other currancies to this address, it accepts USDC only.
            </S.InfoText>
          )}
          {userUsdcAddress && !txLink && (
            <div style={{ display: 'flex' }}>
              <PulseLoader
                color="#000"
                loading={!txLink}
                css={'display:block;margin: 0 auto;'}
                size={9}
                margin={3}
              />
            </div>
          )}
          <p style={{ textAlign: 'center', color: 'red' }}>{errorMsg}</p>
          {txLink && (
            <>
              <p>Success!</p>
              {CHAIN_ID == 3 ? (
                <a href={'https://ropsten.etherscan.io/tx/' + txLink}>
                  {txLink}
                </a>
              ) : (
                <a href={'https://etherscan.io/tx/' + txLink}>{txLink}</a>
              )}
              <p>
                Your deposit has been received. It will take a moment for it to
                show up in your transaction history.
              </p>
            </>
          )}
          <S.ContainerButton>
            <S.ReturnButton onClick={handleClose}>
              <span style={{ textAlign: 'center' }}>Back to Wallet</span>
            </S.ReturnButton>
          </S.ContainerButton>
        </S.BodyContent>
      </S.BodyContainer>
    </>
  );
};
