import styled from "styled-components/macro";
import circleIcon from "assets/img/icons/circle-icon-deposit.png";
import exitIcon from "assets/img/icons/exit-icon.png";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Container } from "../index";

interface IProps {
  existingCard?: boolean;
}

const S: any = {};

const AddFunds = ({ existingCard }: IProps) => {
  return (
    <Container>
      <S.ContentContainer>
        <S.Row
          style={{ borderBottom: "2px solid black", paddingBottom: "16px" }}
        >
          <S.HeaderDiv>
            <img src={circleIcon} alt="" />
            <S.HeaderText>Circle Payments</S.HeaderText>
          </S.HeaderDiv>
          <img src={exitIcon} alt="" />
        </S.Row>
        <div style={{ paddingTop: "25px" }}>
          <S.AddFundsText>Add funds into your wallet</S.AddFundsText>
        </div>
        <S.CardContainer>
          <S.CreditCard
            name="John Doe"
            expiry="04/20"
            focus=""
            number="4901490149014901"
          />
        </S.CardContainer>
        <S.Row>
          <div>
            <span>Credit Card</span>
            <span style={{ color: "green", paddingLeft: "5px" }}>(Active)</span>
          </div>
          <span style={{ fontSize: "16px", color: "#7d7d7d" }}>
            Remove Card
          </span>
        </S.Row>
        <div style={{ padding: "25px 0" }}>
          <S.DollarSign>$</S.DollarSign>
          <S.AmountInput placeholder="Enter Amount" />
        </div>
        <S.AddFundsButton>Add Funds</S.AddFundsButton>
      </S.ContentContainer>
    </Container>
  );
};

S.CreditCard = styled(Cards)`
  .rccs__card__background {
    background: black !important;
  }
`;

S.DollarSign = styled.span`
  color: #7d7d7d;
  font-size: 16px;
  padding-right: 10px;
`;

S.AmountInput = styled.input`
  border: none;
  font-size: 16px;
  :focus {
    outline: none;
  }
`;

S.CardContainer = styled.div`
  padding: 25px 0;
`;

S.AddFundsText = styled.span`
  font-size: 16px;
  color: #7d7d7d;
`;

S.HeaderText = styled.span`
  font-size: 22px;
  padding-left: 18px;
  font-weigth: 600;
`;

S.HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.ContentContainer = styled.div`
  width: 410px;
  // background-color: white;
`;

S.AddFundsButton = styled.button`
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

export default AddFunds;
