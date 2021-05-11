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

const Wallet = (props) => {
  const [selectedTab, setSelectedTab] = useState<number | undefined>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const [user, setUser] = useState<User>();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const [showMore, setShowMore] = useState<boolean>(false);
  const { username, id: userId } = useAppSelector(
    (state) => state.session.user
  );
  const { kycPending, kycMaxLevel } = useAppSelector(
    (state) => state.session.userCards
  );

  async function fetchUser() {
    const res = await getMe(await getAccessTokenSilently());
    dispatch(getUserCardsThunk({ token: await getAccessTokenSilently() }));
    setUser(res);
  }

  async function fetchTransactions() {
    const res = await getMyTransactions(await getAccessTokenSilently());
    setTransactions(res);
  }

  useEffect(() => {
    fetchUser();
    fetchTransactions();
    if (props?.location?.state?.modalOpen) {
      setIsModalOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleShowChange = () => {
    setShowMore(!showMore);
  };

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

          <S.BalanceAmount>${user?.balance}</S.BalanceAmount>

          <S.AvailableAmount>
            <S.AvailableText>Available:</S.AvailableText>$
            {user?.availableBalance} (after active bids)
          </S.AvailableAmount>

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
          <S.LatestTransactionsContainer overflow={showMore} id="test">
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
            {selectedTab === 0 && (
              <>
                {transactions &&
                  transactions.map((tx, index) => {
                    if (tx.type !== ('purchase' || 'deposit' || 'sale')) {
                      return null;
                    } else {
                      return <Transaction tx={tx} key={index} />;
                    }
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
            {transactions.length > 5 && (
              <S.SeeMore onClick={handleShowChange}>
                {(showMore && 'See Less') || 'Show More'}
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
