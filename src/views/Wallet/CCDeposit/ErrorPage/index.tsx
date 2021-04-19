import styled from "styled-components/macro";
import Emoji from "components/Emoji";
import { Row, Container } from "../index";

const S: any = {};

const ErrorPage = () => {
  return (
    <Container>
      <S.ContentContainer>
        <Row>
          <Emoji symbol="⚠️" />
          <S.HeaderText style={{ paddingLeft: "5px" }}>
            Whoops, something went wrong.
          </S.HeaderText>
        </Row>
        <Row style={{ flexDirection: "column", padding: "25px 0" }}>
          <span style={{ color: "#7d7d7d", fontSize: "16px" }}>
            We couln’t process your payment and the
          </span>
          <span style={{ color: "#7d7d7d", fontSize: "16px" }}>
            transaction was cancelled.
          </span>
        </Row>
        <div style={{ paddingBottom: "25px" }}>
          <S.MarketPlaceButton>Try Again</S.MarketPlaceButton>
        </div>
        <Row>
          <span style={{ fontSize: "20px", fontWeight: 600 }}>
            Select Another Payment Method
          </span>
        </Row>
      </S.ContentContainer>
    </Container>
  );
};

S.ContentContainer = styled.div`
  width: 410px;
  // background-color: white;
`;

S.MarketPlaceButton = styled.button`
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

S.HeaderText = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

export default ErrorPage;
