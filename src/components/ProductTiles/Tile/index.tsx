import { StyledCard, Row, RedeemIcon } from '../index';
import redeemIcon from 'assets/img/icons/redeem-icon-2.png';
import Rarity from 'components/Rarity';
import { Sku } from 'entities/sku';
import TilePill from './components/TilePill';
import { Media } from '../../Media/Media';
import * as S from './styles';

interface Props {
  sku: Sku;
  topLeft: string;
  skuRarity: string;
  middle: string;
  bottomLeft: string;
  bottomRight: string;
  status:
    | 'unique'
    /*SKU Tile Types*/
    | 'upcoming-sku'
    | 'upcoming-sku-time'
    | 'active'
    | 'no-sale'
    /*Product Tile Types */
    | 'upcoming-product-time'
    | 'active-listing'
    | 'no-active-listing'
    | '';
  skuImg: string;
  redeemable: boolean;
  pillInfo: string;
  unique: boolean;
  handleRedirect: () => void;
  supplyType: string;
  themeStyle: 'light' | 'dark';
}

const Tile = ({
  sku,
  topLeft,
  skuRarity,
  middle,
  bottomLeft,
  bottomRight,
  status,
  skuImg,
  redeemable,
  pillInfo,
  unique,
  themeStyle,
  handleRedirect,
  supplyType,
}: Props): JSX.Element => {
  const cropText = (text: string, limit: number) => {
    return text.slice(0, limit) + (text.length > limit ? '...' : '');
  };

  const maxIssuerNameLength = 15;
  const maxSkuNameLength = 34;
  return (
    <S.CardContainer onClick={handleRedirect}>
      <StyledCard themeStyle={themeStyle}>
        {redeemable ? (
          <RedeemIcon src={redeemIcon} style={{ position: 'absolute' }} />
        ) : null}

        <Media
          src={skuImg}
          styles={{
            height: '240px',
            width: '302px',
            borderRadius: '20px 20px 0 0',
            objectFit: 'cover',
          }}
        />

        <S.StyledCardContent themeStyle={themeStyle}>
          <Row>
            <S.IssuerName>
              {cropText(topLeft, maxIssuerNameLength)}
            </S.IssuerName>
            <Rarity type={skuRarity} margin={'0'} />
          </Row>

          <S.SkuName>{cropText(middle, maxSkuNameLength)}</S.SkuName>
          <Row>
            <S.AccentCardText
              themeStyle={themeStyle}
              style={{ textAlign: 'start' }}
            >
              {bottomLeft}
            </S.AccentCardText>
            {status === 'upcoming-sku-time' && !unique && (
              <S.BottomCardText themeStyle={themeStyle}>
                {' '}
                {supplyType === 'variable' ? null : <></>}
              </S.BottomCardText>
            )}
            {unique && (
              <S.BottomCardText themeStyle={themeStyle}>
                1 of 1
              </S.BottomCardText>
            )}
            {status === 'active' && !unique && (
              <S.BottomCardText
                themeStyle={themeStyle}
                style={{ color: '#9e9e9e' }}
              >
                {supplyType === 'variable' && sku.circulatingSupply >= 1
                  ? `${sku.circulatingSupply} Released`
                  : supplyType === 'fixed'
                  ? `${sku.totalSupplyLeft} of ${sku.totalSupply} For Sale`
                  : null}
              </S.BottomCardText>
            )}
            {status === 'no-sale' && !unique && (
              <S.BottomCardText themeStyle={themeStyle}>
                {sku.supplyType === 'variable' && sku.circulatingSupply >= 1
                  ? `${sku.totalSupply} Released`
                  : `${sku.totalSupply} of ${sku.totalSupply} ${
                      sku.activeSkuListings?.length == 0 ? '' : 'for sale'
                    }`}
              </S.BottomCardText>
            )}
            {/* TODO DRY */}
            {status === 'active-listing' && !unique && (
              <S.SerialNum>
                Serial:
                <S.ComplementText
                  themeStyle={themeStyle}
                  style={{ paddingLeft: '5px' }}
                >
                  {bottomRight}
                </S.ComplementText>
              </S.SerialNum>
            )}
            {status === 'no-active-listing' && !unique && (
              <S.SerialNum>
                Serial:
                <S.ComplementText
                  themeStyle={themeStyle}
                  style={{ paddingLeft: '5px' }}
                >
                  {bottomRight}
                </S.ComplementText>
              </S.SerialNum>
            )}
            {status === 'upcoming-product-time' && !unique && (
              <S.SerialNum>
                Serial:
                <S.ComplementText
                  themeStyle={themeStyle}
                  style={{ paddingLeft: '5px' }}
                >
                  {bottomRight}
                </S.ComplementText>
              </S.SerialNum>
            )}
          </Row>
        </S.StyledCardContent>
      </StyledCard>
      <TilePill status={status} pillInfo={pillInfo} />
    </S.CardContainer>
  );
};

export default Tile;
