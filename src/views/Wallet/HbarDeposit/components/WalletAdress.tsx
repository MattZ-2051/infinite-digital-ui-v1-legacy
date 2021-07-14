import { useState } from 'react';
import { useAppSelector } from 'store/hooks';
import * as S from '../styles';
import copy from 'copy-to-clipboard';
import { useEffect } from 'react';

interface IWalletAddress {
  paymentsChecked: boolean;
}

const WalletAddress = ({ paymentsChecked }: IWalletAddress): JSX.Element => {
  const { hederaAccount } = useAppSelector((state) => state.session.user);
  const [copied, setCopied] = useState<boolean>(false);
  const [toggleCopied, setToggleCopied] = useState<boolean>(false);

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
          <span>View wallet in explorer</span>
          <button style={{ display: 'flex' }}>
            <S.LinkIcon />
          </button>
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
