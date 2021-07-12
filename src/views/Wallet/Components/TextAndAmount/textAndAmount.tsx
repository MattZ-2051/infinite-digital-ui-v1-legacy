import * as S from './styles';
import { ITextAndAmount } from './ITextAndAmount';
const TextAndAmount = ({ text, amount }: ITextAndAmount) => {
  return (
    <S.Available>
      <S.GrayBigText>
        {text}
        <S.AvailableAmount>${amount}</S.AvailableAmount>
      </S.GrayBigText>
      <S.AvailableSubText>(Excludes pending transactions)</S.AvailableSubText>
    </S.Available>
  );
};

export default TextAndAmount;