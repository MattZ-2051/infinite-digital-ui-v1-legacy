import styled from "styled-components/macro";
import SuccessPage from "./SuccessPage";
import ErrorPage from "./ErrorPage";
import AddFunds from "./AddFunds";
import circleIcon from "assets/img/icons/circle-icon-deposit.png";
import exitIcon from "assets/img/icons/exit-icon.png";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

interface IProps {
  existingCard?: boolean;
}

const CCDeposit = ({ existingCard }: IProps) => {
  return (
    <Container>
      <ContentContainer>
        <Row style={{ borderBottom: "2px solid black", paddingBottom: "16px" }}>
          <HeaderDiv>
            <img src={circleIcon} alt="" />
            <HeaderText>Circle Payments</HeaderText>
          </HeaderDiv>
          <img src={exitIcon} alt="" />
        </Row>
        <div style={{ paddingTop: "25px" }}>
          <AddFundsText>Add funds into your wallet</AddFundsText>
        </div>
        <CardContainer>
          <Cards
            name="John Doe"
            expiry="04/20"
            focus=""
            number="4901490149014901"
          />
        </CardContainer>
        <Row>
          <div>
            <span>Credit Card</span>
            <span style={{ color: "green", paddingLeft: "5px" }}>(Active)</span>
          </div>
          <span style={{ fontSize: "16px", color: "#7d7d7d" }}>
            Remove Card
          </span>
        </Row>
        <div style={{ padding: "25px 0" }}>
          <DollarSign>$</DollarSign>
          <AmountInput placeholder="Enter Amount" />
        </div>
        <AddFundsButton>Add Funds</AddFundsButton>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  // background-color: lightgray;
`;

const DollarSign = styled.span`
  color: #7d7d7d;
  font-size: 16px;
  padding-right: 10px;
`;

const AmountInput = styled.input`
  border: none;
  font-size: 16px;
  :focus {
    outline: none;
  }
`;

const CardContainer = styled.div`
  padding: 25px 0;
`;

const AddFundsText = styled.span`
  font-size: 16px;
  color: #7d7d7d;
`;

const HeaderText = styled.span`
  font-size: 22px;
  padding-left: 18px;
  font-weigth: 600;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 410px;
  height: 500px;
  // background-color: white;
`;

const AddFundsButton = styled.button`
  width: 410px;
  height: 56px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 35px;
  font-size: 20px;
  font-weigth: 600;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export default CCDeposit;
