import * as S from '../styles';
import { Props } from '../index';

const PurchaseTx = ({ transaction }: Props) => {
  return (
    <S.FlexDiv>
      <S.Description paddingRight="0.5ch">Bought for</S.Description>
      <S.Text>
        ${transaction?.transactionData.cost?.totalCost.toFixed(2)}
      </S.Text>
    </S.FlexDiv>
  );
};

export default PurchaseTx;
