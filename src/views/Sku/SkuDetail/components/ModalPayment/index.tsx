import Modal from 'components/Modal';
import MuiDivider from '@material-ui/core/Divider';
import * as S from './styles';
import { Link } from 'react-router-dom';
// Local
import Button from 'components/Buttons/Button';
import alertIcon from 'assets/img/icons/alert-icon.png';
import handIcon from 'assets/img/icons/hand-icon.png';
import shoeImg from 'assets/temp/shoe.png';
import { ReactComponent as Redeemable } from 'assets/svg/icons/redeemable2.svg';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import React from 'react';

export interface IModalProps {
  visible: boolean;
  setModalPaymentVisible: any;
  mode: string;
}

const ModalPayment: React.FC<IModalProps> = ({
  visible,
  setModalPaymentVisible,
  mode,
}) => {
  const Content: any = () => (
    <>
      <S.ImageContainer>
        <img src={shoeImg} alt="" />
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
              Your current balance ${782}
            </span>
          )}
          {mode === 'noFunds' && (
            <span style={{ color: '#E74C3C' }}>Your wallet balance ${80}</span>
          )}
        </S.SubTitle>
      </S.Header>

      <MuiDivider style={{ margin: '20px 0 20px 0' }} />

      <S.Detail>
        <S.DetailRow>
          <span style={{ color: '#9E9E9E' }}>K8IROS</span>
          <S.Rarity>
            <span></span> Rare
          </S.Rarity>
        </S.DetailRow>

        <S.DetailRow style={{ fontSize: '20px' }}>
          <span>K8IROS 8.1 — BK Shadow</span>
          <span>$120</span>
        </S.DetailRow>

        <S.DetailRow>
          <span>
            Size 11 / <Redeemable /> Redeemable
          </span>
          <div>
            <span style={{ color: '#9E9E9E' }}>Serial:</span> #2445
          </div>
        </S.DetailRow>
      </S.Detail>

      <MuiDivider style={{ margin: '20px 0 20px 0' }} />

      <S.Footer>
        <p style={{ marginBottom: '32px', color: '#7D7D7D' }}>
          {mode === 'hasFunds' && (
            <>
              By confirming this action will discount the <br /> amount from your
              wallet.
            </>
          )}
          {mode === 'noFunds' && (
            <> You need more founds to make this purchase.</>
          )}
          {mode === 'completed' && (
            <>
              You successfully bought this item, and  <br /> now is part of your
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
        >
          {mode === 'hasFunds' && 'Place Order'}
          {mode === 'noFunds' && 'Add Funds'}
          {mode === 'completed' && 'View Your Product'}
        </Button>

        {mode === 'completed' && (
          <div style={{marginTop: '20px'}}>
            <Link style={{textDecoration: 'none'}} to={''}>Back to Marketplace</Link>
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
