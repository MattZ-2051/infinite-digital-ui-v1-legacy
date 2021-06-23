import usePriceFormatter from 'hooks/usePriceFormatter';
import styled from 'styled-components/macro';

export interface IProps {
  pillInfo: string;
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
  light?: true | false;
}

const TilePill = ({ status, pillInfo, light = false }) => {
  const formattedPrice = usePriceFormatter(
    status === 'active' || status === 'active-listing' ? pillInfo : 0
  );

  return (
    <Container>
      {status.split('-')[0] === 'upcoming' && !status.includes('time') && (
        <Pill
          isLight={light}
          style={{ backgroundColor: light ? 'white' : '#2d2d2d' }}
        >
          <Upcoming isLight={light}>Upcoming</Upcoming>
        </Pill>
      )}
      {status.includes('time') && (
        <Pill
          isLight={light}
          style={{ backgroundColor: light ? 'white' : '#2d2d2d' }}
        >
          <PillText isLight={light}>Upcoming</PillText>
          <PillInfo isLight={light} style={{ fontSize: '15px' }}>
            {pillInfo.replaceAll('-', '')}
          </PillInfo>
        </Pill>
      )}
      {status === 'active-listing' && (
        <Pill
          isLight={light}
          style={{ backgroundColor: light ? 'white' : '#2d2d2d' }}
        >
          <PillText isLight={light}>Current Price:</PillText>
          <PillInfo isLight={light}>${formattedPrice}</PillInfo>
        </Pill>
      )}
      {status === 'active' && (
        <Pill
          isLight={light}
          style={{ backgroundColor: light ? 'white' : '#2d2d2d' }}
        >
          <PillText isLight={light}> Lowest Price:</PillText>
          <PillInfo isLight={light}>${formattedPrice}</PillInfo>
        </Pill>
      )}
      {status === 'no-sale' && (
        <Pill
          isLight={light}
          style={{ backgroundColor: light ? 'white' : '#2d2d2d' }}
        >
          <NotForSale isLight={light}>None for sale</NotForSale>
        </Pill>
      )}
      {status === 'no-active-listing' && (
        <Pill
          isLight={light}
          style={{ backgroundColor: light ? 'white' : '#2d2d2d' }}
        >
          <NotForSale isLight={light}>Not for sale</NotForSale>
        </Pill>
      )}
    </Container>
  );
};

const Container = styled.div``;

const Pill = styled.div<{ isLight?: boolean }>`
  position: relative;
  width: 270px;
  height: 56px;
  border-radius: 35px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.isLight ? 'black' : '#c4c4c4')};
  justify-content: space-between;
  padding: 0 25px;
  bottom: 25px;
`;

const PillText = styled.span<{ isLight?: boolean }>`
  font-weight: 700;
  font-size: 16px;
  line-height: 20.24px;
  color: ${(props) => (props.isLight ? 'black' : '#c4c4c4')};
  height: 20px;
`;

const PillInfo = styled.span<{ isLight?: boolean }>`
  font-weight: 600;
  font-size: 22px;
  line-height: 32px;
  height: 32px;
  color: ${(props) => (props.isLight ? 'black' : 'white')};
`;

const Upcoming = styled.span<{ isLight?: boolean }>`
  font-weight: 700;
  backgound-color: black;
  margin: auto;
  color: ${(props) => (props.isLight ? 'black' : 'white')};
  font-size: 20px;
  line-height: 32px;
  height: 32px;
`;

const NotForSale = styled.span<{ isLight?: boolean }>`
  font-weight: 700;
  backgound-color: #e5e5e5;
  margin: auto;
  color: ${(props) => (props.isLight ? 'black' : '#9e9e9e')};
  font-size: 20px;
  line-height: 32px;
  height: 32px;
`;

export default TilePill;
