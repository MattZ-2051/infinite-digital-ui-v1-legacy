import Card from '@material-ui/core/Card';
import styled from 'styled-components/macro';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import productImg from '../../assets/img/backgrounds/product-image.jpeg'

export interface IProps {
  backgroundColor?: string;
}

// https://images.unsplash.com/photo-1597248881519-db089d3744a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"

export default function ProductPanel({ backgroundColor }: IProps) {

  return (
    <>
      <StyledCard>
        <CardActionArea>
          <StyledCardImg
            image={productImg}
          />
          <CardContent style={{ backgroundColor: `${backgroundColor}` }}>
            <p style={{ fontWeight: 400, fontSize: "12px", lineHeight: '19.2px', color: "var(--grey-40)" }}>Coming Soon</p>
            <h4>
              Red Mouth
              </h4>
            <p style={{ fontWeight: 600, fontSize: '14px', lineHeight: '22.4px' }}>
              ADIDAS - Series 03
              </p>
            <p style={{ fontWeight: 400, fontSize: '14px', lineHeight: '22.4px', color: 'var(--grey-40)' }}>
              Sku: 3319E
              </p>
            <StyledCardDiv>
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '14px', lineHeight: '22.4px' }}>Only <h4 style={{ padding: '0 5px' }}>22</h4> left</p>
              <p style={{ display: 'flex', fontWeight: 400, fontSize: '14px', lineHeight: '22.4px' }}>Starting from <h4 style={{ paddingLeft: '5px' }}>$234</h4></p>
            </StyledCardDiv>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </>
  );
}

const StyledCard = styled(Card)`
  min-width: 302px;
  height: 435px;
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledCardDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCardImg = styled(CardMedia)`
  height: 200px;
`;
