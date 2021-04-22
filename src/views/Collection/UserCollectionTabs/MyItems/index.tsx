import SkuTile from 'components/ProductTiles/SkuTile';
import styled from 'styled-components/macro';

const MyItems = () => {
  return (
    <MyItemsContainer>
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
    </MyItemsContainer>

  )
}

const TileContainer = styled.div`
  padding: 0 10px;
`;

const MyItemsContainer = styled.div`
  display: flex;
  overflow: auto;
`;

export default MyItems;
