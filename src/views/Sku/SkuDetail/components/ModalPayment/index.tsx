import React from 'react';
import Modal from 'components/Modal';
import MuiDivider from '@material-ui/core/Divider';
import * as S from './styles';
import { Link } from 'react-router-dom';
import Button from 'components/Buttons/Button';
import alertIcon from 'assets/img/icons/alert-icon.png';
import handIcon from 'assets/img/icons/hand-icon.png';
import { ReactComponent as Redeemable } from 'assets/svg/icons/redeemable2.svg';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { patchListingsPurchase } from 'services/api/listingService';
import { useAuth0 } from '@auth0/auth0-react';
import { SkuWithFunctionsPopulated } from 'entities/sku';
import { User } from 'entities/user';

export interface IModalProps {
  visible: boolean;
  setModalPaymentVisible: any;
  mode: string;
  product: SkuWithFunctionsPopulated;
  user: User;
  showSerial?: boolean;
}

const ModalPayment = ({
  visible,
  setModalPaymentVisible,
  mode,
  product,
  user,
  showSerial = false,
}: IModalProps) => {
  // TODO: Add buyersfee
  const { getAccessTokenSilently } = useAuth0();

  const royaltyFee = Math.round(
    (product.minSkuPrice * product.royaltyFeePercentage) / 100
  );
  const username = useAppSelector((state) => state.session.user.username);
  const history = useHistory();

  const buyAction = async () => {
    console.log('=====================');
    console.log('!!! product =>', product);
    console.log('=====================');
    const userToken = await getAccessTokenSilently();
    // TODO: Get product id
    // TODO: Catch service result
    const result = await patchListingsPurchase(userToken, product._id);
    console.log('=====================');
    console.log('result', result);
    console.log('=====================');
  };

  const handleActionButton = () => {
    if (mode === 'noFunds') {
      history.push({
        pathname: `/wallet/${username}`,
        state: { modalOpen: true },
      });
    } else if (mode === 'hasFunds') {
      buyAction();
    }
  };

  const Content: any = () => (
    <>
      <S.ImageContainer>
        <img src={product.imageUrls[0]} alt="" />
        <S.CloseButton onClick={() => setModalPaymentVisible(false)}>
          <CloseModal style={{ cursor: 'pointer' }} />
        </S.CloseButton>
      </S.ImageContainer>

      <S.Header>
        <S.Title>
          {mode === 'hasFunds' && <>Confirm your order:</>}
          {mode === 'noFunds' && (
            <>
              <img src={alertIcon} alt="" /> Whoops, Insuficient funds!
            </>
          )}
          {mode === 'completed' && (
            <>
              <img src={handIcon} alt="" /> Yeah! Payment sucessful.
            </>
          )}
        </S.Title>

        <S.SubTitle>
          {mode === 'hasFunds' && (
            <span style={{ color: '#12C95F' }}>
              Your current balance ${user.availableBalance}
            </span>
          )}
          {mode === 'noFunds' && (
            <span style={{ color: '#E74C3C' }}>
              Your wallet balance ${user.availableBalance}
            </span>
          )}
        </S.SubTitle>
      </S.Header>

      <MuiDivider style={{ margin: '20px 0 20px 0' }} />

      <S.Detail>
        <S.DetailRow>
          <span style={{ color: '#9E9E9E' }}>Shoes</span>
          <S.Rarity>
            <span></span> {product.rarity}
          </S.Rarity>
        </S.DetailRow>

        <S.DetailRow style={{ fontSize: '20px' }}>
          <span>{product.name}</span>
          <span>${product.minSkuPrice}</span>
        </S.DetailRow>

        <S.DetailRow>
          <span>
            {product.series.name} /{' '}
            {product.redeemable && (
              <>
                <Redeemable /> Redeemable
              </>
            )}
          </span>
          {showSerial && (
            <div>
              <span style={{ color: '#9E9E9E' }}>Serial:</span> #2445
            </div>
          )}
        </S.DetailRow>
      </S.Detail>

      <MuiDivider style={{ margin: '20px 0 20px 0' }} />

      <S.Detail>
        <S.DetailRowPrice>
          <span>Subtotal:</span>
          <span>${product.minSkuPrice}</span>
        </S.DetailRowPrice>
      </S.Detail>

      <MuiDivider style={{ margin: '20px 0 20px 0' }} />

      <S.Detail>
        <S.DetailRowPrice>
          <span>Total:</span>
          <strong>${product.minSkuPrice}</strong>
        </S.DetailRowPrice>
      </S.Detail>

      <S.Footer>
        <p style={{ marginBottom: '32px', color: '#7D7D7D' }}>
          {mode === 'hasFunds' && (
            <>
              {product.royaltyFeePercentage && (
                <strong>
                  Royalty fee per unit aprox ${royaltyFee} (
                  {product.royaltyFeePercentage}%)
                </strong>
              )}
              By confirming this action will discount the <br /> amount from
              your wallet.
            </>
          )}
          {mode === 'noFunds' && (
            <> You need more founds to make this purchase.</>
          )}
          {mode === 'completed' && (
            <>
              You successfully bought this item, and <br /> now is part of your
              collection.
            </>
          )}
        </p>

        <Button
          style={{
            height: '56px',
            borderRadius: '24px',
            width: '100%',
            textDecoration: 'none',
            textTransform: 'capitalize',
          }}
          onClick={handleActionButton}
        >
          {mode === 'hasFunds' && 'Place Order'}
          {mode === 'noFunds' && 'Add Funds'}
          {mode === 'completed' && 'View Your Product'}
        </Button>

        {mode === 'completed' && (
          <div style={{ marginTop: '20px' }}>
            <Link style={{ textDecoration: 'none' }} to={''}>
              Back to Marketplace
            </Link>
          </div>
        )}
      </S.Footer>
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
      <Content />
    </Modal>
  );
};

export default ModalPayment;
