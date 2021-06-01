import * as S from './styles';
import Modal from 'components/Modal';

interface Props {
  visible: boolean;
  setModalPaymentVisible: (a: boolean) => void;
}

const RedeemModal = ({ visible, setModalPaymentVisible }: Props) => {
  const Body = (): JSX.Element => {
    return (
      <S.Container>
        <h1>Redeem Modal</h1>
      </S.Container>
    );
  };
  return (
    <Modal
      open={visible}
      onClose={() => setModalPaymentVisible(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Body />
    </Modal>
  );
};

export default RedeemModal;
