import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import { useAuth0 } from '@auth0/auth0-react';
// local
import ModalComponent from 'components/Modal';
import { useAppSelector } from 'store/hooks';
import { USDCDeposit } from '../USDCDeposit/USDCDeposit';
import { getPersonalToken } from 'services/api/userService';
import Toast from 'utils/Toast';
import { useKycClient } from 'hooks/useKycClient';
import * as S from './styles';
//assets
import coinbaseIcon from 'assets/img/icons/coinbase-icon-large.png';
import sukuIcon from 'assets/img/icons/suku-icon.png';
import circleIcon from 'assets/img/icons/circle-icon.png';
import usdcIcon from 'assets/img/icons/usdc.png';
import exitIcon from 'assets/img/icons/exit-icon.png';
import { config } from '../../../config';

const coinbaseCheckoutId = config.misc.coinbaseCheckoutId;

interface IDepositModal {
  kycMaxLevel: number;
  kycPending: boolean;
  isModalOpen?: boolean;
  handleClose: () => void;
}

const DepositModal = ({
  kycMaxLevel,
  kycPending,
  isModalOpen,
  handleClose,
}: IDepositModal): JSX.Element => {
  const history = useHistory();
  const userCards = useAppSelector((state) => state.session.userCards);
  const [isUSDCModalOpen, setIsUSDCModelOpen] = useState<boolean>(false);
  const [coinbaseMetadata, setCoinbaseMetadata] = useState<string>('');
  const { getAccessTokenSilently } = useAuth0();
  const kycClient = useKycClient();
  const kycDisabled = kycMaxLevel < 1;

  useEffect(() => {
    getCoinbaseMetadata();
  }, []);

  async function getCoinbaseMetadata() {
    let token = '';
    try {
      const res = await getPersonalToken(await getAccessTokenSilently());
      token = res.token;
      setCoinbaseMetadata(token);
    } catch (e) {
      console.log(e);
    }
  }

  function closeUSDCModal() {
    setIsUSDCModelOpen(false);
  }

  const handleRedirect = () => {
    if (userCards.cards.length >= 1) {
      history.push(`/wallet/deposit/addfunds`);
    } else {
      history.push(`/wallet/addcreditcard`);
    }
  };

  const KycRequiredText = () => (
    <>
      To deposit cryptocurrency, please{' '}
      {kycPending ? (
        <>wait until we validate your identity</>
      ) : (
        <>
          <a onClick={() => kycClient?.open()}>click here</a> complete the
          required account validation steps.{' '}
          <a href="https://support.suku.world/infinite/how-does-kyc-work">
            Learn more.
          </a>
        </>
      )}
    </>
  );

  const CoinBaseBtn = () => {
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
            Toast.warning(<KycRequiredText />);
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

  const CircleBtn = () => {
    return (
      <S.Row
        onClick={() =>
          kycDisabled
            ? Toast.warning(<KycRequiredText />)
            : setIsUSDCModelOpen(true)
        }
      >
        <S.FlexAlignCenter>
          <img width="50px" src={usdcIcon} />
        </S.FlexAlignCenter>
        <S.FlexColumn>
          <S.RowText style={{ color: `${kycDisabled ? '#9e9e9e' : 'black'}` }}>
            USDC
          </S.RowText>
          <S.RowSubText>Deposit funds using USDC</S.RowSubText>
        </S.FlexColumn>
        <S.FlexEnd>
          <ArrowForwardIosIcon className="icon__arrow" />
        </S.FlexEnd>
      </S.Row>
    );
  };

  const body = (
    <S.BodyContainer>
      <S.ExitIcon>
        <img src={exitIcon} onClick={handleClose} className="icon__exit" />
      </S.ExitIcon>

      <S.BodyContent>
        <S.Header>Select a payment to deposit</S.Header>
        <S.GrayLine style={{ width: '100%' }} />
        <CircleBtn />
        <S.Row onClick={handleRedirect}>
          <S.FlexAlignCenter>
            <img src={circleIcon} />
          </S.FlexAlignCenter>
          <S.FlexColumn>
            <S.RowText>Circle</S.RowText>
            <S.RowSubText>Deposit funds using a credit card</S.RowSubText>
          </S.FlexColumn>
          <S.FlexEnd>
            <ArrowForwardIosIcon className="icon__arrow" />
          </S.FlexEnd>
        </S.Row>
        <CoinBaseBtn />
        <S.Row>
          <S.FlexAlignCenter>
            <img src={sukuIcon} />
          </S.FlexAlignCenter>
          <S.FlexColumn>
            <S.RowText style={{ color: '#9e9e9e' }}>SUKU</S.RowText>
            <S.RowSubText>Coming soon</S.RowSubText>
          </S.FlexColumn>
        </S.Row>
        <ModalComponent open={isUSDCModalOpen}>
          <S.ExitIcon>
            <img
              src={exitIcon}
              onClick={closeUSDCModal}
              className="icon__exit"
            />
          </S.ExitIcon>
          <USDCDeposit />
        </ModalComponent>
      </S.BodyContent>
    </S.BodyContainer>
  );
  return <ModalComponent open={isModalOpen}>{body}</ModalComponent>;
};

export default DepositModal;
