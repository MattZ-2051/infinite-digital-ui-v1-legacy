import * as S from '../styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { formatDate } from 'utils/dates';
export const AuctionCountDown = ({ product, countdown }) => {
  const matchesMobile = useMediaQuery('(max-width:1140px)');

  return (
    <>
      <S.FlexDiv
        justifyContent={matchesMobile ? 'center' : 'flex-end'}
        padding={matchesMobile ? '0 0 0 0' : '0 0 10px 0'}
      >
        {' '}
        <S.Text color="#9e9e9e" size="18px" fontWeight={600} padding="0 5px">
          Expires in
        </S.Text>
        <S.Text color="white" size="18px" fontWeight={600} padding="0 5px">
          {product?.activeProductListings[0] && countdown}
        </S.Text>{' '}
      </S.FlexDiv>
      {matchesMobile && (
        <S.Text
          color="#7c7c7c"
          size="14px"
          fontWeight={400}
          textAlign="center"
          padding="10px 0 35px 0"
        >
          {product?.activeProductListings[0] &&
            `(${formatDate(
              new Date(product?.activeProductListings[0].endDate)
            )})`}
        </S.Text>
      )}
    </>
  );
};
