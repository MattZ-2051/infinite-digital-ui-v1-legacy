import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import Emoji from 'components/Emoji';
import { Row, Container } from '../index';
import { useAppSelector } from 'hooks/store';

const S: any = {};

const ErrorPage = () => {
  const history = useHistory();
  const username = useAppSelector((state) => state.session.user.username);
  const handleRedirectToWallet = () => {
    history.push(`/wallet/${username}`);
  };

  const handleRedirectToAddFunds = () => {
    history.push(`/wallet/${username}/deposit/addfunds`);
  };
  return (
    <Container>
      <S.ContentContainer>
        <Row>
          <Emoji symbol="⚠️" />
          <S.HeaderText style={{ paddingLeft: '5px' }}>
            Whoops, something went wrong.
          </S.HeaderText>
        </Row>
        <Row style={{ flexDirection: 'column', padding: '25px 0' }}>
          <S.Text>We couln’t process your payment and the</S.Text>
          <S.Text>transaction was cancelled.</S.Text>
        </Row>
        <div style={{ paddingBottom: '25px' }}>
          <S.MarketPlaceButton onClick={handleRedirectToAddFunds}>
            Try Again
          </S.MarketPlaceButton>
        </div>
        <Row>
          <S.OtherPaymenButton onClick={handleRedirectToWallet}>
            Select Another Payment Method
          </S.OtherPaymenButton>
        </Row>
      </S.ContentContainer>
    </Container>
  );
};

S.ContentContainer = styled.div`
  width: 410px;
  // background-color: white;
`;

S.Text = styled.span`
  color: #7d7d7d;
  font-size: 16px;
`;

S.OtherPaymenButton = styled.span`
  font-size: 20px;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
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
