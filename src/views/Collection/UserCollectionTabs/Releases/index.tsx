import React from 'react';
import styled from 'styled-components/macro';
import SkuTile from 'views/MarketPlace/components/SkuTile';
import { Sku } from 'entities/sku';

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
    <Container collection={collection || false}>
      {userReleases &&
        userReleases.map((sku: Sku, index) => {
          return (
            <TileContainer key={sku._id} index={index}>
              <SkuTile sku={sku} themeStyle={themeStyle} />
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

const Container = styled.div<{ collection?: boolean }>`
  ${({ collection }) =>
    collection
      ? `margin: auto;
  overflow: hidden;
  :hover {
    overflow: auto;
  }
  display: flex;
  flex-wrap: wrap;
  max-height: 80%;
  width: 100%;`
      : `display: flex;
  overflow: auto;
   width: 100%;`}
`;

export default Releases;
