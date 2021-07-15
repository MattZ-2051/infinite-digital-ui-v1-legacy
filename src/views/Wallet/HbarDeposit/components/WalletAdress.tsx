import { useState, useEffect } from 'react';
import { useAppSelector } from 'store/hooks';
import * as S from '../styles';
import copy from 'copy-to-clipboard';
import { useAuth0 } from '@auth0/auth0-react';
import { getHbarExplorerAddress } from 'services/api/walletService';

interface IWalletAddress {
  paymentsChecked: boolean;
}

const WalletAddress = ({ paymentsChecked }: IWalletAddress): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0();
  const { hederaAccount } = useAppSelector((state) => state.session.user);
  const [explorerLink, setExplorerLink] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [toggleCopied, setToggleCopied] = useState<boolean>(false);

  const handleGetExplorer = async () => {
    const explorerAddress = await getHbarExplorerAddress(
      await getAccessTokenSilently()
    );
    setExplorerLink(explorerAddress.explorerLink);
  };

  useEffect(() => {
    handleGetExplorer();
  }, []);

  useEffect(() => {
    const clearCopied = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(clearCopied);
  }, [toggleCopied]);

  const handleCopy = () => {
    copy(hederaAccount, {
      format: 'text/plain',
    });
    setToggleCopied(!toggleCopied);
    setCopied(true);
  };

  return (
    <>
      <S.WalletSubheader>
        {paymentsChecked && (
          <span style={{ color: '#7d7d7d' }}>Deposits will be made to...</span>
        )}
        <div className="wallet__explorer">
          {explorerLink ? (
            <a href={explorerLink} target="_blank" rel="noreferrer">
              View wallet in explorer
              <S.LinkIcon />
            </a>
          ) : (
            <span>
              View wallet in explorer
              <S.LinkIcon />
            </span>
          )}
        </div>
      </S.WalletSubheader>
      <S.AddressButton style={{ marginTop: 0 }} onClick={handleCopy}>
        <span>Wallet Address</span>
        <span className="account-address">
          {hederaAccount}
          {!copied ? <S.CopyIcon /> : <S.CheckIcon />}
        </span>
      </S.AddressButton>
    </>
  );
};

export default WalletAddress;
