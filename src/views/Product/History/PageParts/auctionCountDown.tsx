import * as S from '../styles';

export const AuctionCountDown = ({ product, countdown }) => {
  return (
    <S.FlexDiv justifyContent="flex-end" padding="0 0 10px 0">
      {' '}
      <S.Text color="#9e9e9e" size="18px" fontWeight={600}>
        Expires in
      </S.Text>
      <S.Text color="white" size="18px" fontWeight={600}>
        {product?.activeProductListings[0] && countdown}
      </S.Text>{' '}
    </S.FlexDiv>
  );
};
