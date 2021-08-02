import ProductTile from '../../../MarketPlace/components/ProductTile';
import { ProductWithFunctions } from 'entities/product';
import { PageLoaderHelper } from './pageLoaderHelper';
import * as S from './styles';
import { useHistory } from 'react-router';

interface Props {
  userItems: ProductWithFunctions[] | undefined;
  collection?: boolean;
  themeStyle?: 'light' | 'dark';
  isLoading: boolean;
  isUserCollection: boolean;
}

const NoItems = (isUserCollection: boolean) => {
  const history = useHistory();
  return (
    <S.Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '40vh',
      }}
    >
      <S.Message>
        {isUserCollection && 'You have no NFTs on your collection yet...'}
        {!isUserCollection &&
          "This user hasn't added any NFTs to their collection yet"}
      </S.Message>
      {isUserCollection && (
        <S.Button onClick={() => history.push('/marketplace')}>
          Go to the Marketplace
        </S.Button>
      )}
    </S.Container>
  );
};

const Items = ({
  userItems,
  collection,
  themeStyle = 'light',
  isLoading,
  isUserCollection,
}: Props): JSX.Element => {
  return (
    <S.Container collection={collection || false}>
      {isLoading ? (
        <PageLoaderHelper userItems={userItems} />
      ) : userItems?.length === 0 ? (
        NoItems(isUserCollection)
      ) : (
        userItems &&
        userItems.map((product: ProductWithFunctions, index) => {
          if (product.sku === null) return;
          return (
            <S.TileContainer key={product._id} index={index}>
              <ProductTile
                themeStyle={themeStyle}
                product={product}
                productSerialNumber={product.serialNumber}
                key={product._id}
              />
            </S.TileContainer>
          );
        })
      )}
    </S.Container>
  );
};

export default Items;
