import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components/macro';
import AuctionItem from './AuctionItem';
import { Link } from 'react-router-dom';
import { Collector } from 'entities/collector';

export interface Props {
  collectors: Collector[];
  hasProducts: boolean;
}

const AuctionListing: React.FC<Props> = ({ collectors, hasProducts }) => {
  const limitCollectors = collectors.slice(0, 4); //TODO: limit this in the backend?

  useEffect(() => {
    // mockServer();
  }, []);

  if (hasProducts) {
    return (
      <Container>
        <SectionTitle>Buy from Collectors</SectionTitle>

        {limitCollectors &&
          limitCollectors.map((el, index) => (
            <Link
              key={index}
              to={'/marketplace/' + el.sku}
              style={{ textDecoration: 'none' }}
            >
              <AuctionItem
                key={el.serialNumber}
                serialNumber={el.serialNumber}
                ownerName={el.owner.username}
                highestBid={el.listing.minBid} // TODO: is this minBid? There is no other variable available.
                endDate={el.listing.endDate}
              />
            </Link>
          ))}

        <ViewAllLink to={'/marketplace/' + collectors[0]?.sku + '/collectors'}>
          View all collectors
        </ViewAllLink>
      </Container>
    );
  } else {
    return (
      <Container>
        <p style={{ textAlign: 'center' }}>Initial release upcoming</p>
      </Container>
    );
  }
};

const Container = styled.div`
  width: 46%;
  max-width: 713px;
  margin-left: 64px;
`;

const SectionTitle = styled.h2`
  font-weight: 600 !important;
  font-size: 24px;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 40px;
  font-weight: 500px;
  color: black;
`;

const ViewAllLink = styled(Link)`
  text-align: center;
  font-weight: bold;
  color: black;
  display: block;
  margin-top: 40px;
  text-decoration: none;
`;

export default AuctionListing;
