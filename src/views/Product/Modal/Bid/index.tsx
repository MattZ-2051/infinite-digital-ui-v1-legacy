import { useState } from 'react';
import Modal from 'components/Modal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ProductWithFunctions } from 'entities/product';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import Rarity from 'components/Rarity';
import redeemableIcon from 'assets/svg/icons/redeemable2.svg';
import redeemableIcon_disabled from 'assets/svg/icons/redeemable2_disabled.svg';
import * as S from './styles';
import Button from 'components/Buttons/Button';
import { useHistory } from 'react-router-dom';
import { purchase } from 'utils/messages';
import Toast from 'utils/Toast';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { postBid } from 'services/api/productService';
import Loader from 'components/Loader';
import { getUserCardsThunk } from 'store/session/sessionThunks';

interface Props {
  visible: boolean;
  setModalBidVisible: (a: boolean) => void;
  product: ProductWithFunctions;
  bidAmount: string;
}

const marketplaceFee = 5;

const BidModal = ({
  product,
  visible,
  setModalBidVisible,
  bidAmount,
}: Props) => {
  const history = useHistory();
  const userBalance = useAppSelector(
    (state) => state.session.user?.availableBalance
  );
  const { getAccessTokenSilently } = useAuth0();
  const [checkTerms, setCheckTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const calculatedMarketplaceFee =
    parseFloat(bidAmount) * (marketplaceFee / 100);
  const totalCost = parseFloat(bidAmount) + calculatedMarketplaceFee;

  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
      fontSize: '14px',
      lineHeight: '18px',
    },
  }));

  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
  }

  function displayNoFundsError(userBalance) {
    Toast.error(
      <span>
        Whoops, Insuficient funds! Your wallet balance ${userBalance.toFixed(2)}
        , would you like to{' '}
        <strong
          onClick={() => {
            history.push({
              pathname: `/wallet`,
              state: { modalOpen: true },
            });
          }}
          style={{ borderBottom: '1px solid black', cursor: 'pointer' }}
        >
          add more funds?
        </strong>
        ?
      </span>
    );
  }

  function displayErrorBidMessage(message: string[]) {
    Toast.error(<span>{message}</span>);
  }

  function displaySuccessBidMessage() {
    Toast.success(
      <span>
        Your bid was successfully placed. Learn more about biding{' '}
        <a
          target="_blank"
          href="https://support.suku.world/infinite-powered-by-suku"
          rel="noreferrer"
        >
          here{' '}
        </a>
      </span>
    );
  }

  const handlePlaceBid = async () => {
    if (!checkTerms) {
      Toast.error(purchase.termsError);
      return;
    }
    if (userBalance < totalCost) {
      displayNoFundsError(userBalance);
      return;
    }
    setLoading(true);
    const userToken = await getAccessTokenSilently();

    try {
      const listing_id = product?.activeProductListings[0]?._id;
      const result = await postBid(listing_id, userToken, {
        id: listing_id,
        bidAmt: parseFloat(bidAmount),
      });
      if (result) {
        dispatch(getUserCardsThunk({ token: userToken }));
        displaySuccessBidMessage();
        setLoading(false);
        setModalBidVisible(false);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (e) {
      setLoading(false);
      displayErrorBidMessage(e.response.data.message);
    }
  };

  const content = (
    <>
      <S.Body>
        <S.CloseButton onClick={() => setModalBidVisible(false)}>
          <CloseModal style={{ cursor: 'pointer' }} />
        </S.CloseButton>

        <S.Header>
          <S.Title>Confirm your bid:</S.Title>
          <S.SubTitle>
            Your current balance is ${userBalance.toFixed(2)}
          </S.SubTitle>
        </S.Header>

        <S.StyledMuiDivider />

        <S.DetailRow>
          <S.IssuerName>{product?.sku?.issuerName}</S.IssuerName>
          <Rarity type={product?.sku?.rarity} />
        </S.DetailRow>
        <S.SkuName>{product?.sku?.name}</S.SkuName>

        <S.DetailRow>
          {product?.sku?.redeemable && (
            <S.ContainerSizeReedemable>
              {/* <S.Size>Size 11</S.Size> */}
              {/* <S.Bar>/</S.Bar> */}
              <img
                src={
                  product.redeemedStatus === 'redeemed'
                    ? redeemableIcon_disabled
                    : redeemableIcon
                }
                alt=""
                width="15"
              />
              <BootstrapTooltip
                placement="top-start"
                title={
                  product.redeemedStatus === 'redeemed'
                    ? 'This product can no longer be reedemed.'
                    : ''
                }
              >
                <S.Redeemable disabled={product.redeemedStatus === 'redeemed'}>
                  &nbsp;Reedemable
                </S.Redeemable>
              </BootstrapTooltip>
            </S.ContainerSizeReedemable>
          )}
          <S.SeriesName>{product?.sku?.series?.name}</S.SeriesName>
          {product.serialNumber && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <S.SeriesName>Serial:</S.SeriesName>
              <S.SerialNum>#{product.serialNumber}</S.SerialNum>
            </div>
          )}
        </S.DetailRow>
        <S.StyledMuiDivider />

        <S.Detail>
          <S.DetailRowPrice>
            <div>
              <span>Your Bid:</span>
            </div>
            <div style={{ color: '#000000' }}>
              <span>${parseFloat(bidAmount).toFixed(2)}</span>
            </div>
          </S.DetailRowPrice>

          <S.DetailRowPrice>
            <div>
              <span>Marketplace fee ({marketplaceFee}%):</span>
            </div>
            <div>
              <span>${calculatedMarketplaceFee.toFixed(2)}</span>
            </div>
          </S.DetailRowPrice>
        </S.Detail>
        <S.StyledMuiDivider />

        <S.Detail>
          <S.DetailRow>
            <div>
              <span>Total cost&nbsp;</span>
              <span style={{ color: '#9e9e9e' }}>(if you win)</span>
            </div>
            <div>
              <strong style={{ fontSize: '20px' }}>
                ${totalCost.toFixed(2)}
              </strong>
            </div>
          </S.DetailRow>
        </S.Detail>
      </S.Body>
      <S.Body style={{ padding: '0px' }}>
        <S.ContainerInfoText>
          <S.InfoText>
            Placing a bid will freeze the associated funds from your wallet
            until the auction ends. Bids cannot be canceled but can be increased
            as the auction progresses.
          </S.InfoText>
        </S.ContainerInfoText>
      </S.Body>
      <S.Body style={{ padding: '20px' }}>
        <S.Center>
          <S.Check
            color="default"
            disableRipple
            checked={checkTerms}
            onClick={() => setCheckTerms(!checkTerms)}
          />
          <S.Terms>I accept the </S.Terms>{' '}
          <S.TermLink onClick={() => history.push('/terms')}>
            Terms & Conditions
          </S.TermLink>
        </S.Center>

        <S.ContainerInfoText style={{ background: 'transparent' }}>
          <S.InfoText>
            All resales of this product are subject to a 5% royalty fee set by
            and to be paid to the original creator.
          </S.InfoText>
        </S.ContainerInfoText>

        <Button
          style={{
            height: '56px',
            borderRadius: '24px',
            width: '100%',
            textDecoration: 'none',
            textTransform: 'capitalize',
          }}
          onClick={handlePlaceBid}
          disabled={loading}
        >
          {loading ? <Loader color="white" size={10} /> : 'Place Bid'}
        </Button>
      </S.Body>
    </>
  );

  return (
    <Modal
      open={visible}
      onClose={() => {
        if (loading) return;
        setModalBidVisible(false);
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      padding={'0px'}
    >
      {content}
    </Modal>
  );
};

export default BidModal;
