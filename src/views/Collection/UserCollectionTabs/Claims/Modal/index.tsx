import React, { useState } from 'react';
import Modal from 'components/Modal';
import Rarity from 'components/Rarity';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Sku } from 'entities/sku';
import { useHistory } from 'react-router-dom';
import loadingGif from 'assets/gif/loading2.gif';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import * as SS from '../styles';

const maxIssuerUsernameLength = 22;

interface IProps {
  sku: Sku;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  loading: boolean;
  cropText: (username: string, maxLenght: number) => string;
  apiError: boolean;
}

const ClaimModal = ({
  sku,
  openModal,
  setOpenModal,
  loading,
  cropText,
  apiError,
}: IProps) => {
  const { redeemable, serialNumber, digitalProductId } = sku;

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleRedirect = () => history.push(`/product/${digitalProductId}`);
  const mainBody = (
    <>
      <SS.HeaderContainer>
        <SS.Header>🤘 Yeah! NFT successfully Claimed.</SS.Header>
      </SS.HeaderContainer>
      <SS.SubHeaderContainer>
        <SS.RowFlex padding="10px 0">
          {isSmall ? (
            <SS.IssuerName>
              {sku?.issuer?.username.length > maxIssuerUsernameLength
                ? cropText(sku?.issuer?.username, maxIssuerUsernameLength)
                : sku?.issuer?.username}
            </SS.IssuerName>
          ) : (
            <SS.IssuerName>{sku?.issuer?.username}</SS.IssuerName>
          )}

          <Rarity type={sku?.rarity} margin="0" />
        </SS.RowFlex>
        <SS.SkuName>{sku?.name}</SS.SkuName>
        <SS.RowFlex padding="10px 0">
          <SS.RowFlex padding="0">
            <SS.SeriesName>{sku?.series?.name}</SS.SeriesName>
            {redeemable && (
              <>
                <SS.Slash padding="0 5px">/</SS.Slash>
                <SS.RedeemIcon />
                <SS.RedeemableText>Redeemable</SS.RedeemableText>
              </>
            )}
          </SS.RowFlex>
          {!isSmall && (
            <SS.RowFlex padding="0">
              <SS.Serial>&nbsp;&nbsp;Serial:</SS.Serial>
              <SS.SerialNum>#{serialNumber}</SS.SerialNum>
            </SS.RowFlex>
          )}
        </SS.RowFlex>
      </SS.SubHeaderContainer>
      <SS.ContentSuccessfullyText>
        <SS.SuccessfullyText>
          You successfully claimed this NFT, and
        </SS.SuccessfullyText>
        <br />
        <SS.SuccessfullyText>
          and now is part of your collection.
        </SS.SuccessfullyText>
      </SS.ContentSuccessfullyText>
      <SS.Center>
        <SS.Button onClick={handleRedirect}>View Your Product</SS.Button>
      </SS.Center>
      <SS.Center style={{ marginTop: '10px' }}>
        <SS.LinkButton onClick={() => setOpenModal(false)}>
          Return to the Claim List
        </SS.LinkButton>
      </SS.Center>
    </>
  );

  const loadingBody = (
    <SS.ContentLoading>
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          marginBottom: '10px',
        }}
      >
        <img src={loadingGif} alt="loading" width="60px" />
      </div>
      <SS.ContentText>
        <SS.TextLoading>
          Processing your request. Do not close this window.
        </SS.TextLoading>
      </SS.ContentText>
    </SS.ContentLoading>
  );

  const errorBody = (
    <>
      <SS.HeaderContainer style={{ borderBottom: 'none' }}>
        <SS.Header>😬 Oops, something went wrong!</SS.Header>
      </SS.HeaderContainer>
      <SS.ContentText style={{ width: '80%' }}>
        <SS.TextLoading>
          There was an error processing your request, please try again or
          contact support if the issue persists.
        </SS.TextLoading>
      </SS.ContentText>
      <SS.Center style={{ marginTop: '10px' }}>
        <SS.Button onClick={() => setOpenModal(false)}>Try Again</SS.Button>
      </SS.Center>
      <SS.Center style={{ marginTop: '10px' }}>
        <SS.LinkButton onClick={() => history.push('/help')}>
          Help/ Contact Support
        </SS.LinkButton>
      </SS.Center>
    </>
  );

  return (
    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
      }}
    >
      <SS.CloseButton onClick={() => setOpenModal(false)}>
        <CloseModal style={{ cursor: 'pointer' }} />
      </SS.CloseButton>
      {loading ? loadingBody : apiError ? errorBody : errorBody}
    </Modal>
  );
};

export default ClaimModal;
