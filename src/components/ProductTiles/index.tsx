import Card from '@material-ui/core/Card';
import styled from 'styled-components/macro';
import CardMedia from '@material-ui/core/CardMedia';

export interface IProps {
  imageSrc?: string;
  releaseDate?: string;
  title?: string;
  company?: string;
  series?: string;
  skuNum?: string;
  quantity?: number;
  price?: number;
  type?: string;
  header?: 'black' | 'white';
}

const ProductPanel = () => {
  return (
    <div></div>
  )
}

export const StyledCard = styled(Card)`
  max-width: 302px;
  min-width: 302px;
  min-height: 430px;
  overflow: initial;
  border-radius: 20px;
  box-shadow: 2px 2px 3px 1px #ccc;
`;

export const StyledCardDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledCardImg = styled(CardMedia)`
  height: 240px;
  width: 302px;
  border-radius: 20px 20px 0 0;
`;

export default ProductPanel;
