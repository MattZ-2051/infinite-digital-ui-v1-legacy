import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { S } from './styles';
import { Sku } from 'entities/sku';
import { User } from 'entities/user';
import { Listing } from 'entities/listing';
import { patchListingsPurchase } from 'services/api/listingService';
import { useHistory, Link } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { purchase } from 'utils/messages';
import Toast from 'utils/Toast';
import Modal from 'components/Modal';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import Rarity from 'components/Rarity';
import alertIcon from 'assets/img/icons/alert-icon.png';
import Emoji from 'components/Emoji';

type Modes = 'completed' | 'hasFunds' | 'noFunds' | 'processing';

interface IModalProps {
  visible: boolean;
  setModalPaymentVisible: any;
  mode: Modes;
  sku: Sku;
  user?: User;
  listing?: Listing;
  serialNum?: string;
  onProcessing?: () => void;
}

const SkuPageModal = ({
  visible,
  setModalPaymentVisible,
  mode,
  sku: product,
  serialNum,
  listing,
  onProcessing,
}: IModalProps): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [statusMode, setStatusMode] = useState<Modes>(mode);
  const [checkTerms, setCheckTerms] = useState<boolean>(false);

  const history = useHistory();
  const userBalance = useAppSelector(
    (state) => state.session.userCards?.balance?.amount
  );

  const royaltyFee = Math.round(
    (product?.activeSkuListings[0].price * product.royaltyFeePercentage) / 100
  );

  const buyAction = async () => {
    if (!checkTerms) {
      Toast.error(purchase.termsError);
      return;
    }
    if (listing) {
      setLoading(true);
      const userToken = await getAccessTokenSilently();
      try {
        const result = await patchListingsPurchase(userToken, listing._id);
        // TODO: Check payment
        if (result) {
          setStatusMode('processing');
          Toast.success(purchase.patchListingsPurchaseProcessing);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        Toast.error(
          <>
            There was an error processing your purchase. Please try again, see
            the <a href="/help">Help page</a> to learn more.
          </>
        );
      }
    } else {
      Toast.error(
        <>
          There was an error processing your purchase. Please try again, see the{' '}
          <a href="/help">Help page</a> to learn more.
        </>
      );
    }
  };

  const handleActionButton = () => {
    if (statusMode === 'noFunds') {
      history.push({
        pathname: `/wallet`,
        state: { modalOpen: true },
      });
    } else if (statusMode === 'processing') {
      onProcessing ? onProcessing() : null;
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
    history.push('/tc');
  };

  const Body = () => {
    return (
      <>
        {/* <S.ImageContainer>
          <img src={product.imageUrls[0]} alt="" />
          <S.CloseButton onClick={() => setModalPaymentVisible(false)}>
            <CloseModal style={{ cursor: 'pointer' }} />
          </S.CloseButton>
        </S.ImageContainer> */}
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
                  Your current balance ${parseInt(userBalance, 10).toFixed(2)}
                </S.SubTitle>
              </>
            )}
            {statusMode === 'noFunds' && (
              <>
                <div>
                  <img src={alertIcon} alt="" />{' '}
                  <S.Title>Whoops, Insufficient funds!</S.Title>
                </div>
                <S.SubTitle style={{ color: '#E74C3C' }}>
                  Your wallet balance is $ {parseFloat(userBalance).toFixed(2)}
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
          </S.Header>
          <S.SkuInfo>
            <S.FlexRow>
              <S.IssuerName>{product.issuerName}</S.IssuerName>
              <Rarity type={product.rarity} />
            </S.FlexRow>
            <S.SkuName>{product.name}</S.SkuName>
            <S.FlexRow>
              <S.SeriesName>{product?.series?.name}</S.SeriesName>
              {serialNum && (
                <div>
                  <S.SerialName>Serial</S.SerialName>
                  <S.SeriesName>{serialNum}</S.SeriesName>
                </div>
              )}
            </S.FlexRow>
          </S.SkuInfo>
          <S.SkuInfo>
            <S.FlexRow>
              <S.PriceInfo>Seller Price:</S.PriceInfo>
              <S.PriceInfo>
                ${product?.activeSkuListings[0]?.price.toFixed(2)}
              </S.PriceInfo>
            </S.FlexRow>
            <S.FlexRow>
              <S.PriceInfo>{`Marketplace Fee (5%):`}</S.PriceInfo>
              <S.PriceInfo>
                ${(product?.activeSkuListings[0]?.price * (5 / 100)).toFixed(2)}
              </S.PriceInfo>
            </S.FlexRow>
          </S.SkuInfo>
          <S.FlexRow>
            <S.Total>Total:</S.Total>
            <S.Total>
              $
              {(
                product?.activeSkuListings[0]?.price +
                product?.activeSkuListings[0]?.price * (5 / 100)
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
              <S.Text>You need more founds to make this purchase.</S.Text>
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
    >
      <Body />
    </Modal>
  );
};

export default SkuPageModal;
