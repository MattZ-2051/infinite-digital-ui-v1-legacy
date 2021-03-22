import Card from '@material-ui/core/Card';
import styled from 'styled-components/macro';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import productImg from 'assets/img/backgrounds/product-image.jpeg'
import Rarity from 'components/Rarity';
import TimerIcon from '@material-ui/icons/Timer';

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

const DropBoxPanel = (
  { backgroundColor, imageSrc, releaseDate, title, series, skuNum, quantity, price, type }
    : IProps) => {
  return (
    <StyledCard>
      <CardActionArea>
        <StyledCardImg
          image={imageSrc ? imageSrc : productImg}
        />
        <CardContent style={{ backgroundColor: `${backgroundColor}`, color: backgroundColor === 'black' ? 'white' : 'black', }}>
          <p style={{ fontWeight: 400, fontSize: "12px", color: "var(--grey-40)", margin: '0' }}>{releaseDate ? releaseDate?.split('T')[0] : 'Coming Soon'}</p>
          <p style={{ fontSize: '24px', fontWeight: 600 }}>
            {title ? title.slice(0, 10) : 'Red Mouth'}
          </p>
          <p style={{ fontWeight: 600, fontSize: '14px' }}>
            ADIDAS - {series ? series : 'Series - 03'}
          </p>
          <p style={{ fontWeight: 400, fontSize: '14px', color: 'var(--grey-40)' }}>
            Sku: {skuNum ? skuNum : 'sku'}
          </p>
          <StyledCardDiv>
            <p style={{ display: 'flex', fontWeight: 400, fontSize: '14px', alignItems: 'center' }}>Only <span style={{ padding: '0 5px', fontSize: '24px' }}>{quantity ? quantity : '20'}</span> left</p>
            <p style={{ display: 'flex', fontWeight: 400, fontSize: '14px', alignItems: 'center' }}>Starting from <span style={{ paddingLeft: '5px', fontSize: '24px' }}>{price ? `$${price}` : '$200'}</span></p>
          </StyledCardDiv>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  )
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

export default DropBoxPanel;
