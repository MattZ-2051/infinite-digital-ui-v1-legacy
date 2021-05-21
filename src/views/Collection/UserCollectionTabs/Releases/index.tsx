import React from 'react';
import styled, { css } from 'styled-components/macro';
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
  padding: 0 10px;
`;

const hasCollection = css`
  margin: auto;
  :hover {
    overflow: auto;
  }
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const noCollection = css`
  display: flex;
  overflow: auto;
  width: 100%;
`;

const Container = styled.div<{ collection?: boolean }>`
  ${({ collection }) => (collection ? hasCollection : noCollection)}
`;

export default Releases;
