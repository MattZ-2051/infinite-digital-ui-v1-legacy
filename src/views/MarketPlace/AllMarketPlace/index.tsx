import styled from 'styled-components';
import ProductPanel from '../../../components/ProductPanel';

const AllMarketPlace = () => {


  return (
    <div>
      <ProductContainer>
      </ProductContainer>
    </div>
  )
}

const ProductContainer = styled.div`
&& {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    padding-top: 24px;
}
`;

export default AllMarketPlace;
