import { Dispatch, SetStateAction } from 'react';
import * as S from '../styles';
import KycRequiredText from './KycRequiredText';
import usdcIcon from 'assets/img/icons/usdc.png';
import Toast from 'utils/Toast';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { modalContentType } from '../../DepositModal';

interface IProps {
  kycDisabled: boolean;
  setModalContent: Dispatch<SetStateAction<modalContentType>>;
  kycPending: boolean;
}
const CircleBtn = ({
  kycDisabled,
  setModalContent,
  kycPending,
}: IProps): JSX.Element => {
  return (
    <S.Row
      onClick={() =>
        kycDisabled
          ? Toast.warning(<KycRequiredText kycPending={kycPending} />)
          : setModalContent('USDCDeposit')
      }
      disabled={false}
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

export default CircleBtn;
