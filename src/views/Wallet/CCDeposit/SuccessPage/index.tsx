import React from 'react';
import { useHistory } from 'react-router-dom';
import Emoji from 'components/Emoji';
import { Row, Container, Padding } from '../styles';
import * as S from './styles';
import { useAppSelector } from 'store/hooks';

const SuccessPage = () => {
  const history = useHistory();
  const userBalance = useAppSelector(
    (state) => state.session.userCards.balance
  );

  const handleMarketplaceRedirect = () => {
    history.push('/marketplace');
  };

  const handleWalletRedirect = () => {
    history.push(`/wallet`);
  };
  return (
    <Container>
      <S.ContentContainer>
        <Row>
          <Emoji symbol="🤘" />
          <S.HeaderText>Yeah! Funds added.</S.HeaderText>
        </Row>
        <Row style={{ padding: '10px 0' }}>
          <S.BalanceText>
            Your balance is now {userBalance.amount} in {userBalance.currency}
          </S.BalanceText>
        </Row>
        <Row style={{ flexDirection: 'column' }}>
          <S.Text>Check your open tabs to refresh your previous screen</S.Text>
          <S.Text>to see your added funds.</S.Text>
          <S.Text style={{ paddingTop: '8px' }}>or</S.Text>
        </Row>
        <Padding style={{ padding: '25px 0' }}>
          <S.MarketPlaceButton onClick={handleMarketplaceRedirect}>
            Go to Marketplace
          </S.MarketPlaceButton>
        </Padding>
        <Row>
          <S.WalletButton onClick={handleWalletRedirect}>
            View Wallet
          </S.WalletButton>
        </Row>
      </S.ContentContainer>
    </Container>
  );
};

export default SuccessPage;
