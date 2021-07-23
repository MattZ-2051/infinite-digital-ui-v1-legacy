import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import { useAuth0 } from '@auth0/auth0-react';
import * as S from './styles';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import redeemIcon2 from 'assets/svg/icons/redeemable2.svg';
import Rarity from 'components/Rarity';
import { createAuction } from 'utils/messages';
import { ProductWithFunctions } from 'entities/product';
import Button from 'components/Buttons/Button';
import { postListings } from 'services/api/listingService';
import Toast from 'utils/Toast';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import TextField from 'components/TextFIeld';

interface Props {
  visible: boolean;
  setModalAuctionVisible: (a: boolean) => void;
  product: ProductWithFunctions;
  serialNum?: string;
}

const AuctionModal = ({
  serialNum,
  product,
  visible,
  setModalAuctionVisible,
}: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [price, setPrice] = useState<string>('0');
  const [royaltyFee, setRoyaltyFee] = useState<number>();
  const [serviceFee, setServiceFee] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<any | null>(moment());
  const [endDate, setEndDate] = useState<any | null>(moment());
  const [startTime, setStartTime] = useState<any | null>(moment());
  const [endTime, setEndTime] = useState<any | null>(moment());
  const [endDateSelectOpen, setEndDateSelectOpen] = useState<boolean>(false);
  const fee = product?.resale
    ? product?.sku?.sellerTransactionFeePercentageSecondary
    : product?.sku?.sellerTransactionFeePercentage;

  useEffect(() => {
    if (price) {
      const serviceFee = (fee * parseFloat(price)) / 100;
      const royaltyFee =
        (product?.sku?.royaltyFeePercentage * parseFloat(price)) / 100;
      setServiceFee(serviceFee);
      setRoyaltyFee(royaltyFee);
      if (product?.resale) {
        setTotal(parseFloat(price) - serviceFee - royaltyFee);
      } else {
        setTotal(parseFloat(price) - serviceFee);
      }
    }
  }, [price]);

  const onPriceChanged = (value) => {
    if (/\d*(\.|,){0,1}\d{3}$/g.test(value)) {
      setPrice(parseFloat(parseFloat(value).toFixed(2)).toString());
    } else {
      setPrice(value);
    }
  };

  function composeDates(datePart, timePart) {
    const dateStr = datePart.format('YYYY-MM-DD');
    const timeStr = timePart.format('HH:mm:ss');
    const tzStr = timePart.format('Z');
    return moment(`${dateStr}T${timeStr}.000${tzStr}`);
  }

  function compareDates(iniDate, endDate) {
    return iniDate.isBefore(endDate);
  }

  const handleStartAuction = async () => {
    if (!startTime || !endTime) {
      Toast.success('Please enter a valid date.');
    }
    const resStartDate = composeDates(startDate, startTime);
    const resEndDate = composeDates(endDate, endTime);
    if (!compareDates(resStartDate, resEndDate)) {
      Toast.error('The end date should be greather than start date');
      return;
    }

    if (!(parseFloat(price) > 0)) {
      Toast.error('Minimum bid should be more than 0.');
      return;
    }
    setLoading(true);
    const userToken = await getAccessTokenSilently();
    try {
      const result = await postListings(userToken, {
        issuer: product?.owner?._id,
        product: product?._id,
        type: 'product',
        saleType: 'auction',
        startDate: resStartDate
          .clone()
          .utcOffset('Z')
          .format('YYYY-MM-DDTHH:mm:ss'),
        endDate: resEndDate
          .clone()
          .utcOffset('Z')
          .format('YYYY-MM-DDTHH:mm:ss'),
        minBid: parseFloat(price) || 0,
      });
      if (result) {
        Toast.success(createAuction.success);
        setLoading(false);
        setModalAuctionVisible(false);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    } catch (e) {
      setLoading(false);
      Toast.error(createAuction.error);
    }
  };

  const content = (
    <S.Body>
      <S.CloseButton onClick={() => setModalAuctionVisible(false)}>
        <CloseModal style={{ cursor: 'pointer' }} />
      </S.CloseButton>

      <S.Header>
        <S.Title>Create auction</S.Title>
        <S.ContainerSubtitle>
          <S.SubTitle>
            Once started, an auction can only be canceled if there have been no
            active bids placed.
          </S.SubTitle>
        </S.ContainerSubtitle>
      </S.Header>
      <S.StyledMuiDivider />
      <S.DetailRow>
        <S.IssuerName>{product?.sku?.issuerName}</S.IssuerName>
        <Rarity type={product?.sku?.rarity} />
      </S.DetailRow>
      <S.SkuName>{product?.sku?.name}</S.SkuName>

      <S.DetailRow>
        <S.FlexDiv padding="0px 10px 0px 0px">
          <S.SeriesName>{product?.sku?.series?.name}</S.SeriesName>
          {product?.sku?.redeemable && (
            <S.ContainerSizeReedemable>
              {/* <S.Size>Size 11</S.Size> */}
              <S.Bar>/</S.Bar>
              <img src={redeemIcon2} alt="" width="15" />
              <S.Redeemable>&nbsp;Reedemable</S.Redeemable>
            </S.ContainerSizeReedemable>
          )}
        </S.FlexDiv>
        {serialNum && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <S.SeriesName>Serial:</S.SeriesName>
            <S.SerialNum>#{serialNum}</S.SerialNum>
          </div>
        )}
      </S.DetailRow>
      <S.StyledMuiDivider />
      <S.ContainerTextDate>
        <p>Start date</p>
        <p>End date</p>
      </S.ContainerTextDate>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-between">
          <S.PickerContainer>
            <S.CustomDatePicker
              disableToolbar
              variant="inline"
              format="MMM D, yyyy"
              margin="normal"
              onChange={setStartDate}
              value={startDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              style={{ WebkitAppearance: 'none' }}
              autoOk={true}
              onAccept={() => setEndDateSelectOpen(true)}
            />
          </S.PickerContainer>
          <S.PickerContainer>
            <S.CustomDatePicker
              disableToolbar
              variant="inline"
              format="MMM D, yyyy"
              margin="normal"
              onChange={setEndDate}
              value={endDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              style={{ WebkitAppearance: 'none' }}
              autoOk={true}
              open={endDateSelectOpen}
              onOpen={() => setEndDateSelectOpen(true)}
              onClose={() => setEndDateSelectOpen(false)}
            />
          </S.PickerContainer>
        </Grid>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-between">
          <S.PickerContainer>
            <S.CustomTimePicker
              placeholder="select time"
              onChange={setStartTime}
              value={startTime}
            />
          </S.PickerContainer>
          <S.PickerContainer>
            <S.CustomTimePicker
              placeholder="select time"
              onChange={setEndTime}
              value={endTime}
            />
          </S.PickerContainer>
        </Grid>
      </MuiPickersUtilsProvider>

      <S.InputContainer>
        <TextField
          type="money"
          placeholder="Enter the minimum bid"
          onChange={onPriceChanged}
          defaultValue={price}
          name={price}
        />
      </S.InputContainer>

      <S.Detail>
        <S.DetailRowPrice>
          <div>
            <span>{`Marketplace Fee (${fee}%):`}</span>
          </div>
          <div>
            <span>${price === '' ? 0 : serviceFee?.toFixed(2)}</span>
          </div>
        </S.DetailRowPrice>
        {product?.sku?.royaltyFeePercentage > 0 && product?.resale && (
          <S.DetailRowPrice>
            <div>
              <span>
                Creator royalty fee ({product?.sku.royaltyFeePercentage}%) :
              </span>
            </div>
            <div>${royaltyFee?.toFixed(2)}</div>
          </S.DetailRowPrice>
        )}
      </S.Detail>
      <S.StyledMuiDivider />

      <S.Detail>
        <S.DetailRow>
          <div>
            <span>Minimum Final Payout:</span>
          </div>
          <div>
            <strong style={{ fontSize: '20px' }}>
              ${price === '' ? 0 : total?.toFixed(2)}
            </strong>
          </div>
        </S.DetailRow>
      </S.Detail>

      {product?.sku?.royaltyFeePercentage > 0 && product?.resale && (
        <S.Footer>
          <p>
            All resales of this product a subject to a{' '}
            {product?.sku?.royaltyFeePercentage}% royalty fee set by and to be
            paid to the original creator.
          </p>
        </S.Footer>
      )}

      <Button
        style={{
          height: '56px',
          borderRadius: '24px',
          width: '100%',
          textDecoration: 'none',
          textTransform: 'capitalize',
          marginTop: '20px',
        }}
        onClick={handleStartAuction}
        disabled={loading || !price}
      >
        Start Auction
      </Button>
    </S.Body>
  );

  return (
    <Modal
      open={visible}
      onClose={() => setModalAuctionVisible(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      bodyStyle={{ 'overflow-y': 'scroll', height: '97vh' }}
      centered={true}
    >
      {content}
    </Modal>
  );
};

export default AuctionModal;
