import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PulseLoader } from 'react-spinners';
import { IPlaidAccount } from 'entities/plaidAccount';
import { doWithdraw } from 'services/api/walletService';
import { getAchAccounts, removeAch } from 'services/api/walletService';
import AchAccountItem from './AchAccountItem';
import AchAccountDepositForm from '../AchAccountDepositForm';
import { Link } from 'react-router-dom';
import * as S from '../../DepositModal/styles';
import * as S2 from '../styles';
import AddIcon from '@material-ui/icons/Add';
import DustbinIcon from 'assets/svg/icons/dustbin.svg';
import AchAccountItemRemoveConfirm from './AchAccountItemRemoveConfirm';
import { IWithdraw } from '../../../../entities/withdraw';
import { useAppDispatch } from 'store/hooks';
import {
  getUserCardsThunk,
  getUserInfoThunk,
} from 'store/session/sessionThunks';

interface IAchAccountListProps {
  onError: (Error) => any;
  onAddNew: () => any;
  onClose: () => any;
}

const AchAccountList = ({
  onError,
  onAddNew,
  onClose,
}: IAchAccountListProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const [valueAchAccounts, setAchAccounts] = useState<IPlaidAccount[]>([]);
  const [valueSelectedAchAccount, setSelectedAchAccount] =
    useState<IPlaidAccount | null>(null);
  const [valueLoadingInformation, setLoadingInformation] =
    useState<JSX.Element | null>(null);
  const [valueSuccessWithdrawData, setSuccessWithdrawData] =
    useState<IWithdraw | null>(null);
  const [valueErrorWithdraw, setErrorWithdraw] = useState<Error | null>(null);
  const [valueIsDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [valueToDeleteSelected, setToDeleteSelected] =
    useState<IPlaidAccount | null>(null);

  const dispatch = useAppDispatch();

  const fetchUserWalletInfo = async () => {
    dispatch(getUserInfoThunk({ token: await getAccessTokenSilently() }));
    dispatch(getUserCardsThunk({ token: await getAccessTokenSilently() }));
  };
  useEffect(() => {
    async function doFetch() {
      setLoadingInformation(<span>Loading accounts</span>);
      return getAchAccounts(await getAccessTokenSilently(), 0, 20)
        .then(({ resources: achAccounts }) => {
          setAchAccounts(achAccounts);
        }, onError)
        .then(() => {
          setLoadingInformation(null);
        });
    }
    doFetch();
  }, [setLoadingInformation, setAchAccounts]);
  if (valueLoadingInformation) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <PulseLoader size={20} />
        <p>{valueLoadingInformation}</p>
      </div>
    );
  }
  if (valueErrorWithdraw) {
    return (
      <S.FlexColumn padding="100px 0 0 0">
        <S2.Text fontSize="22px" fontWeight={600} color="black">
          {String.fromCodePoint(...[9888, 65039])} Whoops, something went wrong.
        </S2.Text>
        <S2.Text
          textAlign="center"
          color="#7d7d7d"
          fontSize="16px"
          fontWeight={500}
          padding="28px 0 32px 0"
        >
          There was an issue processing your request. Please try again or visit
          the{' '}
          <a
            href="https://support.suku.world/how-do-withdrawals-work"
            target="_blank"
            rel="noreferrer"
          >
            Help Page
          </a>{' '}
          if this issue persists.{' '}
        </S2.Text>
        <S2.Button
          type="button"
          style={{ width: '100%' }}
          onClick={() => {
            setErrorWithdraw(null);
          }}
        >
          Try Again
        </S2.Button>
        <S2.SubButton
          type="button"
          style={{ width: '100%' }}
          onClick={() => {
            setErrorWithdraw(null);
            setSelectedAchAccount(null);
          }}
        >
          Select Another Payment Method
        </S2.SubButton>
      </S.FlexColumn>
    );
  }
  if (valueSuccessWithdrawData) {
    const txData = valueSuccessWithdrawData.transactionData;
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <S2.Text
          fontSize="22px"
          textAlign="center"
          fontWeight={800}
          color="black"
        >
          {String.fromCodePoint(0x1f918)} Withdraw Initiated!
        </S2.Text>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 0',
          }}
        >
          <div style={{ display: 'flex', paddingBottom: '5px' }}>
            <S2.Text
              color="#7d7d7d"
              fontSize="16px"
              fontWeight={500}
              textAlign="center"
            >
              Your request to withdraw{' '}
              <S2.Text
                color="black"
                fontSize="16px"
                fontWeight={600}
                textAlign="center"
              >
                ${txData.withdraw.amount}
              </S2.Text>{' '}
              to
            </S2.Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <S2.Text
              color="black"
              fontSize="16px"
              fontWeight={600}
              textAlign="center"
            >
              {' '}
              {txData.withdraw.institution_name}
            </S2.Text>
            <S2.Text
              color="black"
              fontSize="16px"
              fontWeight={500}
              padding="0 5px"
            >
              {' '}
              {txData.withdraw.ach_number}
            </S2.Text>
            <S2.Text
              color="#7d7d7d"
              fontSize="16px"
              fontWeight={500}
              textAlign="center"
            >
              has started.
            </S2.Text>
          </div>
        </div>
        <S2.Button type="button" style={{ width: '100%' }} onClick={onClose}>
          Back to My Wallet
        </S2.Button>
      </div>
    );
  }
  if (valueSelectedAchAccount) {
    return (
      <>
        <div>
          <S.Header>Select the amount</S.Header>
          <S.GrayLine style={{ width: '100%' }} />
        </div>
        <AchAccountDepositForm
          item={valueSelectedAchAccount}
          onError={onError}
          onCancel={() => {
            setSelectedAchAccount(null);
          }}
          onWithdraw={async (item, amount) => {
            setLoadingInformation(
              <span style={{ color: '#7D7D7D' }}>
                Processing your request.
                <br />
                Do not close this window.
              </span>
            );
            return doWithdraw(await getAccessTokenSilently(), item.id, amount)
              .then(setSuccessWithdrawData, setErrorWithdraw)
              .then(() => {
                fetchUserWalletInfo();
                setLoadingInformation(null);
              });
          }}
        />
      </>
    );
  }
  if (valueToDeleteSelected) {
    return (
      <AchAccountItemRemoveConfirm
        item={valueToDeleteSelected}
        onCancel={() => setToDeleteSelected(null)}
        onConfirm={async () =>
          removeAch(await getAccessTokenSilently(), valueToDeleteSelected.id)
            .then(
              () =>
                setAchAccounts((prevState) =>
                  prevState.filter(({ id }) => id !== valueToDeleteSelected.id)
                ),
              () => {}
            )
            .then(() => setToDeleteSelected(null))
        }
      />
    );
  }
  return (
    <>
      <div>
        <div>
          <S.Header>
            {valueIsDeleteMode ? 'Remove account' : 'Withdraw funds to'}
          </S.Header>
          <S.GrayLine style={{ width: '100%' }} />
        </div>
        <p style={{ color: '#7D7D7D' }}>
          {valueIsDeleteMode
            ? 'Select an account to remove'
            : 'Select a bank account to withdraw funds to'}
        </p>
      </div>
      <div
        style={{
          flex: 1,
          maxHeight: 330,
          overflowY: 'auto',
        }}
      >
        {valueAchAccounts.length === 0 ? (
          <span>No banks registered</span>
        ) : (
          valueAchAccounts.map((item) => (
            <AchAccountItem
              key={item.id}
              item={item}
              onWithdraw={valueIsDeleteMode ? undefined : setSelectedAchAccount}
              onRemove={valueIsDeleteMode ? setToDeleteSelected : undefined}
            />
          ))
        )}
      </div>
      {!valueIsDeleteMode ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 36,
          }}
        >
          <S2.AddAccountButton type="button" onClick={onAddNew}>
            <AddIcon style={{ marginRight: 5 }} />
            Add new bank account
          </S2.AddAccountButton>
          {valueAchAccounts?.length > 0 && (
            <S2.AddAccountButton
              type="button"
              onClick={() => setIsDeleteMode((prev) => !prev)}
            >
              <img src={DustbinIcon} alt="dustbin" style={{ marginRight: 5 }} />
              Remove account
            </S2.AddAccountButton>
          )}
        </div>
      ) : (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}
        >
          <S2.SubButton type="button" onClick={() => setIsDeleteMode(false)}>
            Go back
          </S2.SubButton>
        </div>
      )}
    </>
  );
};

AchAccountList.displayName = 'AchAccountList';

export default AchAccountList;
