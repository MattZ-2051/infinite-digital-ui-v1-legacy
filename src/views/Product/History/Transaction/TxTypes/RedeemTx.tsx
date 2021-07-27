import { Props } from '../index';
import * as S from '../styles';
import { formatDate } from 'utils/dates';

const RedeemTx = ({ transaction }: Props) => {
  return (
    <S.TransactionDetails alignItems="flex-end">
      <S.FlexDiv style={{ flexWrap: 'nowrap' }}>
        <S.RedeemIcon />
        <S.Description paddingRight="0">Redeemed this product</S.Description>
      </S.FlexDiv>
      <S.Date>
        {transaction && formatDate(new Date(transaction?.updatedAt))}
      </S.Date>
    </S.TransactionDetails>
  );
};

export default RedeemTx;
