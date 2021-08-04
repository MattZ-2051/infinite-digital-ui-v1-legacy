import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { S } from './styles';
import { patchListingsPurchase } from 'services/api/listingService';
import { useHistory, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { purchase } from 'utils/messages';
import Toast from 'utils/Toast';
import Modal from 'components/Modal';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import Rarity from 'components/Rarity';
import alertIcon from 'assets/img/icons/alert-icon.png';
import Emoji from 'components/Emoji';
import { ProductWithFunctions } from 'entities/product';
import { getUserCardsThunk } from 'store/session/sessionThunks';
import { getMyTransactions } from 'services/api/userService';
import { Modes } from '../../History/types';
import ReactGA from 'react-ga';
import {config} from "config";

interface IModalProps {
  visible: boolean;
  setModalPaymentVisible: any;
  product: ProductWithFunctions;
  serialNum?: string;
  statusMode: Modes;
  setStatusMode: (mode: Modes) => void;
}

const BuyNowModal = ({
  visible,
  setModalPaymentVisible,
  product,
  serialNum,
  statusMode,
  setStatusMode,
}: IModalProps): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [checkTerms, setCheckTerms] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (config.gtag.uaId && visible && statusMode === 'hasFunds') {
      ReactGA.modalview('product-purchase-modal');
    }
  }, [statusMode, visible]);

  const loggedInUser = useAppSelector((state) => state.session.user);
  const userBalance = useAppSelector(
    (state) => state.session.user?.availableBalance
  );

  const ErrorMessage = () =>
    Toast.error(
      <>
        There was an error processing your purchase. Please try again, see the{' '}
        <Link to="/help">help page</Link> to learn more.
      </>
    );

  const marketplaceFee = product?.resale
    ? product.resaleBuyersFeePercentage
    : product.initialBuyersFeePercentage;
  const history = useHistory();

  const checkPendingStatus = async () => {
    const res = await getMyTransactions(await getAccessTokenSilently(), 1, 5, {
      $or: [
        {
          type: {
            $in: ['purchase', 'deposit'],
          },
          status: { $exists: true },
        },
        {
          type: 'sale',
        },
        {
          type: 'royalty_fee',
        },
        {
          type: 'withdrawal',
        },
        {
          type: 'nft_redeem',
        },
        {
          type: 'claim',
        },
      ],
    });
    if (res.data.length !== 0) {
      const pendingTxArr = res.data.filter((el) => {
        return el.transactionData.listing === product.listing._id;
      });
      const pendingTx = pendingTxArr[0];
      if (pendingTx) {
        if (pendingTx.status === 'pending') {
          setStatusMode('processing');
          setTimeout(() => {
            checkPendingStatus();
          }, 2000);
        } else if (pendingTx.status === 'success') {
          setStatusMode('completed');
          Toast.success(
            <>
              You successfully purchased {pendingTx.transactionData.sku.name} #
              {pendingTx?.transactionData?.product[0]?.serialNumber} click{' '}
              <Link
                to={`/product/${pendingTx?.transactionData?.product[0]?._id}`}
              >
                here
              </Link>{' '}
              to view your product.
            </>
          );
          const pathName = history.location.pathname.split('/')[1];
          if (pathName && pathName === 'product') {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        }
      }
    }
  };

  const buyAction = async () => {
    if (!checkTerms) {
      Toast.error(purchase.termsError);
      return;
    }
    if (product.listing) {
      setLoading(true);
      const userToken = await getAccessTokenSilently();
      try {
        const result = await patchListingsPurchase(
          userToken,
          product?.listing?._id
        );

        // TODO: Check payment
        if (result) {
          setStatusMode('processing');
          checkPendingStatus();
          dispatch(getUserCardsThunk({ token: userToken }));
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        ErrorMessage();
      }
    } else {
      ErrorMessage();
    }
  };

  useEffect(() => {
    if (product.listing.price > parseFloat(userBalance)) {
      setStatusMode('noFunds');
    }
  }, []);
  useEffect(() => {
    checkPendingStatus();
  }, []);
  const handleActionButton = () => {
    if (statusMode === 'noFunds') {
      history.push({
        pathname: `/wallet`,
        state: { modalOpen: true },
      });
    } else if (statusMode === 'processing') {
      setModalPaymentVisible(false);
    } else if (statusMode === 'hasFunds') {
      buyAction();
    } else if (statusMode === 'completed') {
      history.push(`/product/${product._id}`);
    }
  };

  const handleWalletRouteChange = () => {
    history.push(`/wallet`);
  };

  const handleTCRouteChange = () => {
    window.open('/terms', '_blank');
  };

  const Body = () => {
    return (
      <>
        <S.Body>
          <S.CloseButton onClick={() => setModalPaymentVisible(false)}>
            <CloseModal style={{ cursor: 'pointer' }} />
          </S.CloseButton>
          <S.Header>
            {statusMode === 'hasFunds' && (
              <>
                <S.Title>Confirm your order:</S.Title>
                <S.SubTitle>
                  {' '}
                  Your current balance ${userBalance.toFixed(2)}
                </S.SubTitle>
              </>
            )}
            {statusMode === 'noFunds' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={alertIcon} alt="" />{' '}
                  <S.Title>Whoops, Insufficient funds!</S.Title>
                </div>
                <S.SubTitle style={{ color: '#E74C3C' }}>
                  Your available balance is $ {userBalance.toFixed(2)}
                </S.SubTitle>
              </>
            )}
            {statusMode === 'processing' && (
              <>
                <S.Title>
                  {"We're processing your order"}
                  <Emoji symbol="🙂" />
                </S.Title>
                <S.SubTitle style={{ color: '#7d7d7d' }}>
                  We will send you an email when your purchase has been
                  completed. Refresh the page to view the updated status.
                </S.SubTitle>
              </>
            )}
            {statusMode === 'completed' && (
              <>
                <S.Title>
                  <Emoji symbol="🤘" />
                  Yeah Payment Successful!
                </S.Title>
              </>
            )}
          </S.Header>
          <S.SkuInfo>
            <S.FlexRow>
              <S.IssuerName>{product?.sku?.issuerName}</S.IssuerName>
              <Rarity type={product?.sku?.rarity} />
            </S.FlexRow>
            <S.SkuName>{product?.sku?.name}</S.SkuName>
            <S.FlexRow>
              <S.SeriesName>{product?.sku?.series?.name}</S.SeriesName>
              {serialNum && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <S.SerialNum>Serial:</S.SerialNum>
                  <S.SeriesName>#{serialNum}</S.SeriesName>
                </div>
              )}
            </S.FlexRow>
          </S.SkuInfo>
          <S.SkuInfo>
            <S.FlexRow>
              <S.PriceInfo>Seller Price:</S.PriceInfo>
              <S.PriceInfo>
                ${product.activeProductListings[0]?.price.toFixed(2)}
              </S.PriceInfo>
            </S.FlexRow>
            <S.FlexRow>
              <S.PriceInfo>{`Marketplace Fee (${marketplaceFee}%):`}</S.PriceInfo>
              <S.PriceInfo>
                $
                {(
                  product.activeProductListings[0]?.price *
                  (marketplaceFee / 100)
                ).toFixed(2)}
              </S.PriceInfo>
            </S.FlexRow>
          </S.SkuInfo>
          <S.FlexRow>
            <S.Total>Total:</S.Total>
            <S.Total>
              $
              {(
                product.activeProductListings[0]?.price +
                product.activeProductListings[0]?.price * (marketplaceFee / 100)
              ).toFixed(2)}
            </S.Total>
          </S.FlexRow>
          {statusMode === 'hasFunds' && (
            <S.Center
              style={{ justifyContent: 'flex-start', paddingTop: '20px' }}
            >
              <div style={{ paddingTop: '20px' }}>
                <S.Check
                  color="default"
                  disableRipple
                  checked={checkTerms}
                  onClick={() => setCheckTerms(!checkTerms)}
                />
              </div>
              <S.Terms>I agree to the </S.Terms>{' '}
              <S.TermLink onClick={handleTCRouteChange}>
                {' '}
                Terms and Conditions
              </S.TermLink>
            </S.Center>
          )}
          <S.Center>
            {statusMode === 'hasFunds' && (
              <S.Text>
                Confirming this action will deduct the associated funds from
                your wallet.
              </S.Text>
            )}
            {statusMode === 'noFunds' && (
              <S.Text>You need more funds to make this purchase.</S.Text>
            )}
            {statusMode === 'processing' && <></>}
          </S.Center>
          {statusMode === 'hasFunds' && (
            <div style={{ paddingTop: '20px' }}>
              <S.Button disabled={loading} onClick={handleActionButton}>
                Buy Now
              </S.Button>
            </div>
          )}
          {statusMode === 'noFunds' && (
            <S.Button onClick={handleActionButton}>Add Funds</S.Button>
          )}
          {statusMode === 'processing' && (
            <div style={{ paddingTop: '40px' }}>
              <S.Button onClick={handleActionButton}>Continue</S.Button>
              <div style={{ paddingTop: '10px' }}>
                <S.SubButton onClick={handleWalletRouteChange}>
                  View Pending Transactions
                </S.SubButton>
              </div>
            </div>
          )}
          {statusMode === 'completed' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                paddingTop: '32px',
              }}
            >
              <S.Button disabled={loading} onClick={handleActionButton}>
                View Your Product
              </S.Button>
              <div style={{ marginTop: '20px' }}>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/collection/${loggedInUser.username}`}
                >
                  Back to Marketplace
                </Link>
              </div>
            </div>
          )}
        </S.Body>
      </>
    );
  };

  return (
    <Modal
      open={visible}
      onClose={() => {
        setModalPaymentVisible(false);
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      centered={true}
    >
      <Body />
    </Modal>
  );
};

export default BuyNowModal;
