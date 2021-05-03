import React, { useState } from 'react';
import Modal from 'components/Modal';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import { ReactComponent as Redeemable } from 'assets/svg/icons/redeemable2.svg';
import * as S from './styles';
import { ProductWithFunctions } from 'entities/product';
import MuiDivider from '@material-ui/core/Divider';
import Button from 'components/Buttons/Button';
import TextFIeld from 'components/TextFIeld';
import CheckBox from 'components/CheckBox';
import { Status } from '../History';

type Modes = 'completed' | 'hasFunds' | 'noFunds';

export interface IModalProps {
  visible: boolean;
  setModalPaymentVisible: any;
  product: ProductWithFunctions;
  mode: Modes;
  status: Status;
  activeAmount: number;
}

const ModalPayment = ({
  visible,
  setModalPaymentVisible,
  product,
  mode,
  activeAmount,
}: IModalProps) => {
  const [loading, setLoading] = useState(false);
  const [minimumBid, setMinimumBid] = useState<string>('');
  const [agree, setAgree] = useState(false);

  const { sku } = product;

  const handleMinimumBidChange = (newValue) => {
    setMinimumBid(newValue);
  };

  const handleActionButton = () => console.log('click');

  const totalPriceWithFee = Math.round(activeAmount * 1.05);

  return (
    <Modal
      open={visible}
      onClose={() => {
        setModalPaymentVisible(false);
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <S.ImageContainer>
        <img src={sku.imageUrls[0]} alt="" />
        <S.CloseButton onClick={() => setModalPaymentVisible(false)}>
          <CloseModal style={{ cursor: 'pointer' }} />
        </S.CloseButton>
      </S.ImageContainer>

      <S.Header>
        <S.Title>Confirm your bid:</S.Title>
        <S.SubTitle style={{ color: '#12C95F' }}>
          Your current balance is $782
        </S.SubTitle>
      </S.Header>
      <S.ModalContainer>
        <MuiDivider style={{ margin: '20px 0 20px 0' }} />

        <S.Detail>
          <S.DetailRow>
            <span style={{ color: '#9E9E9E' }}>Shoes</span>
            <S.Rarity>
              <span></span> {sku.rarity}
            </S.Rarity>
          </S.DetailRow>

          <S.DetailRow style={{ fontSize: '20px' }}>
            <span>{sku.name}</span>
            <span>${activeAmount}</span>
          </S.DetailRow>

          <S.DetailRow>
            <span>
              {sku.series.name} /{' '}
              {sku.redeemable && (
                <>
                  <Redeemable /> Redeemable
                </>
              )}
            </span>
            <div>
              <span style={{ color: '#9E9E9E' }}>Serial:</span> #2445
            </div>
          </S.DetailRow>
        </S.Detail>

        <MuiDivider style={{ margin: '20px 0 20px 0' }} />

        <CheckBox
          name="agree"
          label="I acknowledge that this item has already been redeemed."
          onChange={(newValue) => {
            setAgree(newValue);
          }}
        />

        <p style={{ color: '#9E9E9E' }}>
          Your card will be authorized immediately, but the funds are
          transferred only after the auction ends. Bids can not be canceled, but
          can be increased as the auction progresses.
        </p>

        <MuiDivider style={{ margin: '20px 0 20px 0' }} />

        <S.Detail>
          <S.DetailRow>
            <div>
              <span style={{ color: '#9E9E9E' }}>Your Bid:</span>
            </div>
            <div>
              <span>
                <strong>${activeAmount}</strong>
              </span>
            </div>
          </S.DetailRow>
          <S.DetailRow>
            <div>
              <span style={{ color: '#9E9E9E' }}>Service fee: (5%)</span>
            </div>
            <div>
              <span style={{ color: '#9E9E9E' }}>${totalPriceWithFee}</span>
            </div>
          </S.DetailRow>
        </S.Detail>

        <MuiDivider style={{ margin: '20px 0 20px 0' }} />

        <S.Detail>
          <S.DetailRow>
            <div>
              <strong>Total cost </strong>
              <span style={{ color: '#9E9E9E' }}>(if you win)</span>
              <strong> :</strong>
            </div>
            <div>
              <strong style={{ fontSize: '20px' }}>${totalPriceWithFee}</strong>
            </div>
          </S.DetailRow>
        </S.Detail>

        <S.Footer>
          <p>
            All resales of this product are subject to a 5% royalty fee set by
            and to be paid to the original creator.
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
          onClick={handleActionButton}
          disabled={loading}
        >
          Place Bid
        </Button>
      </S.ModalContainer>
    </Modal>
  );
};

export default ModalPayment;
