import SkuTile from 'components/ProductPanel/SkuTile';
import styled from 'styled-components/macro';

const MyReleases = () => {
  return (
    <MyReleasesContainer>
      <TileContainer>
        <SkuTile status="upcoming" skuRarity="rare" />
      </TileContainer>
      <TileContainer>
        <SkuTile status="mult-listing" skuRarity="epic" />
      </TileContainer>
      <TileContainer>
        <SkuTile status="no-sale" skuRarity="legendary" />
      </TileContainer>
      <TileContainer>
        <SkuTile status="unique" skuRarity="uncommon" />
      </TileContainer>
    </MyReleasesContainer>

  )
}

const TileContainer = styled.div`
  padding: 0 10px;
`;

const MyReleasesContainer = styled.div`
  display: flex;
  overflow: auto;
`;

export default MyReleases;
