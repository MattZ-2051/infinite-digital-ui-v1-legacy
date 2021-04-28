import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { formatCountdown, dateToPrettyString } from 'utils/dates';
import { Sku } from 'entities/sku';
import { User } from 'entities/user';

import ModalPayment from '../../ModalPayment';

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

interface IFromCreatorBox {
  skuPrice: number;
  totalNewSupplyLeft: number;
  product: Sku;
  user: User;
  minStartDate: Date;
  totalSkuListingSuppyLeft: number;
  onBuyNow: () => void;
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

const FromCreatorBox = ({
  skuPrice,
  minStartDate,
  totalSkuListingSuppyLeft = 0,
  onBuyNow,
  product,
  user,
}: IFromCreatorBox): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (minStartDate > new Date()) {
    return (
      <Container>
        <UpcomingData startDate={minStartDate} />
      </Container>
    );
  }
  const handleBuyNowClick = () => {
    // TODO: Check this call with pablo
    onBuyNow();
    setIsModalOpen(true);
  };
  const modalMode =
    user.availableBalance < product.minSkuPrice ? 'noFunds' : 'hasFunds';
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
        <Button disabled={disabled} onClick={handleBuyNowClick}>
          {disabled ? `Sold Out` : `Buy Now`}
        </Button>
      </div>
      <ModalPayment
        visible={isModalOpen}
        setModalPaymentVisible={setIsModalOpen}
        mode={modalMode}
        product={product}
        user={user}
      />
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
  user: User;
  onBuyNow: () => void;
}) => {
  const {
    totalSupplyUpcoming,
    circulatingSupply,
    countSkuListings,
    countProductListings,
    minSkuPrice,
    totalSupplyLeft,
    minCurrentBid,
    name,
    rarity,
    imageUrls,
    totalSupply,
    redeemable,
    series,
    royaltyFeePercentage,
    minStartDate = new Date(0),
    totalSkuListingSuppyLeft,
  } = props.sku;

  const hasSkus = !!countSkuListings;
  const hasProducts = !!countProductListings;
  const userLogged = !!Object.entries(props.user).length;

  // FIXME: Hardcoded data
  const totalNewSupplyLeft = totalSupplyLeft;

  if (!hasSkus && !hasProducts) {
    return <NotAvailable />;
  }

  // TODO: No definition for isUpcoming
  // if (isUpcoming){
  //   return (
  //     <Container>
  //       {' '}
  //       <UpcomingData minStartDate={minStartDate} />
  //     </Container>
  //   );}

  if (hasSkus && hasProducts && userLogged) {
    return (
      <>
        <FromCreatorBox
          skuPrice={minSkuPrice}
          totalNewSupplyLeft={totalNewSupplyLeft}
          product={props.sku}
          user={props.user}
          minStartDate={minStartDate}
          totalSkuListingSuppyLeft={totalSkuListingSuppyLeft}
          onBuyNow={props.onBuyNow}
        />
        <FromCollectorsBox
          minimunPrice={minCurrentBid}
          totalSupply={totalSupply}
          countProductListings={countProductListings}
        />
      </>
    );
  }

  if (hasSkus && userLogged) {
    return (
      <FromCreatorBox
        skuPrice={minSkuPrice}
        totalNewSupplyLeft={totalNewSupplyLeft}
        product={props.sku}
        user={props.user}
        minStartDate={minStartDate}
        totalSkuListingSuppyLeft={totalSkuListingSuppyLeft}
        onBuyNow={props.onBuyNow}
      />
    );

    {
      /* TODO: In future will enable the collectors box */
    }
    {
      /* <FromCollectorsBox
        minimunPrice={minCurrentBid}
        totalSupply={0}
        countProductListings={countProductListings}
      /> */
    }
  }
  return <></>;
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
