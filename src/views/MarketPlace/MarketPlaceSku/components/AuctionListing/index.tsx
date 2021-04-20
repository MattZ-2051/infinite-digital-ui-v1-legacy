import { useEffect } from 'react';
import styled from 'styled-components/macro';
import AuctionItem from './AuctionItem';
import { Link } from 'react-router-dom';
import { mockServer } from 'mock/server';

export interface IProps {
  // collectors: {
  //   serialNumber: number;
  //   ownerName: string;
  //   highestBid: number;
  //   endDate: string;
  // } | undefined;
  collectors: any;
  hasProducts: boolean;
}

const AuctionListing: React.FC<IProps> = ({ collectors, hasProducts }) => {
  const limitCollectors = collectors.slice(0, 4); //TODO: limit this in the backend?

  useEffect(() => {
    mockServer();
  }, []);

  if (hasProducts) {
    return (
      <Container>
        <SectionTitle>Auction Listing</SectionTitle>

        {limitCollectors.map((el) => (
          <Link to="/marketplace/1" style={{ textDecoration: 'none' }}>
            <AuctionItem
              key={el.serialNumber}
              serialNumber={el.serialNumber}
              ownerName={el.owner.username}
              highestBid={el.listing.highestBid.bidAmt}
              endDate={el.endDate}
            />
          </Link>
        ))}

        <ViewAllLink>View all collectors</ViewAllLink>
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

const ViewAllLink = styled.a`
  text-align: center;
  font-weight: bold;
  color: black;
  display: block;
  margin-top: 40px;
  text-decoration: none;
`;

export default AuctionListing;
