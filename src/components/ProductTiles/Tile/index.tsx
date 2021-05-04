import React from 'react';
import styled from 'styled-components/macro';
import { StyledCard, Row, CardImg, RedeemIcon } from '../index';
import productImg from 'assets/img/backgrounds/product-image.jpeg';
import CardContent from '@material-ui/core/CardContent';
import redeemIcon from 'assets/img/icons/redeem-icon-2.png';
import Rarity from 'components/Rarity';
import { Sku } from 'entities/sku';

interface Props {
  sku: Sku;
  topLeft: string;
  skuRarity: string;
  middle: string;
  bottomLeft: string;
  bottomRight: string;
  status:
    | 'unique'
    /*SKU Tile Types*/
    | 'upcoming-sku'
    | 'active'
    | 'no-sale'
    /*Product Tile Types */
    | 'upcoming-product'
    | 'active-listing'
    | 'no-active-listing'
    | '';
  skuImg: string;
  redeemable: boolean;
  pillInfo: string;
  unique: boolean;
  handleRedirect: () => void;
  supplyType: string;
}

const Tile = ({
  sku,
  topLeft,
  skuRarity,
  middle,
  bottomLeft,
  bottomRight,
  status,
  skuImg,
  redeemable,
  pillInfo,
  unique,
  handleRedirect,
  supplyType,
}: Props): JSX.Element => {
  return (
    <CardContainer onClick={handleRedirect}>
      <StyledCard>
        {redeemable ? (
          <RedeemIcon src={redeemIcon} style={{ position: 'absolute' }} />
        ) : null}

        {skuImg?.endsWith('mov') || skuImg?.endsWith('mp4') ? (
          <video
            style={{
              height: '240px',
              width: '302px',
              borderRadius: '20px 20px 0 0',
            }}
            autoPlay={true}
            controls={false}
            loop={true}
            muted={true}
            src={skuImg}
          ></video>
        ) : (
          <CardImg src={skuImg || productImg} alt="" />
        )}

        <CardContent
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            paddingTop: '10px',
          }}
        >
          <Row>
            <IssuerName style={{ fontSize: '16px' }}>
              {topLeft?.length > 15 ? `${topLeft?.slice(0, 15)}...` : topLeft}
            </IssuerName>
            <Rarity type={skuRarity} />
          </Row>

          <SkuName>{middle}</SkuName>
          <Row style={{ paddingTop: '8px' }}>
            <BottomCardText style={{ textAlign: 'start' }}>
              {bottomLeft}
            </BottomCardText>
            {status === 'upcoming-sku' && (
              <BottomCardText>
                {' '}
                {supplyType === 'variable' ? null : <>{bottomRight} Dropping</>}
              </BottomCardText>
            )}
            {unique && (
              <BottomCardText style={{ color: '#ff0000' }}>
                Unique Item!
              </BottomCardText>
            )}
            {status === 'active' && (
              <BottomCardText>
                {supplyType === 'variable' ? null : `${bottomRight} For Sale`}
              </BottomCardText>
            )}
            {status === 'no-sale' && (
              <BottomCardText>{bottomRight} Owned</BottomCardText>
            )}
            {status === 'active-listing' && (
              <SerialNum>
                {/* TODO: check if we are going to use serialNum */}
                Serial:
                <span style={{ color: 'black', paddingLeft: '5px' }}>
                  {bottomRight}
                </span>
              </SerialNum>
            )}
            {status === 'no-active-listing' && (
              <SerialNum>
                {/* TODO: check if we are going to use serialNum */}
                Serial:
                <span style={{ color: 'black', paddingLeft: '5px' }}>
                  {bottomRight}
                </span>
              </SerialNum>
            )}
          </Row>
        </CardContent>
      </StyledCard>
      {status.split('-')[0] === 'upcoming' && (
        <Pill style={{ backgroundColor: 'black' }}>
          <PillText>Upcoming in:</PillText>
          <PillInfo style={{ fontSize: '20px' }}>{pillInfo}</PillInfo>
        </Pill>
      )}
      {status === 'active-listing' && (
        <Pill style={{ backgroundColor: 'black' }}>
          <PillText>Current Price:</PillText>
          <PillInfo>${pillInfo}</PillInfo>
        </Pill>
      )}
      {status === 'active' && (
        <Pill style={{ backgroundColor: 'black' }}>
          <PillText> Lowest Price:</PillText>
          <PillInfo>${pillInfo}</PillInfo>
        </Pill>
      )}
      {status === 'no-sale' && (
        <Pill style={{ backgroundColor: '#e5e5e5' }}>
          <NotForSale>No one selling</NotForSale>
        </Pill>
      )}
      {status === 'no-active-listing' && (
        <Pill style={{ backgroundColor: '#e5e5e5' }}>
          <NotForSale>Not for sale</NotForSale>
        </Pill>
      )}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  :hover {
    cursor: pointer;
  }
`;

const NotForSale = styled.span`
  font-weight: 500;
  backgound-color: #e5e5e5;
  margin: auto;
  color: #9e9e9e;
  font-size: 24px;
  line-height: 32px;
  height: 32px;
`;

const SerialNum = styled.p`
  display: flex;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0em;
  color: #9e9e9e;
`;

const Pill = styled.div`
  position: relative;
  width: 270px;
  height: 56px;
  border-radius: 35px;
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-between;
  padding: 0 25px;
  bottom: 25px;
`;

const PillText = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 20.24px;
  color: #c4c4c4;
  height: 20px;
`;

const PillInfo = styled.span`
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  height: 32px;
`;

const BottomCardText = styled.p`
  display: flex;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0em;
  text-align: end;
  display: flex;
  align-items: center;
`;

const SkuName = styled.p`
  font-size: 26px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  margin: 0;
  padding-top: 8px;
`;

const IssuerName = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 20.24px;
  color: #9e9e9e;
`;

export default Tile;
