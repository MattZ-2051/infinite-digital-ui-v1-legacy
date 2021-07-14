import * as S from '../styles';
import Toast from 'utils/Toast';
import hbarIcon from 'assets/img/icons/hbar-icon.png';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import KycRequiredText from './KycRequiredText';
import { Dispatch, SetStateAction } from 'react';
import { modalContentType } from '../../DepositModal';

interface IHbarButton {
  disabled: boolean;
  kycDisabled: boolean;
  kycPending: boolean;
  setModalContent: Dispatch<SetStateAction<modalContentType>>;
}

const HbarBtn = ({
  disabled,
  kycDisabled,
  kycPending,
  setModalContent,
}: IHbarButton): JSX.Element => {
  return (
    <>
      <S.Row
        onClick={() =>
          kycDisabled
            ? Toast.warning(<KycRequiredText kycPending={kycPending} />)
            : setModalContent('HbarDeposit')
        }
        disabled={disabled}
      >
        <S.FlexAlignCenter>
          <img src={hbarIcon} />
        </S.FlexAlignCenter>
        <S.FlexColumn>
          <S.RowText style={{ color: kycDisabled ? '#9e9e9e' : 'black' }}>
            HBAR
          </S.RowText>
          <S.RowSubText>Depoist funds using Hedera Hashgraph.</S.RowSubText>
        </S.FlexColumn>
        <S.FlexEnd>
          <ArrowForwardIosIcon className="icon_arrow" />
        </S.FlexEnd>
      </S.Row>
    </>
  );
};

export default HbarBtn;
