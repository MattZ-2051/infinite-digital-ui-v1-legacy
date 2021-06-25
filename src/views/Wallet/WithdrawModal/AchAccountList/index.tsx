import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PulseLoader } from 'react-spinners';
import { IPlaidAccount } from 'entities/plaidAccount';
import { doWithdraw } from 'services/api/walletService';
import { getAchAccounts, removeAch } from 'services/api/walletService';
import AchAccountItem from './AchAccountItem';
import AchAccountDepositForm from '../AchAccountDepositForm';
import * as S from '../../DepositModal/styles';
import * as S2 from '../styles';
import AddIcon from '@material-ui/icons/Add';
import DustbinIcon from 'assets/svg/icons/dustbin.svg';
import AchAccountItemRemoveConfirm from './AchAccountItemRemoveConfirm';
import { IWithdraw } from '../../../../entities/withdraw';
// import { ReactComponent as DustbinIcon } from 'assets/svg/icons/dustbin.svg';

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
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <span
          style={{
            fontSize: 22,
            textAlign: 'center',
            lineHeight: '28px',
            fontWeight: 600,
          }}
        >
          {String.fromCodePoint(...[9888, 65039])} Whoops, something went wrong.
        </span>
        <p style={{ textAlign: 'center', color: '#7D7D7D' }}>
          Lorem ipsum dolor sit amet, consectetur ipsum dolor sit amet,
          adipiscing consectetur.
        </p>
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
      </div>
    );
  }
  if (valueSuccessWithdrawData) {
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
        <span
          style={{
            fontSize: 22,
            textAlign: 'center',
            lineHeight: '28px',
            fontWeight: 800,
          }}
        >
          {String.fromCodePoint(0x1f918)} Successful withdraw!
        </span>
        <p style={{ textAlign: 'center', color: '#7D7D7D' }}>
          Lorem ipsum dolor sit amet, consectetur ipsum dolor sit amet,
          adipiscing consectetur.
        </p>
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
            {valueIsDeleteMode
              ? 'Remove account'
              : 'Select a payment to withdraw to'}
          </S.Header>
          <S.GrayLine style={{ width: '100%' }} />
        </div>
        <p style={{ color: '#7D7D7D' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
          <S2.AddAccountButton
            type="button"
            onClick={() => setIsDeleteMode((prev) => !prev)}
          >
            <img src={DustbinIcon} alt="dustbin" style={{ marginRight: 5 }} />
            Remove account
          </S2.AddAccountButton>
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
