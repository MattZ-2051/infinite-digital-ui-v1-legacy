import { useState, ReactElement } from 'react';
import { useAppSelector } from 'store/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import * as S from './styles';
import hbarIcon from 'assets/img/icons/hbar-icon.png';
import WalletAddress from './components/WalletAdress';
import Spinner from './components/Spinner';
import HbarDepositActions from './components/HbarDepositActions';
import NewDepositList from './components/NewDepositList';
import { checkHbarDeposits } from 'services/api/walletService';

interface IHbarDepositProps {
  handleClose: () => void;
}

export interface INewHbarDeposit {
  consensusAt: Date | string;
  id: string;
  status: 'success' | 'pending' | 'error';
  depositAmount: number;
}

const HbarDeposit = ({ handleClose }: IHbarDepositProps): ReactElement => {
  const { hederaAccount } = useAppSelector((state) => state.session.user);
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [paymentsChecked, setPaymentsChecked] = useState<boolean>(false);

  const [depSummary, setDepSummary] = useState<INewHbarDeposit[]>([]);

  async function getNewPayments() {
    const depositSummary: INewHbarDeposit[] = [];
    try {
      setLoading(true);
      const deposits = await checkHbarDeposits(await getAccessTokenSilently());

      if (deposits?.newTransactions?.length) {
        deposits.newTransactions.forEach((dep) => {
          const { consensusAt, id, tokenTransfers } = dep.rawTransaction;

          const depositAmount = tokenTransfers.find(
            (t) => t.account === hederaAccount
          )?.amount;

          depositSummary.push({
            id,
            status: dep.depositStatus,
            depositAmount: depositAmount ?? 0,
            consensusAt: new Date(consensusAt),
          });
        });
      }

      setDepSummary(depositSummary);
      setPaymentsChecked(true);
      setLoading(false);
    } catch (e) {
      setErrorMsg(e.message);
    }
  }

  if (loading) return <Spinner />;

  return (
    <S.BodyContainer>
      <S.BodyHeader>
        <S.HbarIcon>
          <img src={hbarIcon} width="32" height="32" />
        </S.HbarIcon>
        <S.Header
          style={{ marginLeft: '17px', border: '0px', paddingBottom: 0 }}
        >
          Deposit HBAR
        </S.Header>
      </S.BodyHeader>
      <S.BodyContent>
        {!paymentsChecked && (
          <S.FlexColumn className="deposit__step">
            <p
              style={{
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Step 1:
            </p>
            <p style={{ color: '#9e9e9e' }}>
              Send an hbar deposit to your INFINITE wallet address
            </p>
            <p style={{ color: '#9e9e9e', fontSize: '14px' }}>
              (provided below)
            </p>
          </S.FlexColumn>
        )}
        <WalletAddress paymentsChecked={paymentsChecked} />
        {errorMsg && <p>An error ocurred: {errorMsg}</p>}
        {!paymentsChecked && (
          <S.FlexColumn className="deposit__step">
            <p style={{ fontSize: '14px', fontWeight: 600 }}>Step 2:</p>
            <p
              style={{
                color: '#9e9e9e',
                maxWidth: '26ch',
              }}
            >
              Check for new transactions to credit them to your account.
            </p>
          </S.FlexColumn>
        )}
        {paymentsChecked && <NewDepositList depSummary={depSummary} />}
        <HbarDepositActions
          paymentsChecked={paymentsChecked}
          handleCheck={getNewPayments}
          handleBackToWallet={handleClose}
        />
      </S.BodyContent>
    </S.BodyContainer>
  );
};

export default HbarDeposit;
