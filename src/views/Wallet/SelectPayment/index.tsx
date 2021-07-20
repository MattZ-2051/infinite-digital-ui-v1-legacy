import { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
// local
import { useAppSelector } from 'store/hooks';
import CoinBaseBtn from './components/CoinbaseButton';
import DepositRow from './components/DepositRow';
import CircleBtn from './components/CircleButton';
import HbarBtn from './components/HbarBtn';
import * as S from './styles';
import { modalContentType } from '../DepositModal';
//assets
import sukuIcon from 'assets/img/icons/suku-icon.png';
import circleIcon from 'assets/img/icons/circle-icon.png';
import exitIcon from 'assets/img/icons/exit-icon.png';

interface ISelectPayment {
  kycMaxLevel: number;
  kycPending: boolean;
  isModalOpen?: boolean;
  handleClose: () => void;
  setModalContent: Dispatch<SetStateAction<modalContentType>>;
  coinbaseMetadata: string;
}

const SelectPayment = ({
  kycMaxLevel,
  kycPending,
  handleClose,
  setModalContent,
  coinbaseMetadata,
}: ISelectPayment): JSX.Element => {
  const history = useHistory();
  const userCards = useAppSelector((state) => state.session.userCards);

  const kycDisabled = kycMaxLevel < 1;

  const handleRedirect = () => {
    if (userCards.cards.length >= 1) {
      history.push(`/wallet/deposit/addfunds`);
    } else {
      history.push(`/wallet/addcreditcard`);
    }
  };

  return (
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
          setModalContent={setModalContent}
        />
        <DepositRow
          disabled={false}
          rowText="Credit Card"
          rowSubText="Deposit funds using a credit card"
          imgSrc={circleIcon}
          color="black"
          handleRedirect={handleRedirect}
        />
        <CoinBaseBtn
          kycDisabled={kycDisabled}
          coinbaseMetadata={coinbaseMetadata}
          kycPending={kycPending}
        />
        <HbarBtn
          disabled={false}
          kycDisabled={kycDisabled}
          kycPending={kycPending}
          setModalContent={setModalContent}
        />
        <DepositRow
          disabled={true}
          imgSrc={sukuIcon}
          color="#9e9e9e"
          rowText="SUKU"
          rowSubText="Coming Soon"
          handleRedirect={handleRedirect}
        />
      </S.BodyContent>
    </S.BodyContainer>
  );
};

export default SelectPayment;
