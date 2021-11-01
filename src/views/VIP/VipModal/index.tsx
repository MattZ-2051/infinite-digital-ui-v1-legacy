import * as S from './styles';
import Modal from 'components/Modal';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import Button from 'components/Buttons/Button';
import { useHistory } from 'react-router';

interface IProps {
  visible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const VipModal = ({ visible, setIsVisible }: IProps) => {
  const history = useHistory();
  const Body = () => {
    return (
      <>
        <S.CloseButton onClick={() => setIsVisible(false)}>
          <CloseModal style={{ cursor: 'pointer' }} />
        </S.CloseButton>
        <S.Container>
          <S.Title>Redeem your free NFT now!</S.Title>
          <S.Button
            onClick={() =>
              history.push('/marketplace/617047d7ae96a50793a11561')
            }
          >
            Go to Marketplace
          </S.Button>
        </S.Container>
      </>
    );
  };
  return (
    <Modal
      open={visible}
      onClose={() => setIsVisible(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      centered={true}
    >
      <Body />
    </Modal>
  );
};

export default VipModal;
