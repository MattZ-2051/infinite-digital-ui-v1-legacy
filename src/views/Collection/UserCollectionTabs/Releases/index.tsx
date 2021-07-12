import React from 'react';
import SkuTile from 'views/MarketPlace/components/SkuTile';
import { Sku } from 'entities/sku';
import * as S from './styles';

interface Props {
  userReleases: Sku[] | undefined;
  collection?: boolean;
  themeStyle: 'light' | 'dark';
}

const Releases = ({
  userReleases,
  collection,
  themeStyle = 'light',
}: Props): JSX.Element => {
  return (
    <S.Container collection={collection || false}>
      {userReleases &&
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
