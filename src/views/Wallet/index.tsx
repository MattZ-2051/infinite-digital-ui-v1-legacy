import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Transaction from './Transaction';
import DepositModal from './DepositModal';
import ActiveBids from './ActiveBids';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useAppSelector } from 'store/hooks';
import { User } from 'entities/user';
import { getMe, getMyTransactions } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import { ITransaction } from 'entities/transaction';
import KycButton from './KycButton/kycButton';

export const S: any = {};

const Wallet = (props) => {
  const [selectedTab, setSelectedTab] = useState<number | undefined>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const userId = useAppSelector((state) => state.session.user.id);
  const [user, setUser] = useState<User>();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  const username = useAppSelector((state) => state.session.user.username);

  async function fetchUser() {
    const res = await getMe(await getAccessTokenSilently());
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

  return (
    <S.Container>
      <S.PageHeaderContainer>
        <S.Link to={`/collection/${userId}`}>
          {' '}
          <S.BackArrow />
          Back To My Collection
        </S.Link>
        <S.HeaderText>My Wallet</S.HeaderText>
      </S.PageHeaderContainer>
      <S.PageContentContainer>
        <S.TotalBalanceContainer>
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
          <div style={{ paddingTop: '12px' }}>
            <KycButton />
          </div>
        </S.TotalBalanceContainer>
        <S.LatestTransactionsContainer>
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
                  // TODO: Add pagination instead of static limit 5
                  if (index >= 5) return null;
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
      </S.PageContentContainer>
      <DepositModal isModalOpen={isModalOpen} handleClose={handleClose} />
    </S.Container>
  );
};

S.Container = styled.div`
  height: 100vh;
`;

S.Link = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #cbcbcb;
`;

S.BackArrow = styled(ArrowBackIosIcon)`
  font-size: 16px;
  color: #cbcbcb;
  padding-bottom: 2px;
`;

S.BalanceAmount = styled.span`
  padding-top: 15px;
  font-weight: 500;
  font-size: 48px;
`;

S.AvailableAmount = styled.span`
  font-size: 16px;
  font-weight: 400;
`;

S.Tab = styled.span`
  font-weight: 600;
  font-size: 22px;
  line-height: 27.83px;
  padding-bottom: 12px;
  border: none;
  position: relative;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

S.PageHeaderContainer = styled.div`
  background-color: black;
  height: 25%;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 48px;
  justify-content: flex-end;
`;

S.TotalBalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px;
`;

S.LatestTransactionsContainer = styled.div`
  padding-left: 48px;
  padding: 48px;
`;

S.PageContentContainer = styled.div`
  height: 75%;
  display: grid;
  grid-template-columns: 30% 70%;
`;

S.HeaderText = styled.span`
  font-size: 30px;
  font-weight: 600;
  padding-top: 32px;
`;

S.ActionButton = styled.button`
  width: 269px;
  height: 56px;
  color: black;
  background-color: white;
  border: 2px solid black;
  font-weight: 600;
  font-size: 20px;
  border-radius: 35px;
  :hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

S.GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  padding-top: 10px;
  width: 80%;
`;

S.AvailableText = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #9e9e9e;
  padding-right: 8px;
`;

export default Wallet;
