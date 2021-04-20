import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import DateTime from 'luxon/src/datetime.js';

import {
  useLocation
} from "react-router-dom";


export interface IButtonBlock {
  data: {
    totalSupplyUpcoming: number;
    countSkuListings: number;
    minStartDate: string;
    minSkuPrice: number;
    totalNewSupplyLeft: number;
    circulatingSupply: number;
    minCurrentBid: number;
    countProductListings: number;
  };
}

// Boxes
const UpcomingData = ({ minStartDate }) => {
  let formattedTimer = '';
  const date1 = DateTime.fromISO(minStartDate); //ISO-8601
  const date2 = DateTime.now();
  const diff = date1.diff(date2, [
    'years',
    'months',
    'days',
    'hours',
    'minutes',
  ]);
  const monthsLeft = diff.toObject().months;
  const daysLeft = diff.toObject().days;
  const hoursLeft = diff.toObject().hours;
  const minutesLeft = diff.toObject().minutes;

  if (hoursLeft < 24) {
    formattedTimer = `${hoursLeft}h ${Math.round(minutesLeft)}m`;
  } else if (daysLeft < 28) {
    formattedTimer = `${daysLeft}d ${hoursLeft % 24}h`;
  } else {
    formattedTimer = `${monthsLeft}m ${daysLeft}d`;
  }

  useEffect(() => {
    //TODO: put an interval?
    // const interval = setInterval(() => {
    //   console.log('')
    // }, 1000);
    //return () => clearInterval(interval);
  }, [minStartDate]);

  return (
    <>
      <span style={{ fontSize: '24px', color: '#8E8E8E' }}>Upcoming in:</span>
      <span style={{ fontSize: '24px' }}>{formattedTimer}</span>
    </>
  );
};

const FromCreatorBox = ({ skuPrice, totalNewSupplyLeft }) => {
  return (
    <Container>
      <BoxColumn>
        <h4 style={{ fontSize: '24px', color: '#8E8E8E' }}>From Creator</h4>
        <small style={{ fontSize: '15px', color: '#8E8E8E' }}>
          Initial Listing Price
        </small>
      </BoxColumn>
      <BoxColumn>
        <span style={{ fontSize: '28px' }}>${skuPrice}</span>
        <small style={{ fontSize: '15px' }}>({totalNewSupplyLeft} left)</small>
      </BoxColumn>
      <div>
        <Button disabled style={{backgroundColor: '#2D2D2D', color: '#5F5F5F'}}>Buy Now</Button>
      </div>
    </Container>
  );
};

const FromCollectorsBox = ({
  minimunPrice,
  totalSupply,
  countProductListings,
}) => {
  return (
    <Container>
      <BoxColumn>
        <h4 style={{ fontSize: '24px', color: '#8E8E8E' }}>From Collectors</h4>
        <small style={{ fontSize: '15px', color: '#8E8E8E' }}>
          Lowest Listing Price
        </small>
      </BoxColumn>
      <BoxColumn>
        <span style={{ fontSize: '28px' }}>
          {!!countProductListings ? minimunPrice : '--'}
        </span>
        <small style={{ fontSize: '15px' }}>
          {!!countProductListings
            ? `(${countProductListings} for sale)`
            : `${countProductListings} minted`}
        </small>
      </BoxColumn>
      <div>
        <Button>See All</Button>
      </div>
    </Container>
  );
};

const NotAvailable = () => {
  return (
    <Container>
      <h4>Not available</h4>
    </Container>
  );
};

const ButtonBlock: React.FC<IButtonBlock> = ({ data }) => {
  const isUpcoming = !!data.totalSupplyUpcoming;
  const hasMintedProducts = !!data.circulatingSupply;
  const hasSkus = !!data.countSkuListings;
  const hasProducts = !!data.countProductListings;
  let location = useLocation(); //TODO: remove post QA

  if (!hasSkus && !hasProducts) return <NotAvailable />;

  if (isUpcoming && (location.pathname ==='/marketplace/2')) //TODO: remove post QA
    return (
      <Container>
        {' '}
        <UpcomingData minStartDate={data.minStartDate} />
      </Container>
    );

  if (hasSkus && hasProducts) {
    return (
      <>
        <FromCreatorBox
          skuPrice={data.minSkuPrice}
          totalNewSupplyLeft={data.totalNewSupplyLeft}
        />
        <FromCollectorsBox
          minimunPrice={data.minCurrentBid}
          totalSupply={data.totalNewSupplyLeft}
          countProductListings={data.countProductListings}
        />
      </>
    );
  }

  if (hasSkus) {
    return (
      <FromCreatorBox
        skuPrice={data.minSkuPrice}
        totalNewSupplyLeft={data.totalNewSupplyLeft}
      />
    );
  }

  if (hasMintedProducts) {
    return (
      <FromCollectorsBox
        minimunPrice={data.minCurrentBid}
        totalSupply={data.totalNewSupplyLeft}
        countProductListings={data.countProductListings}
      />
    );
  }
  return null;
};

const Container = styled.div`
  padding: 0 80px 0 48px;
  height: 146px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
`;

const BoxColumn = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: 0;
  height: 56px;
  cursor: pointer;
  border-radius: 22px;
  width: 186px;
  outline: none;
  font-size: 20px;
  font-weight: 600;
  font-family: 'josefin-sans';
`;

export default ButtonBlock;
