import Modal from 'components/Modal';
import MuiDivider from '@material-ui/core/Divider';
import * as S from './styles';
// Local
import Button from 'components/Buttons/Button';
import alertIcon from 'assets/img/icons/alert-icon.png';
import shoeImg from 'assets/temp/shoe.png';
import { ReactComponent as Redeemable } from 'assets/svg/icons/redeemable2.svg';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';

export interface ModalProps {}

const ModalPayment: React.FC<ModalProps> = () => {
  const Content: any = () => (
    <>
      <S.ImageContainer>
        <img src={shoeImg} alt="" />
        <S.CloseButton>
          <CloseModal style={{ cursor: 'pointer' }} />
        </S.CloseButton>
      </S.ImageContainer>

      <S.Header>
        <S.Title>
          {' '}
          <img src={alertIcon} alt="" /> Whoops, Insuficient funds!
        </S.Title>
        <S.SubTitle>Your wallet balance $80</S.SubTitle>
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
          You need more founds to make this purchase.
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
          Add Funds
        </Button>
      </S.Footer>
    </>
  );

  return (
    <Modal
      open={true}
      onClose={() => {
        console.log('cerrado');
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Content />
    </Modal>
  );
};

export default ModalPayment;
