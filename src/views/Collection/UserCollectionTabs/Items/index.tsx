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
  isSearchResult: boolean;
}

const NoItems = (isUserCollection: boolean, isSearchResult: boolean) => {
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
        {isSearchResult && 'No NFTs found that match the search criteria'}
        {!isSearchResult &&
          isUserCollection &&
          'You have no NFTs on your collection yet...'}
        {!isSearchResult &&
          !isUserCollection &&
          "This user hasn't added any NFTs to their collection yet"}
      </S.Message>
      {isUserCollection && !isSearchResult && (
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
  isSearchResult,
}: Props): JSX.Element => {
  return (
    <S.Container collection={collection || false}>
      {isLoading ? (
        <PageLoaderHelper userItems={userItems} />
      ) : userItems?.length === 0 ? (
        NoItems(isUserCollection, isSearchResult)
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
