import React from 'react'
import styled from 'styled-components'
import Transaction from './Transaction';

const Wallet = () => {

  return (
    <Container>
      <PageHeaderContainer>
        My Wallet
      </PageHeaderContainer>
      <PageContentContainer>
        <TotalBalanceContainer>
          <div>
            <SectionTitle>Total Balance</SectionTitle>
            <div style={{ borderBottom: '3px solid #D8D8D8', paddingTop: '10px' }}>
            </div>
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
          <div>
            <SectionTitle>Latest Transactions</SectionTitle>
            <div style={{ borderBottom: '3px solid #D8D8D8', paddingTop: '10px' }}>
            </div>
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

const SectionTitle = styled.span`
  font-weight: 600;
  font-size: 22px;
  line-height: 27.83px;
  border-bottom: 3px solid black;
  padding-bottom: 12px;
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
