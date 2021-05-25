import { useHistory } from 'react-router-dom';
import Emoji from 'components/Emoji';
import { Row, Container, Padding } from '../styles';
import * as S from './styles';

const ErrorPage = () => {
  const history = useHistory();
  const handleRedirectToWallet = () => {
    history.push(`/wallet`);
  };

  const handleRedirectToAddFunds = () => {
    history.push(`/wallet/deposit/addfunds`);
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
          <S.Text>We could not process your payment and the</S.Text>
          <S.Text>transaction was canceled.</S.Text>
        </Row>
        <Padding>
          <S.MarketPlaceButton onClick={handleRedirectToAddFunds}>
            Try Again
          </S.MarketPlaceButton>
        </Padding>
        <Row>
          <S.OtherPaymenButton onClick={handleRedirectToWallet}>
            Select Another Payment Method
          </S.OtherPaymenButton>
        </Row>
      </S.ContentContainer>
    </Container>
  );
};

export default ErrorPage;
