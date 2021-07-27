import styled, { css } from 'styled-components/macro';
import ProductTile from '../../../MarketPlace/components/ProductTile';
import { ProductWithFunctions } from 'entities/product';
import PageLoader from 'components/PageLoader';
import { PageLoaderHelper } from './pageLoaderHelper';

interface Props {
  userItems: ProductWithFunctions[] | undefined;
  collection?: boolean;
  themeStyle?: 'light' | 'dark';
  isLoading: boolean;
}

const NoItems = () => {
  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40vh',
      }}
    >
      <h3
        style={{ fontWeight: 500, paddingBottom: '120px', textAlign: 'center' }}
      >
        Visit the marketplace to start your INFINITE NFT collection today!
      </h3>
    </Container>
  );
};

const Items = ({
  userItems,
  collection,
  themeStyle = 'light',
  isLoading,
}: Props): JSX.Element => {
  return (
    <Container collection={collection || false}>
      {isLoading ? (
        <PageLoaderHelper userItems={userItems} />
      ) : userItems?.length === 0 ? (
        NoItems()
      ) : (
        userItems &&
        userItems.map((product: ProductWithFunctions, index) => {
          if (product.sku === null) return;
          return (
            <TileContainer key={product._id} index={index}>
              <ProductTile
                themeStyle={themeStyle}
                product={product}
                productSerialNumber={product.serialNumber}
                key={product._id}
              />
            </TileContainer>
          );
        })
      )}
    </Container>
  );
};

const TileContainer = styled.div<{ index: number }>`
  padding: 0 12px;
`;

const hasCollection = css`
  margin: auto;
  :hover {
    overflow: auto;
  }
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media screen and (max-width: 840px) {
    justify-content: center;
  }
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
