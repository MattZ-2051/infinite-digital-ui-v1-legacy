import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import * as S from './styles';
import { Sku } from 'entities/sku';
import { User } from 'entities/user';
import { Listing } from 'entities/listing';
import { patchListingsPurchase } from 'services/api/listingService';
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { purchase } from 'utils/messages';
import Toast from 'utils/Toast';
import Modal from 'components/Modal';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import Rarity from 'components/Rarity';
import alertIcon from 'assets/img/icons/alert-icon.png';
import Emoji from 'components/Emoji';
import { getUserCardsThunk } from 'store/session/sessionThunks';
import { getMyTransactions } from 'services/api/userService';
import { ITransaction } from 'entities/transaction';

type Modes =
  | 'completed'
  | 'hasFunds'
  | 'noFunds'
  | 'processing'
  | 'error'
  | 'success';

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
  const [newProduct, setNewProduct] = useState<{
    _id: string;
    serialNumber: string;
  }>({ _id: '', serialNumber: '' });
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userBalance = useAppSelector(
    (state) => state.session.user?.availableBalance
  );
  const initialBuyersFeePercentage = parseFloat(
    useAppSelector((state) => state.session.user.initialBuyersFeePercentage)
  );

  const royaltyFee = Math.round(
    (product?.activeSkuListings[0]?.price * product?.royaltyFeePercentage) / 100
  );

  const fetchTransactions = async () => {
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
      ],
    });

    const tx: ITransaction[] | false =
      res.data instanceof Array &&
      res.data.filter((tx) => {
        if (tx?.transactionData?.sku?._id === product?._id) {
          return tx;
        }
      });

    checkPendingStatus(tx, res);
  };

  const checkPendingStatus = (tx, res) => {
    if (tx[0].status === 'pending' && tx[0].type === 'purchase') {
      setTimeout(() => {
        fetchTransactions();
      }, 5000);
    } else if (tx[0].status === 'success' && tx[0].type === 'purchase') {
      setModalPaymentVisible(true);
      setStatusMode('success');
      const newPurchasedProduct = res.data[0]?.transactionData?.product[0];
      const url = history.location.pathname.split('/');
      setNewProduct(newPurchasedProduct);
      if (url[2] !== product._id) {
        Toast.success(
          <>
            Congrats! Your NFT purchase was processed successfully! Click
            <a href={`/product/${newPurchasedProduct._id}`}> here </a> to view
            your product {product.name} #{newPurchasedProduct.serialNumber}.
          </>
        );
      }

      if (url[1] === 'marketplace' && url[2] === product._id) {
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } else if (tx[0].status === 'error' && tx[0].type === 'purchase') {
      setModalPaymentVisible(true);
      setStatusMode('error');
      Toast.error(
        <>
          There was an error processing your purchase. Please try again, see the{' '}
          <a href="/help">Help page</a> to learn more.
        </>
      );
    }
  };

  const buyAction = async () => {
    if (!checkTerms) {
      Toast.error(purchase.termsError);
      return;
    }
    if (listing) {
      setLoading(true);
      const userToken = await getAccessTokenSilently();
      const response = await patchListingsPurchase(userToken, listing._id);
      // TODO: Check payment
      if (response.status === 200) {
        setStatusMode('processing');
        dispatch(getUserCardsThunk({ token: userToken }));
        setLoading(false);
        fetchTransactions();
      } else {
        setLoading(false);
        Toast.error(
          <>
            Please try again, see the <a href="/help">Help page</a> to learn
            more.
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
    history.push('/terms');
  };

  const content = (
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
                Your current balance ${Number(userBalance || 0).toFixed(2)}
              </S.SubTitle>
            </>
          )}
          {statusMode === 'noFunds' && (
            <>
              <S.ContentIconTitle>
                <img src={alertIcon} alt="" style={{ marginRight: '10px' }} />
                <S.Title> Whoops, Insufficient funds!</S.Title>
              </S.ContentIconTitle>
              <S.SubTitle style={{ color: '#E74C3C' }}>
                Your wallet balance is ${Number(userBalance || 0).toFixed(2)}
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
                We will send you an email when your purchase has been completed.
                Refresh the page to view the updated status.
              </S.SubTitle>
            </>
          )}
          {statusMode === 'success' && (
            <>
              <S.Title>
                <Emoji symbol="🤘" />
                Yeah! Payment Successful.
              </S.Title>
            </>
          )}
          {statusMode === 'error' && (
            <>
              <S.Title>
                <Emoji symbol="😬" />
                Oops, something went wrong!
              </S.Title>
            </>
          )}
        </S.Header>
        {statusMode !== 'error' ? (
          <S.SkuInfo>
            <S.FlexRow>
              <S.IssuerName>{product.issuerName}</S.IssuerName>
              <Rarity type={product.rarity} />
            </S.FlexRow>
            <S.SkuName>{product.name}</S.SkuName>
            <S.FlexRow>
              <S.SeriesName>{product?.series?.name}</S.SeriesName>
              {statusMode === 'success' && (
                <S.Flex>
                  <S.SerialName>Serial:</S.SerialName>
                  <div style={{ paddingLeft: '5px' }}>
                    <S.SeriesName>#{newProduct.serialNumber}</S.SeriesName>
                  </div>
                </S.Flex>
              )}
            </S.FlexRow>
          </S.SkuInfo>
        ) : (
          <S.Center>
            <S.Text>
              There was an error processing your transaction. please try again
              or contact support if the issues persists.
            </S.Text>
          </S.Center>
        )}

        {statusMode !== 'success' && statusMode !== 'error' && (
          <>
            <S.SkuInfo>
              <S.FlexRow>
                <S.PriceInfo>Seller Price:</S.PriceInfo>
                <S.PriceInfo>
                  ${product?.activeSkuListings[0]?.price.toFixed(2)}
                </S.PriceInfo>
              </S.FlexRow>
              <S.FlexRow>
                <S.PriceInfo>{`Marketplace Fee (${initialBuyersFeePercentage}%):`}</S.PriceInfo>
                <S.PriceInfo>
                  $
                  {(product?.activeSkuListings[0]?.price * (5 / 100)).toFixed(
                    2
                  )}
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
          </>
        )}

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
              Confirming this action will deduct the associated funds from your
              wallet.
            </S.Text>
          )}
          {statusMode === 'noFunds' && (
            <S.Text>You need more funds to make this purchase.</S.Text>
          )}
          {statusMode === 'success' && (
            <S.Text>
              Your purchase was successful, and this item has been added to your
              collection.
            </S.Text>
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
        {statusMode === 'success' && (
          <div style={{ paddingTop: '20px' }}>
            <S.Button
              disabled={loading}
              onClick={() => history.push(`/product/${newProduct?._id}`)}
            >
              View Your Product
            </S.Button>
            <div style={{ paddingTop: '10px' }}>
              <S.SubButton onClick={() => history.push('/marketplace')}>
                Back to Marketplace
              </S.SubButton>
            </div>
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
        {statusMode === 'error' && (
          <div style={{ paddingTop: '40px' }}>
            <S.Button onClick={() => setModalPaymentVisible(false)}>
              Try Again
            </S.Button>
            <div style={{ paddingTop: '10px' }}>
              <S.SubButton onClick={() => history.push('/help')}>
                Help / Contact Support
              </S.SubButton>
            </div>
          </div>
        )}
      </S.Body>
    </>
  );

  return (
    <Modal
      open={visible}
      onClose={() => {
        setModalPaymentVisible(false);
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {content}
    </Modal>
  );
};

export default SkuPageModal;
