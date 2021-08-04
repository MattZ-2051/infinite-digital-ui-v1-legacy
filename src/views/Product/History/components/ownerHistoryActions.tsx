import * as S from '../styles';
import DropDown from '../DropDown/ActionDropDown';

export const OwnerHistoryActions = ({
  setVisible,
  visible,
  product,
  setIsRedeemModalOpen,
  setIsAuctionModalOpen,
  handlers,
  ref,
}) => {
  return (
    <S.ActionContainer>
      <S.ActionText>Actions</S.ActionText>
      <div
        ref={ref}
        onClick={() => setVisible(!visible)}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <S.ActionButton />
        {visible && (
          <DropDown
            redeemed={product?.redeemedStatus}
            setModalVisible={setIsRedeemModalOpen}
            openSaleModal={handlers.handleCreateSale}
            redeemable={product?.sku?.redeemable}
            setAuctionModalVisible={setIsAuctionModalOpen}
          />
        )}
      </div>
    </S.ActionContainer>
  );
};
