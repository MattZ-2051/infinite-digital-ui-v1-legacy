import { ProductWithFunctions } from 'entities/product';
import * as S2 from './styles';
import * as S from '../../styles';
import { formatDate } from 'utils/dates';
import Toast from 'utils/Toast';
import { useMediaQuery } from '@material-ui/core';

type ProductStates = 'cancel-auction' | 'processing-auction';

interface IProps {
  productState: ProductStates;
  leftText?: string;
  leftTextSubHeader?: Date;
  price?: number;
  priceSubHeader?: string;
  product?: ProductWithFunctions;
}

const showWarningMessage = () =>
  Toast.warning(
    'This auction has ended and is processing to confirm the winner. Please refresh the page to view the updated status.'
  );

const ProcessingAuctionStatus = ({
  leftTextSubHeader,
  price,
  matchesMobile,
}) => {
  return (
    <>
      <S2.InfoContainer>
        <S.Row
          alignItems="flex-start"
          flexDirection="column"
          justifyContent="center"
        >
          <S.Text fontWeight={600} color="#9DA1A8" size="18px" padding="0">
            Auction Ended
          </S.Text>
          <S.Text
            fontWeight={500}
            color="#9DA1A8"
            size="14px"
            padding="6px 0 0 0"
          >
            {matchesMobile ? (
              <>
                {formatDate(leftTextSubHeader).split('at')[0]} <br />{' '}
                {formatDate(leftTextSubHeader).split('at')[1]}
              </>
            ) : (
              formatDate(leftTextSubHeader)
            )}
          </S.Text>
        </S.Row>
        <S.Row flexDirection="row" alignItems="cente" justifyContent="flex-end">
          <S.Row
            flexDirection="column"
            alignItems="flex-end"
            justifyContent={matchesMobile ? 'flex-start' : 'center'}
            padding={matchesMobile ? '0' : '0 24px 0 0'}
          >
            <S.Text
              fontWeight={600}
              color="white"
              size="18px"
              padding="0"
              textAlign="end"
            >
              ${price}
            </S.Text>
            <S.Text
              fontWeight={400}
              color="#9DA1A8"
              size="14px"
              padding="6px 0 0 0"
            >
              Winning Bid
            </S.Text>
          </S.Row>
          {!matchesMobile && (
            <S.Button
              width="228px"
              height="56px"
              hover={false}
              fontSize="20px"
              onClick={showWarningMessage}
            >
              Processing...
            </S.Button>
          )}
        </S.Row>
      </S2.InfoContainer>
      {matchesMobile && (
        <S.Row flexDirection="row" justifyContent="center" alignItems="center">
          <S.Button
            width={matchesMobile ? '90%' : '228px'}
            height="56px"
            hover={false}
            fontSize="20px"
            onClick={showWarningMessage}
            style={{ marginBottom: matchesMobile ? '16px' : '' }}
          >
            Processing...
          </S.Button>
        </S.Row>
      )}
    </>
  );
};

export const StatusBar = ({
  productState,
  leftText,
  price,
  priceSubHeader,
  leftTextSubHeader,
}: IProps) => {
  const matchesMobile = useMediaQuery('(max-width: 1100px)');
  return (
    <S2.Container>
      {productState === 'processing-auction' && (
        <ProcessingAuctionStatus
          leftTextSubHeader={leftTextSubHeader}
          price={price}
          matchesMobile={matchesMobile}
        />
      )}
    </S2.Container>
  );
};
