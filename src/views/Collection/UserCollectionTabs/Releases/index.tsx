import React from 'react';
import SkuTile from 'views/MarketPlace/components/SkuTile';
import { Sku } from 'entities/sku';
import * as S from './styles';
import { useHistory } from 'react-router';

interface Props {
  userReleases: Sku[] | undefined;
  collection?: boolean;
  themeStyle: 'light' | 'dark';
  isUserCollection: boolean;
  isSearchResult: boolean;
}
const NoItems1 = (
  isUserCollection: boolean,
  isSearchResult: boolean,
  themeStyle: 'light' | 'dark'
) => {
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
        {isSearchResult &&
          'No released NFTs found that match the search criteria'}
        {!isSearchResult &&
          isUserCollection &&
          'You have no releases in your collection yet...'}
        {!isSearchResult &&
          !isUserCollection &&
          'This user has not released any NFTs yet'}
      </S.Message>
      {isUserCollection && !isSearchResult && (
        <S.Button
          onClick={() => history.push('/marketplace')}
          theme={themeStyle}
        >
          Go to the Marketplace
        </S.Button>
      )}
    </S.Container>
  );
};

const Releases = ({
  userReleases,
  collection,
  themeStyle = 'light',
  isUserCollection,
  isSearchResult,
}: Props): JSX.Element => {
  return (
    <S.Container collection={collection || false}>
      {userReleases?.length === 0
        ? NoItems1(isUserCollection, false, themeStyle)
        : userReleases &&
          userReleases.map((sku: Sku, index) => {
            return (
              <S.TileContainer key={sku._id} index={index}>
                <SkuTile sku={sku} themeStyle={themeStyle} />
              </S.TileContainer>
            );
          })}
    </S.Container>
  );
};

export default Releases;
