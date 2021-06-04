import * as S from './styles';
import Toast from 'utils/Toast';

interface IProps {
  redeemed: 'NA' | 'pending' | 'redeemed' | undefined;
  setModalVisible: (a: boolean) => void;
  openSaleModal: any;
  redeemable: boolean | undefined;
}

const DropDown = ({
  redeemed,
  setModalVisible,
  openSaleModal,
  redeemable,
}: IProps) => {
  const handleToastError = () => {
    Toast.error('This product has already been redeemed.');
  };
  return (
    <div style={{ position: 'relative' }}>
      <S.Container>
        <S.ButtonContainer>
          {/* Implementing Transfer later
          <S.Button>
            <S.Label>Transfer</S.Label>
            <S.IconContainer>
              <S.TransferIcon className="icon_transfer" />
            </S.IconContainer>
          </S.Button> */}

          {redeemable &&
            (redeemed === 'redeemed' ? (
              <>
                <S.Button hover={false} onClick={handleToastError}>
                  <S.Label style={{ color: '#3a3a3a' }}>Redeemed</S.Label>
                  <S.IconContainer>
                    <S.IsRedeemedIcon className="icon_isRedeemed" />
                  </S.IconContainer>
                </S.Button>
              </>
            ) : (
              <>
                <S.Button hover={true} onClick={() => setModalVisible(true)}>
                  <S.Label>Redeem</S.Label>
                  <S.IconContainer>
                    <S.RedeemIcon className="icon_redeem" />
                  </S.IconContainer>
                </S.Button>
              </>
            ))}

          <S.Button hover={true}>
            <S.Label>Start Auction</S.Label>
            <S.IconContainer>
              <S.AuctionIcon className="icon_auction" />
            </S.IconContainer>
          </S.Button>
          <S.Button hover={true} onClick={openSaleModal}>
            <S.Label>Sell Your NFT</S.Label>
            <S.IconContainer>
              <S.SellIcon className="icon_sell" />
            </S.IconContainer>
          </S.Button>
        </S.ButtonContainer>
      </S.Container>
    </div>
  );
};

export default DropDown;
