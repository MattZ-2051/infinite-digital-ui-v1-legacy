import React, { useState } from 'react';
import Tile from 'components/ProductTiles/Tile';
import { Sku } from 'entities/sku';
import { StyledCard, Row, RedeemIcon } from 'components/ProductTiles/index';
import Rarity from 'components/Rarity';
import TileClaimPill from './TilePill/index';
import { Media } from 'components/Media/Media';
import ModalClaim from './Modal';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import { postCreatePhysicalClaim } from 'services/api/productService';
import redeemIcon from 'assets/img/icons/redeem-icon-2.png';
import * as S from 'components/ProductTiles/Tile/styles';

interface SkuClaimProps {
  sku: Sku;
  themeStyle: 'light' | 'dark';
  onChangeClaim: (
    claimId: any,
    { newDigitalProductId, newSerialNumber }: any
  ) => void;
}

const SkuClaimTile = ({
  sku,
  themeStyle = 'light',
  onChangeClaim,
}: SkuClaimProps): JSX.Element => {
  const {
    _id,
    name,
    rarity,
    series,
    issuerName,
    redeemable,
    nftPublicAssets,
    digitalProductId,
    serialNumber,
    physicalProduct,
  } = sku;
  const cropText = (text: string, limit: number) => {
    return text && text.slice(0, limit) + (text.length > limit ? '...' : '');
  };
  const maxIssuerNameLength = 15;
  const maxSkuNameLength = 34;
  const maxSeriesNameLength = 10;
  const skuImage = nftPublicAssets
    ? nftPublicAssets?.[0]?.previewUrl || nftPublicAssets?.[0]?.url
    : sku.graphicUrl;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const claimed = digitalProductId !== null;

  const createClaim = async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const resp = await postCreatePhysicalClaim(
        _id,
        physicalProduct._id,
        token
      );
      setLoading(false);
      onChangeClaim(resp.data.sku, {
        newDigitalProductId: resp.data._id,
        newSerialNumber: resp.data.serialNumber,
      });
    } catch (error) {
      setLoading(false);
      setApiError(true);
    }
  };

  const handlePillClick = () => {
    if (!claimed) {
      createClaim();
      setOpenModal(true);
    } else {
      window.open(`/product/${digitalProductId}`);
    }
  };

  return (
    <>
      <S.CardContainer>
        <StyledCard themeStyle={themeStyle}>
          {redeemable ? (
            <RedeemIcon src={redeemIcon} style={{ position: 'absolute' }} />
          ) : null}
          <div style={{ height: '240px', width: '302px' }}>
            <Media
              src={skuImage}
              styles={{
                height: '240px',
                width: '302px',
                borderRadius: '20px 20px 0 0',
                objectFit: 'cover',
              }}
            />
          </div>

          <S.StyledCardContent themeStyle={themeStyle}>
            <Row style={{ height: '21px' }}>
              <S.IssuerName>
                {cropText(issuerName, maxIssuerNameLength)}
              </S.IssuerName>
              <Rarity type={rarity} margin={'0'} />
            </Row>
            <S.SkuName>{cropText(name, maxSkuNameLength)}</S.SkuName>
            <Row>
              <S.AccentCardText
                themeStyle={themeStyle}
                style={{ textAlign: 'start' }}
              >
                {digitalProductId
                  ? cropText(series?.name, maxSeriesNameLength)
                  : series?.name}
              </S.AccentCardText>
              {digitalProductId && (
                <S.SerialNum>
                  Serial:
                  <S.ComplementText
                    themeStyle={themeStyle}
                    style={{ paddingLeft: '5px' }}
                  >
                    {serialNumber}
                  </S.ComplementText>
                </S.SerialNum>
              )}
            </Row>
          </S.StyledCardContent>
        </StyledCard>
        <TileClaimPill
          claimed={digitalProductId !== null}
          handleClick={handlePillClick}
        />
      </S.CardContainer>

      <ModalClaim
        sku={sku}
        openModal={openModal}
        setOpenModal={setOpenModal}
        loading={loading}
        cropText={cropText}
        apiError={apiError}
      />
    </>
  );
};

export default SkuClaimTile;
