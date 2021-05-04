import React from 'react';
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

  if (hasProducts) {
    return (
      <Container>
        <SectionTitle>Collectors</SectionTitle>
        {limitCollectors &&
          limitCollectors.map((el, index) => (
            <Link
              key={index}
              to={'/product/' + el._id}
              style={{ textDecoration: 'none' }}
            >
              {el.activeProductListing && (
                <AuctionItem
                  activeProductListing={el.activeProductListing}
                  key={el.serialNumber}
                  serialNumber={el.serialNumber}
                  ownerName={el.owner.username}
                  highestBid={el.activeProductListing?.price}
                  endDate={el.activeProductListing?.endDate}
                />
              )}
            </Link>
          ))}

        {/*
        TODO: see if we still need this (from Matt)
        <ViewAllLink to={'/marketplace/' + collectors[0]?.sku + '/collectors'}>
          View all collectors
        </ViewAllLink> */}
      </Container>
    );
  } else {
    return (
      <Container>
        <SectionTitle>Collectors</SectionTitle>
        <NoOwners>No one owns this item yet</NoOwners>
      </Container>
    );
  }
};

const Container = styled.div`
  width: 46%;
  max-width: 713px;
  margin-left: 64px;
  height: 400px;
  overflow: hidden;
  padding-right: 10px;
  :hover {
    cursor: pointer;
    overflow: auto;
  }

  @media screen and (max-width: 960px) {
    margin-left: 0;
  }
`;

const SectionTitle = styled.h2`
  font-weight: 600 !important;
  font-size: 24px;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 20px;
  font-weight: 500px;
  color: black;
`;

const NoOwners = styled.span`
  font-size: 16px;
  color: #9e9e9e;
  font-weight: 600;
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
