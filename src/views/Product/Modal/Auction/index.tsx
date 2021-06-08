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
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import moment, { Moment } from 'moment';
import TextField from 'components/TextFIeld';
import TimePicker from 'components/TimePicker';
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
  const fee = product?.resale
    ? product?.resaleSellersFeePercentage
    : product?.initialSellersFeePercentage;

  const { getAccessTokenSilently } = useAuth0();
  const [price, setPrice] = useState<string>('0');
  const [serviceFee, setServiceFee] = useState<number>();
  const [royaltyFee, setRoyaltyFee] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<any | null>(moment());
  const [endDate, setEndDate] = useState<any | null>(moment());
  const [startTime, setStartTime] = useState<any | null>(moment());
  const [endTime, setEndTime] = useState<any | null>(moment());

  useEffect(() => {
    if (price) {
      const serviceFee = (fee * parseFloat(price)) / 100;
      const royaltyFee =
        (product?.royaltyFeePercentage * parseFloat(price)) / 100;
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
            You wont be able to transfer or redeem this item while your auction
            is in progress.
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
        {!product?.sku?.redeemable && (
          <S.ContainerSizeReedemable>
            {/* <S.Size>Size 11</S.Size> */}
            {/* <S.Bar>/</S.Bar> */}
            <img src={redeemIcon2} alt="" width="15" />
            <S.Redeemable>&nbsp;Reedemable</S.Redeemable>
          </S.ContainerSizeReedemable>
        )}
        <S.SeriesName>{product?.sku?.series?.name}</S.SeriesName>
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
              format="MM/dd/yyyy"
              margin="normal"
              onChange={setStartDate}
              value={startDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              style={{ WebkitAppearance: 'none' }}
            />
          </S.PickerContainer>
          <S.PickerContainer>
            <S.CustomDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              onChange={setEndDate}
              value={endDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              style={{ WebkitAppearance: 'none' }}
            />
          </S.PickerContainer>
        </Grid>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-between">
          <S.PickerContainer>
            <TimePicker
              placeholder="select time"
              onChange={setStartTime}
              value={startTime}
            />
          </S.PickerContainer>
          <S.PickerContainer>
            <TimePicker
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
          placeholder="Enter min bid price"
          onChange={onPriceChanged}
          defaultValue={price}
          name={price}
        />
      </S.InputContainer>

      <S.Detail>
        <S.DetailRowPrice>
          <div>
            <span>Marketplace fee (5%):</span>
          </div>
          <div>
            <span>${price === '' ? 0 : serviceFee?.toFixed(2)}</span>
          </div>
        </S.DetailRowPrice>
        {product?.royaltyFeePercentage > 0 && product?.resale && (
          <S.DetailRowPrice>
            <div>
              <span>
                Creator royalty fee ({product?.royaltyFeePercentage}%) :
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

      <S.Footer>
        <p>
          All resales of this product a subject to a 15% royalty fee set by and
          to be paid to the original creator.
        </p>
      </S.Footer>

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
        start auction
      </Button>
    </S.Body>
  );

  return (
    <Modal
      open={visible}
      onClose={() => setModalAuctionVisible(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {content}
    </Modal>
  );
};

export default AuctionModal;
