import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Modal from 'components/Modal';
import Button from 'components/Buttons/Button';
import TextField from 'components/TextFIeld';
import Toast from 'utils/Toast';
import { createSale } from 'utils/messages';
import { ProductWithFunctions } from 'entities/product';
import { postListings } from 'services/api/listingService';
import * as S from './styles';
import { ReactComponent as Redeemable } from 'assets/svg/icons/redeemable2.svg';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import Rarity from 'components/Rarity';
import { Status } from '../../History/index';

export interface IModalProps {
  visible: boolean;
  setModalPaymentVisible: (a: boolean) => void;
  product: ProductWithFunctions;
  setStatus: (a: Status) => void;
  setActiveSalePrice: (a: number) => void;
}

const CreateSale = ({
  visible,
  setModalPaymentVisible,
  product,
  setStatus,
  setActiveSalePrice,
}: IModalProps): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0();
  const [price, setPrice] = useState<string>('0');
  const [serviceFee, setServiceFee] = useState<number>();
  const [royaltyFee, setRoyaltyFee] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState(false);

  const fee = product?.resale
    ? product?.resaleSellersFeePercentage
    : product?.initialSellersFeePercentage;

  useEffect(() => {
    if (price) {
      const serviceFee = (fee * parseFloat(price)) / 100;
      const royaltyFee =
        (product?.royaltyFeePercentage * parseFloat(price)) / 100;
      setServiceFee(serviceFee);
      setRoyaltyFee(royaltyFee);
      setTotal(parseFloat(price) - serviceFee - royaltyFee);
    }
  }, [price]);

  const startSale = async () => {
    setLoading(true);
    const userToken = await getAccessTokenSilently();
    try {
      const result = await postListings(userToken, {
        price: parseFloat(price) || 0,
        type: 'product',
        product: product?._id,
        saleType: 'fixed',
        startDate: new Date(),
        issuer: product?.owner?._id,
        sku: product.sku,
        supply: 1,
      });
      if (result) {
        Toast.success(createSale.success);
        setLoading(false);
        setStatus('active-sale');
        setModalPaymentVisible(false);
        setActiveSalePrice(result.data?.price);
      }
    } catch (e) {
      setLoading(false);
      Toast.error(createSale.error);
    }
  };

  return (
    <Modal
      open={visible}
      onClose={() => setModalPaymentVisible(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {/* <S.ImageContainer>
        <img src={product?.sku?.imageUrls[0]} alt="" />
        <S.CloseButton onClick={() => setModalPaymentVisible(false)}>
          <CloseModal />
        </S.CloseButton>
      </S.ImageContainer> */}
      <S.CloseButton onClick={() => setModalPaymentVisible(false)}>
        <CloseModal />
      </S.CloseButton>
      <S.Header>
        <S.Title>List Your NFT For Sale</S.Title>
      </S.Header>
      <S.ModalContainer>
        <S.StyledMuiDivider />

        <S.Detail>
          <S.DetailRow>
            <span>{product?.sku?.issuerName}</span>
            <Rarity type={product?.sku?.rarity} />
          </S.DetailRow>

          <S.DetailRow style={{ fontSize: '20px' }}>
            <span>{product?.sku?.name}</span>
          </S.DetailRow>

          <S.DetailRow>
            <span>
              {product?.sku?.series?.name}
              {product?.sku?.redeemable && (
                <>
                  <Redeemable /> / Redeemable
                </>
              )}
            </span>
            <div>
              <span style={{ color: '#9E9E9E' }}>Serial:</span>
              <span>#{product.serialNumber}</span>
            </div>
          </S.DetailRow>
        </S.Detail>

        <S.StyledMuiDivider />
        <S.InputContainer>
          <TextField
            type="money"
            placeholder="Enter price"
            onChange={(value) => setPrice(value)}
            name={price}
          />
        </S.InputContainer>
        <S.Detail>
          <S.DetailRowPrice>
            <div>
              <span>Marketplace fee (fee%):</span>
            </div>
            <div>
              <span>${price === '' ? 0 : serviceFee?.toFixed(2)}</span>
            </div>
          </S.DetailRowPrice>
          {product?.royaltyFeePercentage > 0 && (
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
              <strong>Final Payout:</strong>
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
            Listing your NFT for sale on the marketplace will allow it to be
            purchased by other users. Once listed for sale it cannot be canceled
            <br />
            <a
              target="_blank"
              href="https://support.suku.world/"
              rel="noreferrer"
            >
              Click here to learn more.
            </a>
          </p>
        </S.Footer>
        <Button
          style={{
            height: '56px',
            borderRadius: '24px',
            width: '100%',
            textDecoration: 'none',
            textTransform: 'capitalize',
          }}
          onClick={startSale}
          disabled={loading || !price}
        >
          Start Sale
        </Button>
      </S.ModalContainer>
    </Modal>
  );
};

export default CreateSale;