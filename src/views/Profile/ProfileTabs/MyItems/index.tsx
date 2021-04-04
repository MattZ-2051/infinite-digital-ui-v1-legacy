import SkuTile from 'components/ProductPanel/SkuTile';
import styled from 'styled-components/macro';

const MyItems = () => {
  return (
    <MyItemsContainer>
      <TileContainer>
        <SkuTile status="upcoming" skuRarity="rare" />
      </TileContainer>
      <TileContainer>
        <SkuTile status="mult-listing" skuRarity="legendary" />
      </TileContainer>
      <TileContainer>
        <SkuTile status="no-sale" skuRarity="uncommon" />
      </TileContainer>
      <TileContainer>
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
