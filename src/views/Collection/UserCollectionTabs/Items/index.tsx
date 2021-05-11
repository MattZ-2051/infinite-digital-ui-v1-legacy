import styled, { css } from 'styled-components/macro';
import ProductTile from '../../../MarketPlace/components/ProductTile';
import { ProductWithFunctions } from 'entities/product';

interface Props {
  userItems: ProductWithFunctions[] | undefined;
  collection?: boolean;
  themeStyle?: 'light' | 'dark';
}

const Items = ({
  userItems,
  collection,
  themeStyle = 'light',
}: Props): JSX.Element => {
  return (
    <Container collection={collection || false}>
      {userItems &&
        userItems.map((product: ProductWithFunctions, index) => {
          if (product.sku === null) return;
          return (
            <TileContainer key={product._id} index={index}>
              <ProductTile
                themeStyle="dark"
                product={product}
                productSerialNumber={product.serialNumber}
                key={product._id}
              />
            </TileContainer>
          );
        })}
    </Container>
  );
};

const TileContainer = styled.div<{ index: number }>`
  padding: 0 20px;
  padding-left: ${({ index }) => `${index === 0 ? '0px' : '10px'}`};
`;

const hasCollection = css`
  margin: auto;
  :hover {
    overflow: auto;
  }
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const noCollection = css`
  display: flex;
  overflow: auto;
  width: 100%;
`;

const Container = styled.div<{ collection?: boolean }>`
  ${({ collection }) => (collection ? hasCollection : noCollection)}
`;

export default Items;
