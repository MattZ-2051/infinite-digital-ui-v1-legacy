import React, { useState, useEffect, VoidFunctionComponent } from 'react';
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
import { HistoryStatus } from '../../History/types';

export interface IModalProps {
  product: ProductWithFunctions;
  setStatus: (a: HistoryStatus) => void;
  setActiveSalePrice: (a: number) => void;
  setSaleModal: (a: boolean) => void;
  isModalOpen: boolean;
}

const CreateSale = ({
  product,
  setStatus,
  setActiveSalePrice,
  setSaleModal,
  isModalOpen,
}: IModalProps): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0();
  const [price, setPrice] = useState<string>('0');
  const [serviceFee, setServiceFee] = useState<number>();
  const [royaltyFee, setRoyaltyFee] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState(false);

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
        setTimeout(() => {
          window.location.reload();
        }, 1200);
        setLoading(false);
        setSaleModal(false);
        setActiveSalePrice(result.data?.price);
      }
    } catch (e) {
      setLoading(false);
      Toast.error(createSale.error);
    }
  };

  const onPriceChanged = (value) => {
    if (/\d*(\.|,){0,1}\d{3}$/g.test(value)) {
      setPrice(parseFloat(parseFloat(value).toFixed(2)).toString());
    } else {
      setPrice(value);
    }
  };

  const handleClose = () => {
    setSaleModal(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      centered={true}
    >
      <S.Body>
        <S.CloseButton onClick={handleClose}>
          <CloseModal />
        </S.CloseButton>
        <S.Header>
          <S.Title>List Your NFT For Sale</S.Title>
        </S.Header>
        <S.ModalContainer>
          <S.StyledMuiDivider />

          <S.Detail>
            <S.DetailRow>
              <S.IssuerName>{product?.sku?.issuerName}</S.IssuerName>
              <Rarity type={product?.sku?.rarity} />
            </S.DetailRow>

            <S.DetailRow style={{ fontSize: '20px' }}>
              <S.SkuName>{product?.sku?.name}</S.SkuName>
            </S.DetailRow>

            <S.DetailRow>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <S.SeriesName>{product?.sku?.series?.name}</S.SeriesName>
                {product?.sku?.redeemable && (
                  <>
                    <Redeemable />{' '}
                    <S.Redeemable>&nbsp;/ Reedemable</S.Redeemable>
                  </>
                )}
              </div>
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
              onChange={(value) => onPriceChanged(value)}
              defaultValue={price}
              name={price}
            />
          </S.InputContainer>
          <S.Detail>
            <S.DetailRowPrice>
              <div>
                <span>Marketplace fee ({fee}%):</span>
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
              If your NFT is bought on the marketplace, payment will be
              transferred to your INFINITE wallet.
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
      </S.Body>
    </Modal>
  );
};

export default CreateSale;
