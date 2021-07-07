import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import { useAuth0 } from '@auth0/auth0-react';
// local
import ModalComponent from 'components/Modal';
import { useAppSelector } from 'store/hooks';
import { USDCDeposit } from '../USDCDeposit/USDCDeposit';
import { getPersonalToken } from 'services/api/userService';
import CoinBaseBtn from './components/CoinbaseButton';
import DepositRow from './components/DepositRow';
import CircleBtn from './components/CircleButton';
import * as S from './styles';
//assets
import sukuIcon from 'assets/img/icons/suku-icon.png';
import circleIcon from 'assets/img/icons/circle-icon.png';
import exitIcon from 'assets/img/icons/exit-icon.png';

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
  const kycDisabled = kycMaxLevel < 1;
  const circleSubText = 'Deposit funds using a credit card';

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

  const body = (
    <S.BodyContainer>
      <S.ExitIcon>
        <img src={exitIcon} onClick={handleClose} className="icon__exit" />
      </S.ExitIcon>

      <S.BodyContent>
        <S.Header>Select a payment to deposit</S.Header>
        <S.GrayLine style={{ width: '100%' }} />
        <CircleBtn
          kycDisabled={kycDisabled}
          kycPending={kycPending}
          setIsUSDCModelOpen={setIsUSDCModelOpen}
        />
        <DepositRow
          disabled={false}
          rowText="Circle"
          rowSubText={circleSubText}
          imgSrc={circleIcon}
          color="black"
          handleRedirect={handleRedirect}
        />
        <CoinBaseBtn
          kycDisabled={kycDisabled}
          coinbaseMetadata={coinbaseMetadata}
          kycPending={kycPending}
        />
        <DepositRow
          disabled={true}
          rowText="HBAR"
          rowSubText="Hedera Hashgraph"
          imgSrc={circleIcon}
          color="#9e9e9e"
          handleRedirect={handleRedirect}
        />
        <DepositRow
          disabled={true}
          imgSrc={sukuIcon}
          color="#9e9e9e"
          rowText="SUKU"
          rowSubText="Coming Soon"
          handleRedirect={handleRedirect}
        />
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
  return (
    <ModalComponent open={isModalOpen || false} margin="130px 0">
      {body}
    </ModalComponent>
  );
};

export default DepositModal;
