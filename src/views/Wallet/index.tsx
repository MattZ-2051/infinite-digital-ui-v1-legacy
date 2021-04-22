import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Transaction from "./Transaction";
import DepositModal from "./DepositModal";
import ActiveBids from "./ActiveBids";

const Wallet = () => {
  const [selectedTab, setSelectedTab] = useState<number | undefined>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <Container>
      <PageHeaderContainer>
        <Link to="/marketplace/sdfsdf" style={{ color: "white" }}>
          Back To Profile
        </Link>
        <HeaderText>My Wallet</HeaderText>
      </PageHeaderContainer>
      <PageContentContainer>
        <TotalBalanceContainer>
          <div>
            <Tab style={{ borderBottom: "2px solid black" }}>Total Balance</Tab>
            <GrayLine></GrayLine>
          </div>
          <BalanceAmount>$4500</BalanceAmount>
          <AvailableAmount>
            <AvailableText>Available:</AvailableText>
            $3750 (after active bids)
          </AvailableAmount>
          <div style={{ paddingBottom: "12px", paddingTop: "36px" }}>
            <ActionButton onClick={handleOpen}>Deposit</ActionButton>
          </div>
          <div style={{ paddingTop: "12px" }}>
            <ActionButton>Withdrawal</ActionButton>
          </div>
        </TotalBalanceContainer>
        <LatestTransactionsContainer>
          <div style={{ position: "relative" }}>
            <Tab
              style={{
                borderBottom: `${
                  selectedTab === 0 ? "2px solid black" : "none"
                }`,
                color: `${selectedTab === 0 ? "black" : "#9e9e9e"}`,
              }}
              onClick={() => setSelectedTab(0)}
            >
              Latest Transactions
            </Tab>
            <span style={{ padding: "0 20px" }}></span>
            <Tab
              style={{
                borderBottom: `${
                  selectedTab === 1 ? "2px solid black" : "none"
                }`,
                color: `${selectedTab === 1 ? "black" : "#9e9e9e"}`,
              }}
              onClick={() => setSelectedTab(1)}
            >
              Active Bids
            </Tab>
            <GrayLine style={{ width: "100%" }}></GrayLine>
          </div>
          {selectedTab === 0 && (
            <>
              <Transaction transactionType="cc-deposit" />
              <Transaction transactionType="coinbase" />
              <Transaction transactionType="withdraw" />
              <Transaction transactionType="sale" />
              <Transaction transactionType="purchase" />
            </>
          )}
          {selectedTab === 1 && (
            <>
              <ActiveBids bidType="not-exceeded" />
              <ActiveBids bidType="exceeded" />
            </>
          )}
        </LatestTransactionsContainer>
      </PageContentContainer>
      <DepositModal isModalOpen={isModalOpen} handleClose={handleClose} />
    </Container>
  );
};

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
    outline: none;
  }
`;

const PageHeaderContainer = styled.div`
  background-color: black;
  height: 25%;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 48px;
  justify-content: flex-end;
`;

const TotalBalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px;
`;

const LatestTransactionsContainer = styled.div`
  padding-left: 48px;
  padding: 48px;
`;

const PageContentContainer = styled.div`
  height: 75%;
  display: grid;
  grid-template-columns: 30% 70%;
`;

const HeaderText = styled.span`
  font-size: 30px;
  font-weight: 600;
  padding-top: 32px;
`;

const ActionButton = styled.button`
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

const GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  padding-top: 10px;
  width: 80%;
`;

const AvailableText = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #9e9e9e;
  padding-right: 8px;
`;

export default Wallet;
