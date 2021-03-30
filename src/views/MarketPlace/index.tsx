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
          <FilterBox type="sort" />
        </ContainerHead>
        <div style={{ display: 'grid', gridTemplateColumns: '25% 75%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-start' }}>
            <button
              style={{ border: 'none', backgroundColor: '#fafafa', fontSize: '24px', fontWeight: 500, padding: '10px 0' }}>
              All
          </button>
            <button style={{ border: 'none', backgroundColor: '#fafafa', fontSize: '24px', fontWeight: 500, padding: '10px 0' }}>
              Released
            </button>
            <button style={{ border: 'none', backgroundColor: '#fafafa', fontSize: '24px', fontWeight: 500, padding: '10px 0' }}>
              Upcoming
            </button>
            <button style={{ border: 'none', backgroundColor: '#fafafa', fontSize: '24px', fontWeight: 500, padding: '10px 0' }}>
              No One Selling
          </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '24px', fontWeight: 500, color: '#9e9e9e' }}>Filter by</span>
              <FilterChip type="clear" label="Clear All" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0' }}>
              <div style={{ padding: '0 5px' }}>
                <FilterBox type="date" width="100px" />
              </div>
              <div style={{ padding: '0 5px' }}>
                <FilterBox type="date" width="100px" />
              </div>
            </div>
            <div>
              <FilterBox type="range" label="Price Range" />
              <FilterBox type="checkbox" label="Category" options={options} />
              <FilterBox type="dropdown" label="Brand" options={options} />
              <FilterBox type="dropdown" label="Series" options={options} />
            </div>
          </div>
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
  align-items: center;
`;

export default MarketPlace;
