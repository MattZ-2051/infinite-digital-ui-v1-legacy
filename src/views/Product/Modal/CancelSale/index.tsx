import Modal from 'components/Modal';
import * as S from './styles';
import Emoji from 'components/Emoji';
import { useAuth0 } from '@auth0/auth0-react';
import { cancelListing } from 'services/api/listingService';
import Toast from 'utils/Toast';
import { createSale } from 'utils/messages';
import { HistoryStatus } from '../../History/types';

interface Props {
  visible: boolean;
  setModalPaymentVisible: (a: boolean) => void;
  listingId?: string;
  setStatus: (status: HistoryStatus) => void;
  modalType: 'auction' | 'sale';
}

const CancelSale = ({
  visible,
  setModalPaymentVisible,
  listingId,
  setStatus,
  modalType,
}: Props) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleCancelListing = async () => {
    if (!listingId) {
      Toast.error(
        <>
          Whoops! Something went wrong, please try again or go to the{' '}
          <a href="/help">help page</a> to contact us.
        </>
      );
    } else {
      const userToken = await getAccessTokenSilently();
      if (!userToken) {
        Toast.error('user token error');
      }
      const res = await cancelListing(userToken, listingId);
      if (res.status === 200) {
        Toast.success('Listing successfully cancelled.');
        setModalPaymentVisible(false);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        Toast.error(createSale.error);
      }
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
            {modalType === 'sale' && (
              <>
                <Emoji symbol="❌" />
                <S.Header>Cancel Sale?</S.Header>
              </>
            )}
            {modalType === 'auction' && (
              <>
                <Emoji symbol="❌" />
                <S.Header>Cancel Auction?</S.Header>
              </>
            )}
          </S.HeaderContainer>
          {modalType === 'sale' && (
            <S.SubHeader>
              By confirming this action you will remove this item from the
              marketplace and will not be available for other users to buy.
            </S.SubHeader>
          )}

          {modalType === 'auction' && (
            <S.SubHeader>
              This action will cancel your for sale listing for this NFT.
            </S.SubHeader>
          )}
          <S.ButtonContainer>
            <S.Button onClick={handleCancelListing}>Yes</S.Button>
            <S.Button
              style={{ marginTop: '16px' }}
              onClick={() => setModalPaymentVisible(false)}
            >
              Go Back
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
