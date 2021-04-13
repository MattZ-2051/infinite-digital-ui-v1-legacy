import { StyledCard, Row, StyledCardImg, RedeemIcon } from '../index';
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
  status?: 'upcoming' | 'unique' | 'active' | 'no-sale';
  skuTotalSupplyLeft: number;
  skuStartDate: string;
  skuMinPrice: number;
  skuCirculatingSupply?: number;
  skuTotalSupplyUpcoming?: number;
  redeemable?: boolean
}

const SkuTile = ({ skuRarity, skuImg, skuName, skuSeries, status, skuTotalSupplyLeft, skuStartDate, skuMinPrice, skuCirculatingSupply, skuTotalSupplyUpcoming, redeemable }: IProps) => {

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
            {skuName || 'Sku Name'}
          </p>
          <Row style={{ paddingTop: '8px' }}>
            <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em' }}># {skuSeries}</p>
            {status === 'upcoming' && (
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em' }}>{skuTotalSupplyUpcoming || '0'} Dropping</p>
            )}
            {status === 'unique' && (
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em', color: '#ff0000' }}>Unique Item!</p>
            )}
            {status === 'active' && (
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em', }}>{skuTotalSupplyLeft} For Sale</p>
            )}
            {status === 'no-sale' && (
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em', }}>Owned by {skuCirculatingSupply} people</p>
            )}

          </Row>
        </CardContent>
      </StyledCard>
      {status === 'upcoming' && (

        <div style={{ position: 'relative', backgroundColor: 'black', width: '270px', height: '56px', color: 'white', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px', bottom: '25px' }}>
          <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '20.24px', color: '#c4c4c4', height: '20px' }}>Upcoming in:</span>
          <span style={{ fontWeight: 500, fontSize: '20px', lineHeight: '32px', height: '32px', color: 'white' }}>{skuStartDate}</span>
        </div>
      )}
      {status === 'unique' && (
        <div style={{ position: 'relative', backgroundColor: 'black', width: '270px', height: '56px', color: 'white', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px', bottom: '25px' }}>
          <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '20.24px', color: '#c4c4c4', height: '20px' }}>Current Bid:</span>
          <span style={{ fontWeight: 500, fontSize: '24px', lineHeight: '32px', height: '32px' }}>$1.5m</span>
        </div>
      )}
      {status === 'active' && (
        <div style={{ position: 'relative', backgroundColor: 'black', width: '270px', height: '56px', color: 'white', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px', bottom: '25px' }}>
          <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '20.24px', color: '#c4c4c4', height: '20px' }}>Lowest Price:</span>
          <span style={{ fontWeight: 500, fontSize: '24px', lineHeight: '32px', height: '32px' }}>${skuMinPrice}</span>
        </div>
      )}
      {status === 'no-sale' && (
        <div style={{ position: 'relative', backgroundColor: '#e5e5e5', width: '270px', height: '56px', color: 'white', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px', bottom: '25px' }}>
          <span style={{ fontWeight: 500, fontSize: '24px', lineHeight: '32px', backgroundColor: '#e5e5e5', margin: 'auto', color: '#9E9E9E' }}>No one selling</span>
        </div>
      )}

    </div>


  )
}


export default SkuTile;
