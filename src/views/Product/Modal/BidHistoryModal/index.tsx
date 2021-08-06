import { useEffect, useState } from 'react';
import * as S from './styles';
import Modal from 'components/Modal';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import { formatDate } from 'utils/dates';
import Rarity from 'components/Rarity';
import { getBids } from 'services/api/productService';
import { Bid } from 'entities/bid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PageLoader from 'components/PageLoader';
import { Sku } from 'entities/sku';

interface IModalProps {
  visible: boolean;
  setModalVisibility: any;
  listingId: string;
  endDate: Date;
  serialNumber: string;
  sku: Sku;
  winningAmt?: number;
}

const perPage = 5;

const BidHistoryModal = ({
  visible,
  setModalVisibility,
  listingId,
  endDate,
  sku,
  serialNumber,
  winningAmt,
}: IModalProps) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [totalBids, setTotalBids] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const matchesMobile = useMediaQuery('(max-width:1140px)', { noSsr: true });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBids = async () => {
    setLoading(true);
    const res = await getBids('', listingId, page, perPage);

    if (res) {
      setBids(res.data);
      setTotalBids(res.data[0]?.listing?.bids?.length);
      setLoading(false);
    }
  };

  const winnerText = (bidAmt) => {
    return (
      <S.FlexDiv alignItems="center">
        <S.RedeemIcon style={{ marginRight: '5px' }} />
        <S.Text
          color="black"
          fontWeight={600}
          padding="0"
          fontSize="16px"
          textAlign="center"
        >
          {' '}
          Won with ${winningAmt?.toFixed(2)}
        </S.Text>
      </S.FlexDiv>
    );
  };

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    fetchBids();
  }, [page]);

  const Body = () => {
    return (
      <S.Container>
        {' '}
        <S.CloseButton onClick={() => setModalVisibility(false)}>
          <CloseModal style={{ cursor: 'pointer' }} />
        </S.CloseButton>
        <S.Text
          color="black"
          fontWeight={600}
          fontSize="24px"
          padding="8px 0"
          textAlign="center"
        >
          Auction Bids
        </S.Text>
        <S.Text
          color="#9e9e9e"
          fontSize="12px"
          fontWeight={500}
          padding="0 0 16px 0"
          textAlign="center"
        >
          Closed on {formatDate(endDate)}
        </S.Text>
        <S.GreyLine />
        <S.FlexDiv
          justifyContent="space-between"
          alignItems="center"
          padding="16px 0"
        >
          <S.Text color="#9e9e9e" fontSize="16px" fontWeight={500} padding="0">
            {sku?.issuerName}
          </S.Text>
          <Rarity type={sku?.rarity} margin="0" />
        </S.FlexDiv>
        <S.Text
          color="black"
          fontSize="20px"
          fontWeight={600}
          padding="0 0 16px 0"
          textAlign="left"
        >
          {sku?.name}
        </S.Text>
        <S.FlexDiv
          padding="0 0 16px 0"
          justifyContent="space-between"
          alignItems="center"
        >
          <div style={{ display: 'flex' }}>
            <S.Text color="black" fontWeight={400} padding="0" fontSize="16px">
              {sku?.series?.name}
            </S.Text>
            {sku.redeemable && (
              <>
                <S.RedeemIcon />
                <S.Text
                  color="#9E9E9E"
                  fontWeight={400}
                  padding="0 10px"
                  fontSize="16px"
                >
                  /
                </S.Text>
                <S.Text
                  color="black"
                  fontWeight={600}
                  padding="0"
                  fontSize="16px"
                >
                  Redeemable
                </S.Text>
              </>
            )}
          </div>
          <div style={{ display: 'flex' }}>
            <S.Text
              color="#9E9E9E"
              fontWeight={400}
              padding="0 10px 0 0"
              fontSize="16px"
            >
              Serial:
            </S.Text>
            <S.Text color="black" fontWeight={400} padding="0" fontSize="16px">
              #{serialNumber}
            </S.Text>
          </div>
        </S.FlexDiv>
        <S.GreyLine />
        {loading ? (
          <PageLoader size={12} />
        ) : (
          bids.map((bid) => {
            return (
              <>
                <S.FlexDiv
                  justifyContent="space-between"
                  alignItems="center"
                  padding="30px 0"
                  key={bid._id}
                >
                  <S.Text
                    color={bid.status === 'winner' ? 'black' : '#9E9E9E'}
                    fontWeight={600}
                    padding="0"
                    fontSize="16px"
                  >
                    @{bid?.owner?.username}
                  </S.Text>
                  <div>
                    <S.FlexDiv alignItems="center">
                      {bid.status === 'winner' ? (
                        <>{winnerText(bid.bidAmt)}</>
                      ) : (
                        <S.Text
                          color={bid.status === 'winner' ? 'black' : '#9E9E9E'}
                          fontWeight={600}
                          padding="0"
                          fontSize="16px"
                          textAlign="center"
                        >
                          Bid for ${bid.bidAmt}
                        </S.Text>
                      )}
                    </S.FlexDiv>

                    <S.Text
                      color="#9e9e9e"
                      fontWeight={500}
                      padding="0"
                      fontSize="12px"
                    >
                      {formatDate(bid.createdAt)}
                    </S.Text>
                  </div>
                </S.FlexDiv>
                <S.GreyLine />
              </>
            );
          })
        )}
        {totalBids > 5 && (
          <S.PaginationContainer>
            <S.StyledPagination
              themeStyle={'light'}
              count={Math.ceil(totalBids / perPage)}
              page={page}
              onChange={handlePagination}
              siblingCount={matchesMobile ? 0 : 1}
            />
          </S.PaginationContainer>
        )}
      </S.Container>
    );
  };
  return (
    <Modal
      open={visible}
      onClose={() => {
        setModalVisibility(false);
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      centered={true}
    >
      <Body />
    </Modal>
  );
};

export default BidHistoryModal;
