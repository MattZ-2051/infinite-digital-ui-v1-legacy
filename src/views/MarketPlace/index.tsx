import React from 'react';
import styled from 'styled-components';
import SkuTile from 'components/ProductPanel/SkuTile';
import { useAppSelector } from 'hooks/store';
import FilterBox from 'components/FilterBox';
import FilterChip from 'components/FilterChip';

interface IProps { }

// test options for dropdown filter

const options = ['Series 001', 'Series 002', 'Series 003', 'Series 004', 'Series 005', 'Series 006']

const MarketPlace: React.FC<IProps> = () => {

  const { listings } = useAppSelector((state) => state.listings);

  return (
    <>
      <Container >
        <ContainerHead>
          <h2>MarketPlace</h2>
          <FilterBox type="dropdown" label="testing" options={options} />
        </ContainerHead>
        <FilterChip label="test" type="clear" />
        <FilterChip label="Testing Filter Chip" />
        <div style={{ display: 'flex', width: '100' }}>

          {/* <SkuTile status="upcoming" skuRarity="rare" />
        <SkuTile status="unique" skuRarity="uncommon" />
        <SkuTile status="mult-listing" skuRarity="legendary" />
        <SkuTile status="dropbox" skuRarity="epic" /> */}
          {listings instanceof Array && listings.map((listing) => {

            const sku = listing.product.sku
            return (

              <div style={{ padding: '0 10px' }}>
                <SkuTile
                  status={sku.status}
                  skuRarity="rare"
                  skuImg={sku.graphicUrl}
                  skuName={sku.name}
                  skuSeries={sku.series}
                  skuSupply={sku.circulatingSupply

                  }
                />
              </div>
            )
          })}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 46px 80px 0 80px;
  height: 100vh;
`;

const ContainerHead = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export default MarketPlace;
