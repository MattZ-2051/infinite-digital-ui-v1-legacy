import React, { useEffect } from 'react';
import { useState } from 'react';
import Transaction from './Transaction';
import DepositModal from './DepositModal';
import WhitdrawModal from './WithdrawModal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getMyTransactions } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import {
  getUserCardsThunk,
  getUserInfoThunk,
} from 'store/session/sessionThunks';
import { ITransaction } from 'entities/transaction';
import MuiDivider from '@material-ui/core/Divider';
import * as S from './styles';
import PageLoader from 'components/PageLoader';
import styled from 'styled-components/macro';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListBids from './ActiveBids';
import KycButton from './KycButton/kycButton';
import SortByFilter from 'views/MarketPlace/components/Filters/SortByFilter';
const PER_PAGE = 5;

const Wallet = (props) => {
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState<boolean>(
    false
  );
  const user = useAppSelector((state) => state.session.user);
  const [transactions, setTransactions] = useState<{
    data: ITransaction[];
    total: number;
  } | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  // const [showMore, setShowMore] = useState<boolean>(true);
  // const [isElOverflown, setIsElOverflown] = useState<boolean>(false);
  const [valueCurrentPage, setCurrentPage] = useState<number>(1);
  const [transactionsLoading, setTransactionsLoading] = useState<boolean>(true);

  const [sortByTransactions, setSortByTransactions] = useState<
    'newest' | 'oldest'
  >('newest');
  const [sortByActiveBids, setSortByActiveBids] = useState<'newest' | 'oldest'>(
    'newest'
  );
  // const documentElement = document.getElementById('tx');

  const { username: username } = useAppSelector((state) => state.session.user);

  const { kycPending, kycMaxLevel } = useAppSelector(
    (state) => state.session.userCards
  );

  async function fetchUser() {
    dispatch(getUserInfoThunk({ token: await getAccessTokenSilently() }));
    dispatch(getUserCardsThunk({ token: await getAccessTokenSilently() }));
  }

  async function fetchTransactions(page: number, sortByTransactions?: string) {
    setTransactionsLoading(true);
    const res = await getMyTransactions(
      await getAccessTokenSilently(),
      page,
      PER_PAGE,
      {
        $or: [
          {
            type: {
              $in: ['purchase', 'deposit'],
            },
            status: { $exists: true },
          },
          {
            type: 'sale',
          },
          {
            type: 'royalty_fee',
          },
          {
            type: 'withdrawal',
          },
        ],
      },
      sortByTransactions
    );
    setTransactions(res);
    setTransactionsLoading(false);
  }

  useEffect(() => {
    fetchUser();
    if (props?.location?.state?.modalOpen) {
      setIsModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (selectedTab === 0) {
      fetchTransactions(valueCurrentPage, sortByTransactions);
    }
  }, [valueCurrentPage, sortByTransactions, selectedTab]);

  // useEffect(() => {
  //   if (documentElement) {
  //     setIsElOverflown(isOverflown(documentElement));
  //   }
  // }, [documentElement]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseWithdraw = () => {
    setIsWithdrawModalOpen(false);
  };

  const handleOpenWithdraw = () => {
    setIsWithdrawModalOpen(true);
  };

  // const handleShowChange = () => {
  //   setShowMore(!showMore);
  // };

  // const filteredTransactions = transactions.filter((tx, index) => {
  //   if (
  //     ((tx.type === 'purchase' || tx.type === 'deposit') &&
  //       (tx.status === 'pending' ||
  //         tx.status === 'success' ||
  //         tx.status === 'error')) ||
  //     tx.type === 'sale' ||
  //     tx.type === 'royalty_fee'
  //   ) {
  //     return tx;
  //   }
  // });

  // function isOverflown(element) {
  //   return (
  //     element.scrollHeight > element.clientHeight ||
  //     element.scrollWidth > element.clientWidth
  //   );
  // }

  if (!user) return <PageLoader />;

  return (
    <S.Container
      showMore={true}
      // showMore={showMore}
    >
      <S.Header>
        <S.HeaderContent>
          <S.Link to={`/collection/${username}`}>
            {' '}
            <S.BackArrow />
            Back To My Collection
          </S.Link>
          <S.HeaderText>My Wallet</S.HeaderText>
        </S.HeaderContent>
      </S.Header>

      <S.Main>
        <S.Body>
          <S.LeftCol>
            <div>
              <S.Tab style={{ borderBottom: '2px solid black' }}>
                Total Balance
              </S.Tab>
              <S.GrayLine />
            </div>

            <S.BalanceAmount>
              ${parseFloat(user?.balance).toFixed(2)}
            </S.BalanceAmount>

            <S.Available>
              <S.AvailableText>Available:</S.AvailableText>
              <S.AvailableAmount>
                {/* ToDo: Move availableBalance to wallet endpoint */}$
                {user?.availableBalance?.toFixed(2)}
                <S.AvailableSubText>
                  (Excludes pending transactions)
                </S.AvailableSubText>
              </S.AvailableAmount>
            </S.Available>

            <S.Available>
              <S.AvailableText>Withdrawable:</S.AvailableText>
              <S.AvailableAmount>
                {/* ToDo: Move availableBalance to wallet endpoint */}$
                {user?.balances?.ccWithdrawablesLock}
                <S.AvailableSubText>
                  (Excludes pending transactions)
                </S.AvailableSubText>
              </S.AvailableAmount>
            </S.Available>

            <div style={{ paddingTop: '36px' }}>
              <S.ActionButton onClick={handleOpen}>Deposit</S.ActionButton>
            </div>

            <div style={{ paddingTop: '12px' }}>
              <S.ActionButton onClick={handleOpenWithdraw}>
                Withdrawal
              </S.ActionButton>
            </div>

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
                  Transaction History
                </S.Tab>
                <span style={{ padding: '0 20px' }} />
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
                </S.Tab>
                <div style={{ float: 'right' }}>
                  <SortByFilter
                    handleSort={(value) =>
                      selectedTab === 0
                        ? setSortByTransactions(value)
                        : setSortByActiveBids(value)
                    }
                    activeSort={
                      selectedTab === 0 ? sortByTransactions : sortByActiveBids
                    }
                    options={[
                      { value: 'newest', name: 'Newest' },
                      { value: 'oldest', name: 'Oldest' },
                    ]}
                  />
                </div>
                <S.GrayLine style={{ width: '100%' }} />
              </div>
            </S.TabContainer>
            <S.LatestTransactionsContainer
              // overflow={showMore}
              // overflow={true}
              id="tx"
            >
              {selectedTab === 0 && (
                <S.Content>
                  {transactionsLoading || !transactions ? (
                    <PageLoader size={15} />
                  ) : !transactions.data.length ? (
                    <S.NoResults>
                      <p>No transactions yet</p>
                    </S.NoResults>
                  ) : (
                    <>
                      <S.ProductsGrid>
                        {transactions.data.map((tx, index) => {
                          return <Transaction tx={tx} key={index} />;
                        })}
                      </S.ProductsGrid>
                      <S.PaginationContainer>
                        <Pagination
                          count={Math.ceil(transactions.total / PER_PAGE)}
                          page={valueCurrentPage}
                          onChange={(ev, page) => setCurrentPage(page)}
                          siblingCount={matchesMobile ? 0 : 1}
                        />
                      </S.PaginationContainer>
                    </>
                  )}
                </S.Content>
              )}

              {selectedTab === 1 && <ListBids sortBy={sortByActiveBids} />}
            </S.LatestTransactionsContainer>
            {/*<S.FlexRow>*/}
            {/*  {isElOverflown && (*/}
            {/*    <S.SeeMore onClick={handleShowChange}>*/}
            {/*      {(showMore && '- View Less') || '+ View All'}*/}
            {/*    </S.SeeMore>*/}
            {/*  )}*/}
            {/*</S.FlexRow>*/}
          </S.RightCol>
        </S.Body>
      </S.Main>

      <DepositModal
        kycMaxLevel={kycMaxLevel}
        kycPending={kycPending}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />
      <WhitdrawModal
        isModalOpen={isWithdrawModalOpen}
        handleClose={handleCloseWithdraw}
      />
    </S.Container>
  );
};

export default Wallet;
