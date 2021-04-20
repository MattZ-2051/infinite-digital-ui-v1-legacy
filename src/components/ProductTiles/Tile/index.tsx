import styled from 'styled-components/macro';
import { StyledCard, Row, StyledCardImg, RedeemIcon } from '../index';
import productImg from 'assets/img/backgrounds/product-image.jpeg';
import CardContent from '@material-ui/core/CardContent';
import Rarity from 'components/Rarity';

interface IProps {
  topLeft: string | undefined;
  skuRarity: string | undefined;
  middle: string | undefined;
  bottomLeft: string | undefined;
  bottomRight: string | undefined;
  status: string | undefined;
  skuImg: string | undefined;
  redeemable: boolean | undefined;
  pillInfo: string | undefined;
  icon?: string;
}

const Tile = ({
  topLeft,
  skuRarity,
  middle,
  bottomLeft,
  bottomRight,
  status,
  skuImg,
  redeemable,
  pillInfo,
  icon,
}: IProps) => {
  return (
    <CardContainer>
      <StyledCard>
        {redeemable ? <RedeemIcon src={icon} /> : null}
        <StyledCardImg image={skuImg || productImg} />
        <CardContent
          style={{
            backgroundColor: 'white',
            padding: '5px 16px 0 16px',
            borderRadius: '20px',
          }}
        >
          <Row>
            <IssuerName>{topLeft}</IssuerName>
            <Rarity type={skuRarity || 'rare'} />
          </Row>
          <SkuName>{middle}</SkuName>
          <Row style={{ paddingTop: '8px' }}>
            <BottomCardText># {bottomLeft}</BottomCardText>
            {status === 'upcoming' && (
              <BottomCardText>{bottomRight || '0'} Dropping</BottomCardText>
            )}
            {status === 'unique' && (
              <BottomCardText style={{ color: '#ff0000' }}>
                Unique Item!
              </BottomCardText>
            )}
            {status === 'active' && (
              <BottomCardText>{bottomRight} For Sale</BottomCardText>
            )}
            {status === 'purchased' && (
              <BottomCardText>Owned by {bottomRight} people</BottomCardText>
            )}
            {status === 'no-sale' && (
              <BottomCardText>Owned by {bottomRight} people</BottomCardText>
            )}
            {status === 'active-listing' && (
              <p
                style={{
                  display: 'flex',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '20px',
                  letterSpacing: '0em',
                  color: '#9e9e9e',
                }}
              >
                Serial:
                <span style={{ color: 'black', paddingLeft: '5px' }}>
                  {bottomRight}
                </span>
              </p>
            )}
            {status === 'no-active-listing' && (
              <p
                style={{
                  display: 'flex',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '20px',
                  letterSpacing: '0em',
                  color: '#9e9e9e',
                }}
              >
                Serial:
                <span style={{ color: 'black', paddingLeft: '5px' }}>
                  {bottomRight}
                </span>
              </p>
            )}
          </Row>
        </CardContent>
      </StyledCard>
      {status === 'upcoming' && (
        <Pill style={{ backgroundColor: 'black' }}>
          <PillText>Upcoming in:</PillText>
          <PillInfo style={{ fontSize: '20px' }}>{pillInfo}</PillInfo>
        </Pill>
      )}
      {status === 'active-listing' && (
        <Pill style={{ backgroundColor: 'black' }}>
          <PillText>Current Bid:</PillText>
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
          <PillInfo
            style={{
              fontWeight: 500,
              backgroundColor: '#e5e5e5',
              margin: 'auto',
              color: '#9E9E9E',
            }}
          >
            No one selling
          </PillInfo>
        </Pill>
      )}
      {status === 'no-active-listing' && (
        <Pill style={{ backgroundColor: '#E5E5E5' }}>
          <PillText style={{ color: '#9e9e9e' }}>Estimated value:</PillText>
          <PillInfo style={{ color: '#9e9e9e' }}>${pillInfo}</PillInfo>
        </Pill>
      )}
      {status === 'purchased' && (
        <Pill style={{ backgroundColor: '#e5e5e5' }}>
          <PillText style={{ color: '#9e9e9e' }}>Purchased on:</PillText>
          <PillInfo style={{ color: '#9e9e9e' }}>{pillInfo}</PillInfo>
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
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0em;
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
