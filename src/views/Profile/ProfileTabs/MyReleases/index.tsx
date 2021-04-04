import SkuTile from 'components/ProductPanel/SkuTile';
import styled from 'styled-components/macro';

const MyReleases = () => {
  return (
    <MyReleasesContainer>
      <TileContainer style={{ paddingRight: '10px', paddingLeft: '0' }}>
        <SkuTile status="upcoming" skuRarity="rare" />
      </TileContainer>
      <TileContainer>
        <SkuTile status="mult-listing" skuRarity="legendary" />
      </TileContainer>
      <TileContainer>
        <SkuTile status="no-sale" skuRarity="uncommon" />
      </TileContainer>
      <TileContainer style={{ paddingRight: '0', paddingLeft: '10px' }}>
        <SkuTile status="unique" skuRarity="epic" />
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
