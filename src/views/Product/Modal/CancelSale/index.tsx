import Modal from 'components/Modal';
import * as S from './styles';
import Emoji from 'components/Emoji';
import { useAuth0 } from '@auth0/auth0-react';
import { cancelListing } from 'services/api/listingService';
import Toast from 'utils/Toast';
import { HistoryStatus } from '../../History/index';

interface Props {
  visible: boolean;
  setModalPaymentVisible: (a: boolean) => void;
  listingId: string;
  setStatus: (status: HistoryStatus) => void;
}

const CancelSale = ({
  visible,
  setModalPaymentVisible,
  listingId,
  setStatus,
}: Props) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleCancelListing = async () => {
    const userToken = await getAccessTokenSilently();
    try {
      await cancelListing(userToken, listingId);
      Toast.success('Listing successfully cancelled, please refresh the page');
      setModalPaymentVisible(false);
    } catch (e) {
      Toast.error(e.message);
    }
  };
  const Body = (): JSX.Element => {
    return (
      <S.Container>
        <S.FlexEnd>
          <S.CloseIcon onClick={() => setModalPaymentVisible(false)} />
        </S.FlexEnd>
        <S.BodyContainer>
          <S.HeaderContainer>
            <Emoji symbol="❌" />
            <S.Header>Cancel Sale!</S.Header>
          </S.HeaderContainer>
          <S.SubHeader>
            By confirming this action you will remove this item from the
            marketplace and will not be available for other users to buy.
          </S.SubHeader>
          <S.ButtonContainer>
            <S.Button onClick={handleCancelListing}>Yes, Sure</S.Button>
            <S.Button
              style={{ marginTop: '16px' }}
              onClick={() => setModalPaymentVisible(false)}
            >
              No, Thanks
            </S.Button>
          </S.ButtonContainer>
        </S.BodyContainer>
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

export default CancelSale;
