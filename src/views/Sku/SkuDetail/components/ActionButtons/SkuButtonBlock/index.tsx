import React from 'react';
import styled from 'styled-components/macro';
import { formatCountdown } from 'utils/dates';
import { SkuWithFunctionsPopulated } from 'entities/sku';

// FIXME: ButtonBlock Interface may be off
export interface IButtonBlock {
  totalSupplyUpcoming: number;
  circulatingSupply: number;
  minStartDate: string;
  minSkuPrice: number;
  minCurrentBid: number;
  totalNewSupplyLeft?: number; // TODO: check this
  countProductListings?: number; // TODO: Check this
  countSkuListings?: number; // TODO: Check this
}

interface IUpcomingData {
  minStartDate?: Date;
}

interface IFromCreatorBox {
  skuPrice: number;
  totalNewSupplyLeft: number;
}

interface IFromCollectorsBox {
  minimunPrice: number;
  countProductListings: number;
  totalSupply?: any;
}

const UpcomingData = ({ minStartDate }: IUpcomingData) => {
  // TODO: better message with missing minStartDate
  const countdown = minStartDate ? formatCountdown(minStartDate) : '';
  return (
    <>
      {/* TODO: Use rem instead of px to easily adjust layout on different viewport sizes */}
      <span style={{ fontSize: '24px', color: '#8E8E8E' }}>Upcoming in:</span>
      <span style={{ fontSize: '24px' }}>{countdown}</span>
    </>
  );
};

const FromCreatorBox = ({ skuPrice, totalNewSupplyLeft }: IFromCreatorBox) => {
  const handleBuyNowClick = () => {
    // TODO: Open modal
  };
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
        <Button onClick={handleBuyNowClick}>Buy Now</Button>
      </div>
    </Container>
  );
};

const FromCollectorsBox = ({
  minimunPrice,
  countProductListings,
}: IFromCollectorsBox) => {
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

// FIXME: Refactored function
// const ButtonBlock = (props: IButtonBlock) => {
const SkuButtonBlock = (props: {
  sku: SkuWithFunctionsPopulated;
}): JSX.Element | null => {
  const {
    totalSupplyUpcoming,
    circulatingSupply,
    countSkuListings,
    countProductListings,
    minStartDate,
    minSkuPrice,
    totalSupplyLeft,
    minCurrentBid,
  } = props.sku;

  const isUpcoming = !!totalSupplyUpcoming;
  const hasMintedProducts = !!circulatingSupply;

  const hasSkus = !!countSkuListings;
  const hasProducts = !!countProductListings;
  // FIXME: Hardcoded data
  const totalNewSupplyLeft = totalSupplyLeft;

  if (!hasSkus && !hasProducts) return <NotAvailable />;

  if (isUpcoming)
    return (
      <Container>
        {' '}
        <UpcomingData minStartDate={minStartDate} />
      </Container>
    );

  if (hasSkus && hasProducts) {
    return (
      <>
        <FromCreatorBox
          skuPrice={minSkuPrice}
          totalNewSupplyLeft={totalNewSupplyLeft}
        />
        <FromCollectorsBox
          minimunPrice={minCurrentBid}
          totalSupply={totalNewSupplyLeft}
          countProductListings={countProductListings}
        />
      </>
    );
  }

  if (hasSkus) {
    return (
      <FromCreatorBox
        skuPrice={minSkuPrice}
        totalNewSupplyLeft={totalNewSupplyLeft}
      />
    );
  }

  if (hasMintedProducts) {
    return (
      <FromCollectorsBox
        minimunPrice={minCurrentBid}
        totalSupply={totalNewSupplyLeft}
        countProductListings={countProductListings}
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

export default SkuButtonBlock;
