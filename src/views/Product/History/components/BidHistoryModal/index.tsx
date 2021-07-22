import { useEffect, useState } from 'react';
import * as S from './styles';
import Modal from 'components/Modal';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import { formatDate } from 'utils/dates';
import Rarity from 'components/Rarity';
import { getBids } from 'services/api/productService';
import { Bid } from 'entities/bid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Sku } from 'entities/sku';
import { ReactComponent as RedeemIcon } from 'assets/svg/icons/redeemable2.svg';

interface IModalProps {
  visible: boolean;
  setModalVisibility: any;
  listingId: string;
  endDate: Date;
  serialNumber: string;
  sku: Sku;
}

const perPage = 5;

const BidHistoryModal = ({
  visible,
  setModalVisibility,
  listingId,
  endDate,
  sku,
  serialNumber,
}: IModalProps) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [totalBids, setTotalBids] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const matchesMobile = useMediaQuery('(max-width:1140px)', { noSsr: true });
  const [themeStyle, setThemeStyle] = useState<'light' | 'dark'>('dark');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBids = async () => {
    setLoading(true);
    const res = await getBids('', listingId, page, perPage);

    if (res) {
      setBids(res.data);
      setTotalBids(res.data[0]?.listing?.bids?.length);
      setLoading(false);
    }
  };

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  console.log('sku', sku);
  useEffect(() => {
    fetchBids();
  }, []);
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
          padding="10px 0"
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
          padding="0"
          textAlign="left"
        >
          {sku?.name}
        </S.Text>
        <S.FlexDiv
          padding="10px 0 16px 0"
          justifyContent="space-between"
          alignItems="center"
        >
          <div style={{ display: 'flex' }}>
            <S.Text color="black" fontWeight={400} padding="0" fontSize="16px">
              {sku?.series?.name}
            </S.Text>
            {sku.redeemable && (
              <>
                {/* <S.Text
                  color="#9E9E9E"
                  fontWeight={400}
                  padding="0 10px"
                  fontSize="16px"
                >
                  /
                </S.Text> */}
                <RedeemIcon style={{ marginRight: '10px' }} />
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
          <div style={{ display: 'flex', paddingLeft: '30px' }}>
            <S.Text
              color="#9E9E9E"
              fontWeight={400}
              padding="0"
              fontSize="16px"
            >
              Serial:
            </S.Text>
            <S.Text color="black" fontWeight={400} padding="0" fontSize="16px">
              {serialNumber}
            </S.Text>
          </div>
        </S.FlexDiv>
        <S.GreyLine />
        {bids.map((bid) => {
          return bid.status === 'winner' ? (
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
                  <S.Text
                    color={bid.status === 'winner' ? 'black' : '#9E9E9E'}
                    fontWeight={600}
                    padding="0"
                    fontSize="16px"
                    textAlign="center"
                  >
                    Won with ${bid.bidAmt}
                  </S.Text>
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
          ) : (
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
                  <S.Text
                    color={bid.status === 'winner' ? 'black' : '#9E9E9E'}
                    fontWeight={600}
                    padding="0"
                    fontSize="16px"
                    textAlign="center"
                  >
                    <span style={{ color: '#9e9e9e' }}>Bid for</span> $
                    {bid.bidAmt}
                  </S.Text>
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
        })}
        {bids.length > 5 && (
          <S.PaginationContainer>
            <S.StyledPagination
              themeStyle={themeStyle}
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
