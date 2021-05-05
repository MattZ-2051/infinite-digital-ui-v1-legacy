import React from 'react';
import { ReactComponent as RightArrow } from 'assets/svg/icons/arrow-right.svg';
import styled from 'styled-components/macro';
import { Listing } from 'entities/listing';
import { formatCountdown } from 'utils/dates';

export interface AuctionItemProps {
  serialNumber: string;
  ownerName: string;
  highestBid?: number;
  endDate?: Date;
  activeProductListing?: Listing;
  listings: Listing[];
}

const AuctionItem = ({
  serialNumber,
  ownerName,
  highestBid,
  endDate,
  activeProductListing,
}: AuctionItemProps): JSX.Element => {
  const auctionDetailMsg = !activeProductListing
    ? 'View Details'
    : activeProductListing?.saleType === 'auction'
    ? 'Bid for'
    : 'On sale for';

  return (
    <Container>
      {/* <Avatar /> */}

      <UserDetail>
        <span>
          <strong style={{ color: 'black' }}>{`#${serialNumber}`}</strong>
        </span>
        <span style={{ color: '#9E9E9E' }}>{ownerName}</span>
      </UserDetail>

      <AuctionDetail>
        <div>
          <span style={{ color: '#9E9E9E', marginRight: '10px' }}>
            {auctionDetailMsg}
          </span>
          {activeProductListing && (
            <>
              <span
                style={{ fontWeight: 'bold', color: 'black' }}
              >{`$${highestBid}`}</span>{' '}
            </>
          )}
          <br />
        </div>

        {/*  */}
        {/* <strong style={{ color: 'black' }}>
          Expires in {formatCountdown(new Date(endDate))}
        </strong> */}
      </AuctionDetail>

      <RightArrow style={{ marginLeft: '20px' }} />
    </Container>
  );
};

const Container = styled.div`
  height: 85px;
  border-bottom: 1px solid #ebebeb;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-template-columns: auto 1fr;
`;

const Avatar = styled.div`
  height: 48px;
  width: 48px;
  margin-right: 24px;
  border-radius: 20px;
  background-color: #8c8c8c;
`;

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuctionDetail = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

export default AuctionItem;
