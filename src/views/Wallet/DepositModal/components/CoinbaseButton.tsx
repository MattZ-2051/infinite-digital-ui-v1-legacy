import * as S from '../styles';
import coinbaseIcon from 'assets/img/icons/coinbase-icon-large.png';
import { config } from '../../../../config';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Toast from 'utils/Toast';
import KycRequiredText from './KycRequiredText';

interface IProps {
  kycDisabled: boolean;
  coinbaseMetadata: string;
  kycPending: boolean;
}

const coinbaseCheckoutId = config.misc.coinbaseCheckoutId;

const CoinBaseBtn = ({ kycDisabled, coinbaseMetadata, kycPending }: IProps) => {
  const bodyBtn = (
    <S.Row>
      <S.FlexAlignCenter>
        <img src={coinbaseIcon} />
      </S.FlexAlignCenter>
      <S.FlexColumn>
        <S.RowText style={{ color: `${kycDisabled ? '#9e9e9e' : 'black'}` }}>
          Coinbase
        </S.RowText>
        <S.RowSubText>Deposit funds using ETH, BTC</S.RowSubText>
      </S.FlexColumn>
      <S.FlexEnd>
        <ArrowForwardIosIcon className="icon__arrow" />
      </S.FlexEnd>
    </S.Row>
  );

  if (kycDisabled) {
    return (
      <div
        onClick={() => {
          Toast.warning(<KycRequiredText kycPending={kycPending} />);
        }}
        role="button"
      >
        {bodyBtn}
      </div>
    );
  }

  return coinbaseMetadata ? (
    <S.CoinbaseButton
      checkoutId={coinbaseCheckoutId}
      customMetadata={coinbaseMetadata}
    >
      {bodyBtn}
    </S.CoinbaseButton>
  ) : null;
};

export default CoinBaseBtn;
