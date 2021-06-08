// Global
import { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

// Local
import * as S from './styles';
import Modal from 'components/Modal';
import Form from './Form';

// Types
import { Sku } from 'entities/sku';

// Components
import Rarity from 'components/Rarity';
import { ReactComponent as Redeemable } from 'assets/svg/icons/redeemable2.svg';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';

interface Props {
  visible: boolean;
  setModalPaymentVisible: (a: boolean) => void;
  sku?: Sku;
  serialNum: string;
  redeemable: 'NA' | 'pending' | 'redeemed';
}

const RedeemModal = ({
  visible,
  setModalPaymentVisible,
  sku,
  serialNum,
  redeemable,
}: Props) => {
  const Body = (): JSX.Element => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <S.Container>
        <S.CloseButton onClick={() => setModalPaymentVisible(false)}>
          <CloseModal />
        </S.CloseButton>
        <S.HeaderContainer>
          <S.Header>Redeem this item!</S.Header>
        </S.HeaderContainer>
        <S.SubHeaderContainer>
          <S.RowFlex padding="10px 0">
            {isSmall ? (
              <S.IssuerName>
                {sku?.issuer && sku?.issuer?.username.length > 22
                  ? `${sku?.issuer.username.slice(0, 22)}...`
                  : sku?.issuer?.username}
              </S.IssuerName>
            ) : (
              <S.IssuerName>{sku?.issuer?.username}</S.IssuerName>
            )}

            <Rarity type={sku?.rarity} margin="0" />
          </S.RowFlex>
          <S.SkuName>{sku?.name}</S.SkuName>
          <S.RowFlex padding="10px 0">
            <S.RowFlex padding="0">
              <S.SeriesName>{sku?.series?.name}</S.SeriesName>
              {redeemable === 'NA' && (
                <>
                  <S.Slash>/</S.Slash>
                  <Redeemable />
                  Redeemable
                </>
              )}
            </S.RowFlex>
            {!isSmall && (
              <S.RowFlex padding="0">
                <S.Serial>Serial:</S.Serial>
                <S.SerialNum>#{serialNum}</S.SerialNum>
              </S.RowFlex>
            )}
          </S.RowFlex>
        </S.SubHeaderContainer>
        {isSmall && (
          <div style={{ display: 'flex' }}>
            <S.Serial>Serial:</S.Serial>
            <S.SerialNum>#{serialNum}</S.SerialNum>
          </div>
        )}
        <Form setIsModalOpen={setModalPaymentVisible} />
      </S.Container>
    );
  };
  return (
    <Modal
      open={visible}
      onClose={() => setModalPaymentVisible(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      width="100%"
    >
      <Body />
    </Modal>
  );
};

export default RedeemModal;
