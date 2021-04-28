import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { formatCountdown, dateToPrettyString } from 'utils/dates';
import { Sku } from 'entities/sku';

const NotAvailable = (): JSX.Element => {
  return (
    <Container>
      <h4>Not available</h4>
    </Container>
  );
};
interface IUpcomingData {
  startDate?: Date;
}

const UpcomingData = ({ startDate = new Date() }: IUpcomingData) => {
  let parsedStartDate = startDate;

  if (typeof startDate === 'string') {
    parsedStartDate = new Date(startDate);
  }

  const [countdown, setCountdown] = useState(formatCountdown(parsedStartDate));
  // NOTE: Can be abstracted into a hook
  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(formatCountdown(parsedStartDate));
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <>
      <span style={{ fontSize: '24px', color: '#8E8E8E' }}>Upcoming in:</span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'right',
        }}
      >
        <span style={{ fontSize: '24px' }}>{countdown}</span>
        <small style={{ fontSize: '15px', color: '#8E8E8E' }}>
          {dateToPrettyString(startDate)}
        </small>
      </div>
    </>
  );
};

interface IFromCreatorBox {
  skuPrice: number;
  minStartDate: Date;
  totalSkuListingSuppyLeft: number;
  onBuyNow: () => void;
}

const FromCreatorBox = ({
  skuPrice,
  minStartDate,
  totalSkuListingSuppyLeft = 0,
  onBuyNow,
}: IFromCreatorBox): JSX.Element => {
  if (minStartDate > new Date()) {
    return (
      <Container>
        <UpcomingData startDate={minStartDate} />
      </Container>
    );
  }

  const disabled = !totalSkuListingSuppyLeft;

  return (
    <Container>
      <BoxColumn>
        <h4 style={{ fontSize: '24px', color: '#8E8E8E' }}>From Creator</h4>
        <small style={{ fontSize: '15px', color: '#8E8E8E' }}>
          Initial Release Price
        </small>
      </BoxColumn>
      <BoxColumn style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '28px' }}>${skuPrice}</span>
        <small style={{ fontSize: '15px' }}>
          ({totalSkuListingSuppyLeft} left)
        </small>
      </BoxColumn>
      <div>
        <Button disabled={disabled} onClick={onBuyNow}>
          {disabled ? `Sold Out` : `Buy Now`}
        </Button>
      </div>
    </Container>
  );
};

interface IFromCollectorsBox {
  minimunPrice: number;
  countProductListings: number;
  totalSupply?: any;
}

const FromCollectorsBox = ({
  minimunPrice,
  countProductListings,
}: IFromCollectorsBox): JSX.Element => {
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

const SkuButtonBlock = (props: {
  sku: Sku;
  onBuyNow: () => void;
}): JSX.Element | null => {
  const {
    countSkuListings,
    minStartDate = new Date(0),
    minSkuPrice,
    totalSkuListingSuppyLeft,
    // totalSupplyUpcoming,
    // countProductListings,
    // minCurrentBid,
  } = props.sku;

  const hasSkus = !!countSkuListings;

  // TODO: When adding collector component, this needs to be checked for here also
  // const hasProducts = !!countProductListings;

  if (!hasSkus) {
    return <NotAvailable />;
  }

  return (
    <>
      <FromCreatorBox
        skuPrice={minSkuPrice}
        minStartDate={minStartDate}
        totalSkuListingSuppyLeft={totalSkuListingSuppyLeft}
        onBuyNow={props.onBuyNow}
      />
      {/* TODO: In future will enable the collectors box */}
      {/* <FromCollectorsBox
        minimunPrice={minCurrentBid}
        totalSupply={0}
        countProductListings={countProductListings}
      /> */}
    </>
  );
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
  background-color: ${(props) => (props.disabled ? '#2D2D2D' : '#FFFFFF')};
  color: ${(props) => (props.disabled ? '#5F5F5F' : '#000000')};
  border: 0;
  height: 56px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 22px;
  width: 186px;
  outline: none;
  font-size: 20px;
  font-weight: 600;
  font-family: 'josefin-sans';
`;

export default SkuButtonBlock;
