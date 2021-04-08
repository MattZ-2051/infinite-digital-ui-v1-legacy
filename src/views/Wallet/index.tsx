import React from 'react'
import styled from 'styled-components'

const Wallet = () => {

  return (
    <Container>
      <PageHeaderContainer>
        My Wallet
      </PageHeaderContainer>
      <PageContentContainer>
        <TotalBalanceContainer>
          Total Balance
        </TotalBalanceContainer>
        <LatestTransactionsContainer>Latest Transactions</LatestTransactionsContainer>
      </PageContentContainer>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
`;

const PageHeaderContainer = styled.div`
  background-color: black;
  height: 30%;
  color: white;
`;

const TotalBalanceContainer = styled.div`
  background-color: #f9f9f9;
  padding: 48px;
`;

const LatestTransactionsContainer = styled.div`
  padding: 48px;
`;

const PageContentContainer = styled.div`
  height: 70%;
  display: grid;
  grid-template-columns: 30% 70%;
`;


export default Wallet;
