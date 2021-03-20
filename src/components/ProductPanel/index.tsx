import Card from '@material-ui/core/Card';
import styled from 'styled-components/macro';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import productImg from '../../assets/img/backgrounds/product-image.jpeg'
import Rarity from 'components/Rarity';

export interface IProps {
  backgroundColor?: string;
  imageSrc?: string;
  releaseDate?: string;
  title?: string;
  company?: string;
  series?: string;
  skuNum?: string;
  quantity?: number;
  price?: number;
  type?: string;
}

export default function ProductPanel(
  { backgroundColor, imageSrc, releaseDate, title, series, skuNum, quantity, price, type }
    : IProps) {

  return (

    <>
      {(type === 'common-black') && (


        <StyledCard>
          <div style={{ paddingLeft: '16px', display: 'flex', justifyContent: 'space-between', backgroundColor: 'black', alignItems: 'center' }}>
            <p style={{ fontWeight: 400, fontSize: "12px", lineHeight: '19.2px', color: "var(--grey-40)" }}>{releaseDate ? releaseDate : 'Coming Soon'}</p>
            <Rarity type='common' />
          </div>
          <CardActionArea>
            <StyledCardImg
              image={imageSrc ? imageSrc : productImg}
            />
            <CardContent style={{ backgroundColor: `${backgroundColor}`, color: backgroundColor === 'black' ? 'white' : 'black' }}>
              <h4>
                {title ? title.slice(0, 10) : 'Red Mouth'}
              </h4>
              <p style={{ fontWeight: 600, fontSize: '14px', lineHeight: '22.4px' }}>
                ADIDAS - {series ? series : 'Series - 03'}
              </p>
              <p style={{ fontWeight: 400, fontSize: '14px', lineHeight: '22.4px', color: 'var(--grey-40)' }}>
                Sku: {skuNum ? skuNum : 'sku'}
              </p>
              <StyledCardDiv style={{ paddingTop: '8px' }}>
                <p style={{ display: 'flex', fontWeight: 400, fontSize: '14px', lineHeight: '22.4px' }}>Only <h4 style={{ padding: '0 5px' }}>{quantity ? quantity : '20'}</h4> left</p>
                <p style={{ display: 'flex', fontWeight: 400, fontSize: '14px', lineHeight: '22.4px' }}>Starting from <h4 style={{ paddingLeft: '5px' }}>{price ? `$${price}` : '$200'}</h4></p>
              </StyledCardDiv>
            </CardContent>
          </CardActionArea>
        </StyledCard>
      )}

      {type === 'dropBox' && (

        <StyledCard>
          <CardActionArea>
            <StyledCardImg
              image={imageSrc ? imageSrc : productImg}
            />
            <CardContent style={{ backgroundColor: `${backgroundColor}`, color: backgroundColor === 'black' ? 'white' : 'black' }}>
              <p style={{ fontWeight: 400, fontSize: "12px", lineHeight: '19.2px', color: "var(--grey-40)" }}>{releaseDate ? releaseDate : 'Coming Soon'}</p>
              <h4>
                {title ? title.slice(0, 10) : 'Red Mouth'}
              </h4>
              <p style={{ fontWeight: 600, fontSize: '14px', lineHeight: '22.4px' }}>
                ADIDAS - {series ? series : 'Series - 03'}
              </p>
              <p style={{ fontWeight: 400, fontSize: '14px', lineHeight: '22.4px', color: 'var(--grey-40)' }}>
                Sku: {skuNum ? skuNum : 'sku'}
              </p>
              <StyledCardDiv style={{ paddingTop: '8px' }}>
                <p style={{ display: 'flex', fontWeight: 400, fontSize: '14px', lineHeight: '22.4px' }}>Only <h4 style={{ padding: '0 5px' }}>{quantity ? quantity : '20'}</h4> left</p>
                <p style={{ display: 'flex', fontWeight: 400, fontSize: '14px', lineHeight: '22.4px' }}>Starting from <h4 style={{ paddingLeft: '5px' }}>{price ? `$${price}` : '$200'}</h4></p>
              </StyledCardDiv>
            </CardContent>
          </CardActionArea>
        </StyledCard>

      )}
    </>

  );
}

const StyledCard = styled(Card)`
  min-width: 302px;
  height: 470px;
`;

const StyledCardDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCardImg = styled(CardMedia)`
  height: 240px;
  width: 302px;
`;
