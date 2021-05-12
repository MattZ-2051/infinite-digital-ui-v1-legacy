import React from 'react';
import styled from 'styled-components/macro';
import { StyledCard, Row, RedeemIcon } from '../index';
import CardContent from '@material-ui/core/CardContent';
import redeemIcon from 'assets/img/icons/redeem-icon-2.png';
import Rarity from 'components/Rarity';
import { Sku } from 'entities/sku';
import Emoji from 'components/Emoji';
import { Media } from '../../Media/Media';

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
    | 'upcoming-sku-time'
    | 'active'
    | 'no-sale'
    /*Product Tile Types */
    | 'upcoming-product-time'
    | 'active-listing'
    | 'no-active-listing'
    | '';
  skuImg: string;
  redeemable: boolean;
  pillInfo: string;
  unique: boolean;
  handleRedirect: () => void;
  supplyType: string;
  themeStyle: 'light' | 'dark';
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
  themeStyle,
  handleRedirect,
  supplyType,
}: Props): JSX.Element => {
  return (
    <CardContainer onClick={handleRedirect}>
      <StyledCard themeStyle={themeStyle}>
        {redeemable ? (
          <RedeemIcon src={redeemIcon} style={{ position: 'absolute' }} />
        ) : null}

        <Media
          src={skuImg}
          styles={{
            height: '240px',
            width: '302px',
            borderRadius: '20px 20px 0 0',
            objectFit: 'cover',
          }}
        />

        <StyledCardContent themeStyle={themeStyle}>
          <Row>
            <IssuerName style={{ fontSize: '16px' }}>
              {topLeft?.length > 15 ? `${topLeft?.slice(0, 15)}...` : topLeft}
            </IssuerName>
            <Rarity type={skuRarity} />
          </Row>

          <SkuName>{middle}</SkuName>
          <Row style={{ paddingTop: '8px' }}>
            <AccentCardText
              themeStyle={themeStyle}
              style={{ textAlign: 'start' }}
            >
              {bottomLeft}
            </AccentCardText>
            {status === 'upcoming-sku' && !unique && (
              <BottomCardText>
                {' '}
                {supplyType === 'variable' ? null : <>{bottomRight} Dropping</>}
              </BottomCardText>
            )}
            {unique && (
              <BottomCardText
                style={{ color: '#ff0000', whiteSpace: 'nowrap' }}
              >
                <span>
                  <Emoji label="fire" symbol="🔥" /> Unique Item!
                </span>
              </BottomCardText>
            )}
            {status === 'active' && !unique && (
              <BottomCardText>
                {supplyType === 'variable' ? null : `${bottomRight} For Sale`}
              </BottomCardText>
            )}
            {status === 'no-sale' && !unique && (
              <BottomCardText>{bottomRight} Owned</BottomCardText>
            )}
            {status === 'active-listing' && !unique && (
              <SerialNum>
                Serial:
                <span style={{ color: 'black', paddingLeft: '5px' }}>
                  {bottomRight}
                </span>
              </SerialNum>
            )}
            {status === 'no-active-listing' && !unique && (
              <SerialNum>
                Serial:
                <span style={{ color: 'black', paddingLeft: '5px' }}>
                  {bottomRight}
                </span>
              </SerialNum>
            )}
            {status === 'upcoming-product-time' && !unique && (
              <SerialNum>
                Serial:
                <span style={{ color: 'black', paddingLeft: '5px' }}>
                  {bottomRight}
                </span>
              </SerialNum>
            )}
          </Row>
        </StyledCardContent>
      </StyledCard>
      {status.split('-')[0] === 'upcoming' && !status.includes('time') && (
        <Pill themeStyle={themeStyle} active={false}>
          <Upcoming>Upcoming</Upcoming>
        </Pill>
      )}
      {status.includes('time') && (
        <Pill themeStyle={themeStyle} active={false}>
          <PillText>Upcoming in:</PillText>
          <PillInfo style={{ fontSize: '18px' }}>
            {pillInfo.replaceAll('-', '')}
          </PillInfo>
        </Pill>
      )}
      {status === 'active-listing' && (
        <Pill themeStyle={themeStyle} active={true}>
          <PillText>Current Price:</PillText>
          <PillInfo>${pillInfo}</PillInfo>
        </Pill>
      )}
      {status === 'active' && (
        <Pill themeStyle={themeStyle} active={true}>
          <PillText> Lowest Price:</PillText>
          <PillInfo>${pillInfo}</PillInfo>
        </Pill>
      )}
      {status === 'no-sale' && (
        <Pill themeStyle={themeStyle} active={false}>
          <NotForSale>No one selling</NotForSale>
        </Pill>
      )}
      {status === 'no-active-listing' && (
        <Pill themeStyle={themeStyle} active={false}>
          <NotForSale>Not for sale</NotForSale>
        </Pill>
      )}
    </CardContainer>
  );
};

const StyledCardContent = styled(CardContent)<{ themeStyle; theme }>`
  background-color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.secondaryMain
      : theme.palette.light.secondaryMain};
  color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.secondaryComplement
      : theme.palette.light.secondaryComplement};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-top: 0px;
`;

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
  font-weight: 700;
  background-color: #e5e5e5;
  margin: auto;
  color: #9e9e9e;
  font-size: 20px;
  line-height: 32px;
  height: 32px;
`;

const Upcoming = styled.span`
  font-weight: 700;
  margin: auto;
  font-size: 20px;
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

const Pill = styled.div<{ theme; themeStyle; active: boolean }>`
  background-color: ${({ themeStyle, theme, active }) =>
    themeStyle === 'dark'
      ? active
        ? theme.palette.dark.accentMain
        : theme.palette.dark.accentSecondary
      : active
      ? theme.palette.light.baseComplement
      : theme.palette.light.baseComplement};
  color: ${({ themeStyle, theme, active }) =>
    themeStyle === 'dark'
      ? active
        ? theme.palette.dark.accentComplement
        : theme.palette.dark.secondaryComplement
      : active
      ? theme.palette.light.accentComplement
      : theme.palette.light.secondaryComplement};
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
  font-weight: 700;
  font-size: 16px;
  line-height: 20.24px;
  color: #c4c4c4;
  height: 20px;
`;

const PillInfo = styled.span`
  font-weight: 600;
  font-size: 22px;
  line-height: 32px;
  height: 32px;
`;

const BottomCardText = styled.p`
  display: flex;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0em;
  text-align: end;
  display: flex;
  align-items: center;
`;

const AccentCardText = styled(BottomCardText)<{ theme; themeStyle }>`
  color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.darkGreyText
      : theme.palette.light.baseComplement};
`;

const SkuName = styled.p`
  font-size: 26px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0em;
  margin: 0;
  height: 52px;
`;

const IssuerName = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 20.24px;
  color: #9e9e9e;
`;

export default Tile;
