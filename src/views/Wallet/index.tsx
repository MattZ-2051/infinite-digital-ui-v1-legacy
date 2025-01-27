import React, { useEffect, useState } from 'react';
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
import ListBids from './ActiveBids';
import KycButton from './KycButton/kycButton';
import LatestTransactions from './LatestTransactions';
import depositIconWhite from 'assets/svg/icons/deposit-funds-white.svg';
import depositIconBlack from 'assets/svg/icons/deposit-funds-black.svg';
import withdrawIconWhite from 'assets/svg/icons/withdraw-funds-white.svg';
import withdrawIconBlack from 'assets/svg/icons/withdraw-funds-black.svg';
import ButtonTextAndImage from './Components/ButtonTextAndImage/buttonTextAndImage';
import TextAndAmount from './Components/TextAndAmount/textAndAmount';
import TabHeaderOptions from './Components/TabHeaderOptions/tabHeaderOptions';
import { useKycClient } from '../../hooks/useKycClient';
import Toast from 'utils/Toast';

const Wallet = (props) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] =
    useState<boolean>(false);
  const user = useAppSelector((state) => state.session.user);
  const [transactions, setTransactions] = useState<{
    data: ITransaction[];
    total: number;
  } | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const [valueCurrentPage, setCurrentPage] = useState<number>(1);
  const [transactionsLoading, setTransactionsLoading] = useState<boolean>(true);
  const kycClient = useKycClient();

  const [sortByTransactions, setSortByTransactions] = useState<
    'newest' | 'oldest'
  >('newest');
  const [sortByActiveBids, setSortByActiveBids] = useState<'newest' | 'oldest'>(
    'newest'
  );

  const { username: username } = useAppSelector((state) => state.session.user);

  const { kycPending, kycMaxLevel, kycRequired } = useAppSelector(
    (state) => state.session.userCards
  );
  const PER_PAGE = 5;

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
          {
            type: 'nft_redeem',
          },
          {
            type: 'claim',
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
    if (kycRequired) {
      kycClient?.open();
    }
  }, [kycRequired, kycClient]);

  useEffect(() => {
    if (selectedTab === 0) {
      fetchTransactions(valueCurrentPage, sortByTransactions);
    }
  }, [
    valueCurrentPage,
    sortByTransactions,
    selectedTab,
    isModalOpen,
    isWithdrawModalOpen,
  ]);

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
    Toast.warning('Withdrawals are temporarily disabled.');
    // setIsWithdrawModalOpen(true);
  };

  if (!user) return <PageLoader />;
  const getUserTotalBalance = () => {
    return parseFloat(user?.balance).toFixed(2);
  };
  const getUserAvailableBalance = () => {
    return parseFloat(user?.availableBalance).toFixed(2);
  };
  const getUserWithdrawableBalance = () => {
    return parseFloat(user?.balances?.ccWithdrawablesLock).toFixed(2);
  };
  const screenMinHeight = () => {
    return { minHeight: window.innerHeight - 320 };
  };
  return (
    <S.Container showMore={true}>
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

      <S.Main style={screenMinHeight()}>
        <S.Body>
          <S.LeftCol>
            <div style={{ width: '100%' }}>
              <S.Tab style={{ borderBottom: '2px solid black' }}>
                Total Balance
              </S.Tab>
              <S.GrayLine />
            </div>

            <S.BalanceAmount>${getUserTotalBalance()}</S.BalanceAmount>

            <TextAndAmount
              text={'Available:'}
              amount={getUserAvailableBalance()}
              subtitle={'(Excludes pending transactions and active bids)'}
            />
            <ButtonTextAndImage
              text={'Deposit'}
              handlerOnClick={handleOpen}
              hoverIcon={depositIconBlack}
              normalIcon={depositIconWhite}
            />
            <TextAndAmount
              text={'Withdrawable:'}
              amount={getUserWithdrawableBalance()}
              subtitle={
                '(Excludes pending transactions and credit card payments less than 30 days old)'
              }
            />
            <ButtonTextAndImage
              disabled={true}
              text={'Withdrawal'}
              handlerOnClick={handleOpenWithdraw}
              hoverIcon={withdrawIconBlack}
              normalIcon={withdrawIconWhite}
            />

            <MuiDivider style={{ margin: '32px 0 24px 0', width: '89%' }} />

            <div>
              <S.GreyBigText>
                Account Verification Status: <br />
              </S.GreyBigText>
              <KycButton kycPending={kycPending} kycMaxLevel={kycMaxLevel} />
            </div>
          </S.LeftCol>

          <S.RightCol>
            <S.TabContainer>
              <TabHeaderOptions
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
                sortByTransactions={sortByTransactions}
                sortByActiveBids={sortByActiveBids}
                setSortByTransactions={setSortByTransactions}
                setSortByActiveBids={setSortByActiveBids}
              />
              <S.GrayLine style={{ width: '100%', paddingTop: '4px' }} />
            </S.TabContainer>
            <S.GridContainer id="tx">
              {selectedTab === 0 && (
                <LatestTransactions
                  transactionsLoading={transactionsLoading}
                  transactions={transactions}
                  perPage={PER_PAGE}
                  valueCurrentPage={valueCurrentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}

              {selectedTab === 1 && <ListBids sortBy={sortByActiveBids} />}
            </S.GridContainer>
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
