import React, { useState } from 'react'
import styled from 'styled-components'
import Transaction from './Transaction';

const Wallet = () => {

  const [selectedTab, setSelectedTab] = useState<number | undefined>(0)

  return (
    <Container>
      <PageHeaderContainer>
        My Wallet
      </PageHeaderContainer>
      <PageContentContainer>
        <TotalBalanceContainer>
          <div >
            <Tab style={{ borderBottom: '3px solid black' }}>
              Total Balance
            </Tab>
            <div style={{ borderBottom: '3px solid #D8D8D8', paddingTop: '10px' }}></div>
          </div>
          <BalanceAmount>$4500</BalanceAmount>
          <AvailableAmount>
            <span style={{ fontSize: '16px', fontWeight: 400, color: '#9E9E9E', paddingRight: '8px' }}>
              Available:
            </span>
              $3750 (after active bids)
          </AvailableAmount>
          <div style={{ paddingBottom: '12px', paddingTop: '36px' }}>
            <ActionButton>
              Deposit
          </ActionButton>
          </div>
          <div style={{ paddingTop: '12px' }}>
            <ActionButton>
              Withdrawal
          </ActionButton>
          </div>
        </TotalBalanceContainer>
        <LatestTransactionsContainer>
          <div style={{ position: 'relative' }}>
            <Tab
              style={{ borderBottom: `${selectedTab === 0 ? '3px solid black' : 'none'}`, color: `${selectedTab === 0 ? 'black' : '#9e9e9e'}` }}
              onClick={() => setSelectedTab(0)}
            >
              Latest Transactions
              </Tab>
            <span style={{ padding: '0 20px' }}></span>
            <Tab
              style={{ borderBottom: `${selectedTab === 1 ? '3px solid black' : 'none'}`, color: `${selectedTab === 1 ? 'black' : '#9e9e9e'}` }}
              onClick={() => setSelectedTab(1)}
            >
              Active Bids
              </Tab>
            <div style={{ borderBottom: '3px solid #D8D8D8', width: '100%', paddingTop: '10px' }}></div>
          </div>
          <Transaction />
          <Transaction />
          <Transaction />
        </LatestTransactionsContainer>
      </PageContentContainer>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
`;

const BalanceAmount = styled.span`
  padding-top: 15px;
  font-weight: 500;
  font-size: 48px;
`;

const AvailableAmount = styled.span`
  font-size: 16px;
  font-weight: 400;
`;

const Tab = styled.span`
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
    outline: none
  }
`;

const PageHeaderContainer = styled.div`
  background-color: black;
  height: 30%;
  color: white;
`;

const TotalBalanceContainer = styled.div`
  background-color: #F4F4F4;
  padding: 48px;
  display: flex;
  flex-direction: column;
`;

const LatestTransactionsContainer = styled.div`
  padding: 48px;
`;

const PageContentContainer = styled.div`
  height: 70%;
  display: grid;
  grid-template-columns: 30% 70%;
`;

const ActionButton = styled.button`
  width: 269px;
  height 56px;
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

`;

export default Wallet;
