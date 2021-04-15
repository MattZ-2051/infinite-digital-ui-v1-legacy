import { StyledCard, Row, StyledCardImg, RedeemIcon } from '../index';
import styled from 'styled-components';
import productImg from 'assets/img/backgrounds/product-image.jpeg'
import CardContent from '@material-ui/core/CardContent';
import Rarity from 'components/Rarity';
import redeemableIcon from 'assets/img/icons/redeemable-icon.png'
import alreadyRedeemedIcon from 'assets/img/icons/redeemed-icon.png'

interface IProps {
  skuImg?: string;
  skuName?: string;
  skuSeries?: string;
  skuRarity?: 'uncommon' | 'common' | 'rare' | 'epic' | 'legendary';
  status?: 'no-active-listing' | 'active-listing' | 'purchased';
  productSerialNumber?: number;
  redeemable?: boolean;
}

const ProductTile = ({ skuRarity, skuImg, skuName, skuSeries, status, productSerialNumber, redeemable }: IProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: 'fit-content' }}>
      <StyledCard>
        {redeemable
          ? <RedeemIcon src={redeemableIcon} />
          : <RedeemIcon src={alreadyRedeemedIcon} />
        }
        <StyledCardImg
          image={skuImg || productImg}
        />

        <CardContent style={{ backgroundColor: 'white', padding: '5px 16px 0 16px', borderRadius: '20px' }}>
          <Row>
            <p style={{ fontWeight: 500, fontSize: '16px', lineHeight: '20.24px', color: '#9E9E9E' }}>
              {'Issuer Name'}
            </p>
            <Rarity type={skuRarity || 'rare'} />
          </Row>
          <p style={{ fontSize: '26px', fontWeight: 500, lineHeight: '32px', letterSpacing: '0em', margin: '0', paddingTop: '8px' }}>
            {skuName?.slice(0, 10) || 'Sku Name'}
          </p>
          <Row style={{ paddingTop: '8px' }}>
            <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em' }}># {skuSeries?.slice(0, 5) || '604ab'}</p>
            {status === 'no-active-listing' && (
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em', color: '#9e9e9e', }}>Serial: <span style={{ color: 'black', paddingLeft: '5px' }}>{'XY271'}</span></p>
            )}
            {status === 'active-listing' && (
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em', color: '#9e9e9e' }}>Serial: <span style={{ color: 'black', paddingLeft: '5px' }}>{'XY271'}</span></p>
            )}
            {status === 'purchased' && (
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em' }}>Owned by 88 people</p>
            )}
          </Row>
        </CardContent>
      </StyledCard>
      {status === 'no-active-listing' && (

        <div style={{ position: 'relative', backgroundColor: '#E5E5E5', width: '270px', height: '56px', color: 'white', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px', bottom: '25px' }}>
          <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '20.24px', color: '#9E9E9E', height: '20px' }}>Estimated value:</span>
          <span style={{ fontWeight: 500, fontSize: '24px', lineHeight: '32px', height: '32px', color: '#9E9E9E' }}>$1k</span>
        </div>
      )}
      {status === 'active-listing' && (
        <div style={{ position: 'relative', backgroundColor: 'black', width: '270px', height: '56px', color: 'white', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px', bottom: '25px' }}>
          <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '20.24px', color: '#c4c4c4', height: '20px' }}>Current Bid:</span>
          <span style={{ fontWeight: 500, fontSize: '24px', lineHeight: '32px', height: '32px' }}>$1.5m</span>
        </div>
      )}
      {status === 'purchased' && (
        <div style={{ position: 'relative', backgroundColor: '#E5E5E5', width: '270px', height: '56px', color: 'white', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px', bottom: '25px' }}>
          <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '20.24px', color: '#9E9E9E', height: '20px' }}>Purchased on:</span>
          <span style={{ fontWeight: 500, fontSize: '15px', lineHeight: '32px', height: '32px', color: '#9E9E9E' }}>08/01/21</span>
        </div>
      )}

    </div>


  )
}

export default ProductTile;
