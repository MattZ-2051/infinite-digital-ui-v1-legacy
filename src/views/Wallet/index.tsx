import { useEffect } from 'react';
import { useState } from 'react';
import Transaction from './Transaction';
import DepositModal from './DepositModal';
import ActiveBids from './ActiveBids';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { User } from 'entities/user';
import { getMe, getMyTransactions } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserCardsThunk } from 'store/session/sessionThunks';
import { ITransaction } from 'entities/transaction';
import MuiDivider from '@material-ui/core/Divider';
import KycButton from './KycButton/kycButton';
import * as S from './styles';
import PageLoader from 'components/PageLoader';

const Wallet = (props) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [user, setUser] = useState<User>();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isElOverflown, setIsElOverflown] = useState<boolean>(false);
  const [transactionsLoading, setTransactionsLoading] = useState<boolean>(true);
  const documentElement = document.getElementById('tx');

  const walletCurrency = useAppSelector(
    (state) => state.session.userCards?.balance?.currency
  );
  const { username, id: userId } = useAppSelector(
    (state) => state.session.user
  );
  const user = useAppSelector((state) => state.session.user);
  const { kycPending, kycMaxLevel } = useAppSelector(
    (state) => state.session.userCards
  );

  async function fetchUser() {
    // const res = await getMe(await getAccessTokenSilently());
    dispatch(getUserCardsThunk({ token: await getAccessTokenSilently() }));
    // setUser(res);
  }

  async function fetchTransactions() {
    const res = await getMyTransactions(await getAccessTokenSilently());
    setTransactions(res);

    setTransactionsLoading(false);
  }

  useEffect(() => {
    fetchUser();
    fetchTransactions();
    if (props?.location?.state?.modalOpen) {
      setIsModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (documentElement) {
      setIsElOverflown(isOverflown(documentElement));
    }
  }, [documentElement]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleShowChange = () => {
    setShowMore(!showMore);
  };

  const filteredTransactions = transactions.filter((tx, index) => {
    if (
      ((tx.type === 'purchase' || tx.type === 'deposit') &&
        (tx.status === 'pending' ||
          tx.status === 'success' ||
          tx.status === 'error')) ||
      tx.type === 'sale'
    ) {
      return tx;
    }
  });

  function isOverflown(element) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  if (!user || !transactions) return <PageLoader />;

  return (
    <S.Container showMore={showMore}>
      <S.Header>
        <S.Link to={`/collection/${userId}`}>
          {' '}
          <S.BackArrow />
          Back To My Collection
        </S.Link>
        <S.HeaderText>My Wallet</S.HeaderText>
      </S.Header>

      <S.Main>
        <S.LeftCol>
          <div>
            <S.Tab style={{ borderBottom: '2px solid black' }}>
              Total Balance
            </S.Tab>
            <S.GrayLine></S.GrayLine>
          </div>

          <S.BalanceAmount>${user?.balance.toFixed(2)}</S.BalanceAmount>

          <S.Available>
            <S.AvailableText>Available:</S.AvailableText>
            <S.AvailableAmount>
              ${user?.availableBalance?.toFixed(2)}
              <S.AvailableSubText>
                (Excludes pending transactions)
              </S.AvailableSubText>
            </S.AvailableAmount>
          </S.Available>

          <div style={{ paddingTop: '36px' }}>
            <S.ActionButton onClick={handleOpen}>Deposit</S.ActionButton>
          </div>

          {/*  Temporary Hide feature will be enabled Post-MVP

          <div style={{ paddingTop: '12px' }}>
            <S.ActionButton>Withdrawal</S.ActionButton>
          </div> */}

          <MuiDivider style={{ margin: '20px 0 20px 0' }} />

          <div>
            Account Verification Status: <br />
            <KycButton kycPending={kycPending} kycMaxLevel={kycMaxLevel} />
          </div>
        </S.LeftCol>

        <S.RightCol>
          <S.TabContainer>
            <div style={{ position: 'relative' }}>
              <S.Tab
                style={{
                  borderBottom: `${
                    selectedTab === 0 ? '2px solid black' : 'none'
                  }`,
                  color: `${selectedTab === 0 ? 'black' : '#9e9e9e'}`,
                }}
                onClick={() => setSelectedTab(0)}
              >
                Latest Transactions
              </S.Tab>
              <span style={{ padding: '0 20px' }}></span>
              {/* Temporary Hide feature will be enabled Post-MVP

            <S.Tab
              style={{
                borderBottom: `${
                  selectedTab === 1 ? '2px solid black' : 'none'
                }`,
                color: `${selectedTab === 1 ? 'black' : '#9e9e9e'}`,
              }}
              onClick={() => setSelectedTab(1)}
            >
              Active Bids
            </S.Tab> */}
              <S.GrayLine style={{ width: '100%' }}></S.GrayLine>
            </div>
          </S.TabContainer>
          <S.LatestTransactionsContainer overflow={showMore} id="tx">
            {selectedTab === 0 && (
              <>
                {transactionsLoading ? (
                  <PageLoader size={15} />
                ) : (
                  filteredTransactions &&
                  filteredTransactions.map((tx, index) => {
                    return <Transaction tx={tx} key={index} />;
                  })
                )}
                {filteredTransactions &&
                  filteredTransactions.map((tx, index) => {
                    return <Transaction tx={tx} key={index} />;
                  })}
              </>
            )}
            {/*  Temporary Hide feature will be enabled Post-MVP

          {selectedTab === 1 && (
            <>
              <ActiveBids bidType="not-exceeded" />
              <ActiveBids bidType="exceeded" />
            </>
          )} */}
          </S.LatestTransactionsContainer>
          <S.FlexRow>
            {isElOverflown && (
              <S.SeeMore onClick={handleShowChange}>
                {(showMore && '- View Less') || '+ View All'}
              </S.SeeMore>
            )}
          </S.FlexRow>
        </S.RightCol>
      </S.Main>

      <DepositModal
        kycMaxLevel={kycMaxLevel}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />
    </S.Container>
  );
};

export default Wallet;
