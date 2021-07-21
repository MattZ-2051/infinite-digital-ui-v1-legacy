import * as S from '../styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const AuctionCountDown = ({ product, countdown }) => {
  const matchesMobile = useMediaQuery('(max-width:1140px)');

  return (
    <S.FlexDiv
      justifyContent={matchesMobile ? 'center' : 'flex-end'}
      padding={matchesMobile ? '0 0 25px 0' : '0 0 10px 0'}
    >
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
