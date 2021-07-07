import * as S from '../styles';
import exitIcon from 'assets/img/icons/exit-icon.png';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface IProps {
  imgSrc: string;
  color: string;
  rowText: string;
  rowSubText: string;
  handleRedirect: () => void;
}

const DepositRow = ({
  imgSrc,
  color,
  rowText,
  rowSubText,
  handleRedirect,
}: IProps) => {
  return (
    <>
      <S.Row onClick={handleRedirect}>
        <S.FlexAlignCenter>
          <img src={imgSrc} />
        </S.FlexAlignCenter>
        <S.FlexColumn>
          <S.RowText style={{ color: `${color}` }}>{rowText}</S.RowText>
          <S.RowSubText>{rowSubText}</S.RowSubText>
        </S.FlexColumn>
        <S.FlexEnd>
          <ArrowForwardIosIcon className="icon__arrow" />
        </S.FlexEnd>
      </S.Row>
    </>
  );
};

export default DepositRow;
