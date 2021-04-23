import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import Emoji from 'components/Emoji';
import { Row, Container } from '../index';

const S: any = {};

const SuccessPage = () => {
  const history = useHistory();

  const handleMarketplaceRedirect = () => {
    history.push('/marketplace');
  };

  const handleWalletRedirect = () => {
    history.push('/wallet/username');
  };
  return (
    <Container>
      <S.ContentContainer>
        <Row>
          <Emoji symbol="🤘" />
          <S.HeaderText>Yeah! Funds added.</S.HeaderText>
        </Row>
        <Row style={{ padding: '10px 0' }}>
          <S.BalanceText>Your balance is $1800 now</S.BalanceText>
        </Row>
        <Row style={{ flexDirection: 'column' }}>
          <S.Text>Check your open tabs to refresh your previous screen</S.Text>
          <S.Text>to see your added funds.</S.Text>
          <S.Text style={{ paddingTop: '8px' }}>or</S.Text>
        </Row>
        <div style={{ padding: '25px 0' }}>
          <S.MarketPlaceButton onClick={handleMarketplaceRedirect}>
            Go to Marketplace
          </S.MarketPlaceButton>
        </div>
        <Row>
          <S.WalletButton onClick={handleWalletRedirect}>
            View Wallet
          </S.WalletButton>
        </Row>
      </S.ContentContainer>
    </Container>
  );
};

S.ContentContainer = styled.div`
  width: 410px;
  // background-color: white;
`;

S.WalletButton = styled.span`
  font-size: 20px;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
`;

S.Text = styled.span`
  color: #7d7d7d;
  font-size: 16px;
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

S.BalanceText = styled.span`
  color: #00c44f;
  font-size: 16px;
`;

export default SuccessPage;
