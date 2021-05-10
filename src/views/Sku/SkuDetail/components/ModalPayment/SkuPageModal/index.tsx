import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { S } from './styles';
import { Sku } from 'entities/sku';
import { User } from 'entities/user';
import { Listing } from 'entities/listing';
import { patchListingsPurchase } from 'services/api/listingService';
import { useHistory } from 'react-router-dom';
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
  user: User;
  showSerial?: boolean;
  listing?: Listing;
}

const SkuPageModal = ({
  visible,
  setModalPaymentVisible,
  mode,
  sku: product,
  user,
  showSerial = false,
  listing,
}: IModalProps): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [statusMode, setStatusMode] = useState<Modes>(mode);

  const loggedInUser = useAppSelector((state) => state.session.user);
  const history = useHistory();

  const royaltyFee = Math.round(
    (product.minSkuPrice * product.royaltyFeePercentage) / 100
  );

  const buyAction = async () => {
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
        Toast.error(purchase.patchListingsPurchaseError);
      }
    } else {
      Toast.error(purchase.patchListingsPurchaseError);
    }
  };

  const handleActionButton = () => {
    if (statusMode === 'noFunds') {
      history.push({
        pathname: `/wallet/${loggedInUser.username}`,
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
    history.push(`/wallet/${loggedInUser.username}`);
  };
  const Body = () => {
    return (
      <>
        <S.ImageContainer>
          <img src={product.imageUrls[0]} alt="" />
          <S.CloseButton onClick={() => setModalPaymentVisible(false)}>
            <CloseModal style={{ cursor: 'pointer' }} />
          </S.CloseButton>
        </S.ImageContainer>
        <S.Body>
          <S.Header>
            {statusMode === 'hasFunds' && (
              <>
                <S.Title>Confirm your order:</S.Title>
                <S.SubTitle>
                  {' '}
                  Your current balance ${loggedInUser.availableBalance}
                </S.SubTitle>
              </>
            )}
            {statusMode === 'noFunds' && (
              <>
                <div>
                  <img src={alertIcon} alt="" />{' '}
                  <S.Title>Whoops, Insuficient funds!</S.Title>
                </div>
                <S.SubTitle style={{ color: '#E74C3C' }}>
                  Your wallet balance is ${loggedInUser.availableBalance}
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
                  We will notify you when complete
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
          </S.SkuInfo>
          <S.SkuInfo>
            <S.FlexRow>
              <S.PriceInfo>Seller Price</S.PriceInfo>
              <S.PriceInfo>${product.minSkuPrice}</S.PriceInfo>
            </S.FlexRow>
            <S.FlexRow>
              <S.PriceInfo>{'Service Fee: (5%)'}</S.PriceInfo>
              <S.PriceInfo>${product.minSkuPrice * 0.05}</S.PriceInfo>
            </S.FlexRow>
          </S.SkuInfo>
          <S.FlexRow>
            <S.Total>Total:</S.Total>
            <S.Total>
              ${product.minSkuPrice + product.minSkuPrice * 0.05}
            </S.Total>
          </S.FlexRow>
          {statusMode === 'hasFunds' && (
            <S.Center>
              <S.Terms>Terms and Conditions</S.Terms>
            </S.Center>
          )}
          <S.Center>
            {statusMode === 'hasFunds' && (
              <S.Text>
                Confirming your order will complete the purchase, and the total
                price will be deducted from your wallet.
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
