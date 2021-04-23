import ProductTile from '../../../MarketPlace/components/ProductTile';
import styled from 'styled-components/macro';
import { useAppSelector } from 'hooks/store';

const MyReleases = () => {
  const mockItems = useAppSelector(
    (state) => state.session.userCollection.collectors
  );
  return (
    <MyReleasesContainer>
      {mockItems instanceof Array &&
        mockItems.map((item, index) => {
          let type: string = 'active-listing';
          let sku = item.sku;
          if (item.listing.status === 'active') {
            type = 'active-listing';
          } else {
            type = 'no-active-listing';
          }

          return (
            <TileContainer
              style={{ paddingLeft: `${index === 0 ? '0px' : '10px'}` }}
            >
              <ProductTile
                redeemable={true}
                status={type}
                name={sku.name}
                img={sku.graphicUrl}
                rarity={sku.rarity}
                series={sku.series.name}
                productSerialNumber={item.serialNumber}
                issuer={'adidas'}
                key={item.id}
                purchasedDate="1k"
              />
            </TileContainer>
          );
        })}
    </MyReleasesContainer>
  );
};

const TileContainer = styled.div`
  padding: 0 10px;
`;

const MyReleasesContainer = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
`;

export default MyReleases;
