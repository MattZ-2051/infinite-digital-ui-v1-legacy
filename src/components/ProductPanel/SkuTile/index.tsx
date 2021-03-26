import { StyledCard, StyledCardDiv, StyledCardImg } from '../index';
import productImg from 'assets/img/backgrounds/product-image.jpeg'
import CardContent from '@material-ui/core/CardContent';
import Rarity from 'components/Rarity';

interface IProps {
  skuImg?: string;
  skuName?: string;
  skuSeries?: string;
  skuRarity?: 'uncommon' | 'common' | 'rare' | 'epic' | 'legendary';
  status?: 'upcoming' | 'unique' | 'mult-listing' | 'dropbox' | 'no-sale';
  skuSupply?: number;
}

const SkuTile = ({ skuRarity, skuImg, skuName, skuSeries, status, skuSupply }: IProps) => {
  return (
    <>
      <StyledCard>
        <StyledCardImg
          image={skuImg}
        />
        <CardContent style={{ backgroundColor: 'white', padding: '16px 16px 0 16px', borderRadius: '20px' }}>
          <StyledCardDiv>
            <p style={{ fontWeight: 500, fontSize: '16px', lineHeight: '20.24px', color: '#9E9E9E' }}>
              {'Issuer Name'}
            </p>
            <Rarity type={skuRarity} />
          </StyledCardDiv>
          <p style={{ fontSize: '26px', fontWeight: 500, lineHeight: '32px', letterSpacing: '0em', margin: '0', paddingTop: '8px' }}>
            {skuName}
          </p>
          <StyledCardDiv style={{ paddingTop: '8px' }}>
            <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em' }}>{skuSeries?.slice(0, 5)}</p>
            {status === 'upcoming' && (
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em' }}>{skuSupply} Dropping</p>
            )}
            {status === 'unique' && (
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em', color: '#ff0000' }}>Unique Item!</p>
            )}
            {status === 'mult-listing' && (
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em', }}>22 For Sale</p>
            )}
            {status === 'dropbox' && (
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em', }}>Contains 3 Items</p>
            )}
            {status === 'no-sale' && (
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '16px', lineHeight: '20px', letterSpacing: '0em', }}>Owned by 88 people</p>
            )}

          </StyledCardDiv>
        </CardContent>
        {status === 'upcoming' && (

          <div style={{ backgroundColor: 'black', width: '270px', height: '56px', color: 'white', margin: 'auto', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px' }}>
            <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '20.24px', color: '#c4c4c4', height: '20px' }}>Upcoming in:</span>
            <span style={{ fontWeight: 500, fontSize: '24px', lineHeight: '32px', height: '32px' }}>05h 20m</span>
          </div>
        )}

        {status === 'unique' && (
          <div style={{ backgroundColor: 'black', width: '270px', height: '56px', color: 'white', margin: 'auto', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px' }}>
            <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '20.24px', color: '#c4c4c4', height: '20px' }}>Current Bid:</span>
            <span style={{ fontWeight: 500, fontSize: '24px', lineHeight: '32px', height: '32px' }}>$1.5m</span>
          </div>
        )}
        {status === 'mult-listing' && (
          <div style={{ backgroundColor: 'black', width: '270px', height: '56px', color: 'white', margin: 'auto', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px' }}>
            <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '20.24px', color: '#c4c4c4', height: '20px' }}>Lowest Price:</span>
            <span style={{ fontWeight: 500, fontSize: '24px', lineHeight: '32px', height: '32px' }}>$240</span>
          </div>
        )}
        {status === 'dropbox' && (
          <div style={{ backgroundColor: 'black', width: '270px', height: '56px', color: 'white', margin: 'auto', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px' }}>
            <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '20.24px', color: '#c4c4c4', height: '20px' }}>Drop Price:</span>
            <span style={{ fontWeight: 500, fontSize: '24px', lineHeight: '32px', height: '32px' }}>$400</span>
          </div>
        )}
        {status === 'no-sale' && (
          <div style={{ backgroundColor: '#E5E5E5', width: '270px', height: '56px', color: 'white', margin: 'auto', borderRadius: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 25px' }}>
            <span style={{ fontWeight: 500, fontSize: '24px', lineHeight: '32px', color: '#9E9E9E', margin: 'auto' }}>No one selling</span>
          </div>
        )}

      </StyledCard>

    </>


  )
}


export default SkuTile;
