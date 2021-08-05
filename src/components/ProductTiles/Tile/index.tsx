import { StyledCard, Row, RedeemIcon } from '../index';
import redeemIcon from 'assets/img/icons/redeem-icon-2.png';
import Rarity from 'components/Rarity';
import { Sku } from 'entities/sku';
import TilePill from './components/TilePill';
import { Media } from '../../Media/Media';
import * as S from './styles';

export type TileStatus =
  | 'unique'
  /*SKU Tile Types*/
  | 'upcoming-sku'
  | 'upcoming-sku-time'
  | 'active'
  | 'no-sale'
  | 'giveaway'
  /*Product Tile Types */
  | 'upcoming-product-time'
  | 'active-listing'
  | 'no-active-listing'
  | '';

interface IProps {
  sku: Sku;
  topLeft: string;
  skuRarity: string;
  middle: string;
  bottomLeft: string;
  bottomRight: string;
  status: TileStatus;
  skuImg: string;
  redeemable: boolean;
  pillInfo: string;
  unique: boolean;
  handleRedirect: () => void;
  supplyType: string;
  themeStyle: 'light' | 'dark';
  singleProductListingExist: boolean;
  isActiveAuction: boolean;
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
  singleProductListingExist,
  isActiveAuction,
}: IProps): JSX.Element => {
  const cropText = (text: string, limit: number) => {
    return text && text.slice(0, limit) + (text.length > limit ? '...' : '');
  };
  const maxIssuerNameLength = 15;
  const maxSkuNameLength = 34;
  const isGiveAway =
    sku?.activeSkuListings?.[0]?.saleType === 'giveaway' &&
    sku?.activeSkuListings?.[0]?.status === 'active';
  const generateBottomCardText = () => {
    return sku.supplyType === 'variable' && sku.circulatingSupply >= 1
      ? `${sku.totalSupply} Released`
      : `${sku.totalSupply} of ${sku.totalSupply} ${
          sku.activeSkuListings?.length == 0 ? '' : 'for sale'
        }`;
  };

  return (
    <S.CardContainer onClick={handleRedirect}>
      <StyledCard themeStyle={themeStyle}>
        {redeemable ? (
          <RedeemIcon src={redeemIcon} style={{ position: 'absolute' }} />
        ) : null}
        <div style={{ height: '240px', width: '302px' }}>
          <Media
            src={skuImg}
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
                {isGiveAway
                  ? `${sku.totalSupplyLeft} of ${sku.totalSupply} available`
                  : supplyType === 'variable' && sku.circulatingSupply >= 1
                  ? `${sku.circulatingSupply} Released`
                  : supplyType === 'fixed'
                  ? `${sku.totalSupplyLeft} of ${sku.totalSupply} for Sale`
                  : null}
              </S.BottomCardText>
            )}
            {status === 'no-sale' && !unique && (
              <S.BottomCardText themeStyle={themeStyle}>
                {generateBottomCardText}
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
      <TilePill
        status={status}
        pillInfo={pillInfo}
        isCurrentActiveAuction={singleProductListingExist && isActiveAuction}
      />
    </S.CardContainer>
  );
};

export default Tile;
