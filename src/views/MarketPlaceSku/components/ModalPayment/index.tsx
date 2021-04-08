import Modal from 'components/Modal';
import MuiDivider from '@material-ui/core/Divider';
import * as S from './styles';

export interface ModalProps {

}

const ModalPayment: React.FC<ModalProps> = () => {
  const Content: any = () => (
    <>
      <S.ImageContainer>
        <S.CloseButton>X</S.CloseButton>
      </S.ImageContainer>

      <S.Header>
        <S.Title>Whoops, Insuficient funds!</S.Title>
        <div>Your wallet balance $80</div>
      </S.Header>

      <MuiDivider style={{ margin: '20px 0 20px 0' }} />

      <S.Detail>
        <S.DetailRow>
          <span>K8IROS</span>
          <S.Rarity>Rare</S.Rarity>
        </S.DetailRow>

        <S.DetailRow>
          <span>K8IROS 8.1 — BK Shadow</span>
          <span>$120</span>
        </S.DetailRow>

        <S.DetailRow>
          <span>Size 11 / x Redeemable</span>

          <span>Serial: #2445</span>
        </S.DetailRow>
      </S.Detail>

      <MuiDivider style={{ margin: '20px 0 20px 0' }} />

      <S.Footer>
        <p style={{marginBottom: '40px'}}>You need more founds to make this purchase.</p>
        <button>Add Funds</button>
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
