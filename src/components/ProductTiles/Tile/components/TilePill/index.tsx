import usePriceFormatter from 'hooks/usePriceFormatter';
import * as S from './styles';
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
    <S.Container>
      {status.split('-')[0] === 'upcoming' && !status.includes('time') && (
        <S.Pill
          isLight={light}
          style={{ backgroundColor: light ? 'white' : '#2d2d2d' }}
        >
          <S.Upcoming isLight={light}>Upcoming</S.Upcoming>
        </S.Pill>
      )}
      {status.includes('time') && (
        <S.Pill
          isLight={light}
          style={{ backgroundColor: light ? 'white' : '#2d2d2d' }}
        >
          <S.PillText isLight={light}>Upcoming</S.PillText>
          <S.PillInfo isLight={light} style={{ fontSize: '15px' }}>
            {pillInfo.replaceAll('-', '')}
          </S.PillInfo>
        </S.Pill>
      )}
      {status === 'active-listing' && (
        <S.Pill
          isLight={light}
          style={{ backgroundColor: light ? 'white' : '#2d2d2d' }}
        >
          <S.PillText isLight={light}>Current Price:</S.PillText>
          <S.PillInfo isLight={light}>${formattedPrice}</S.PillInfo>
        </S.Pill>
      )}
      {status === 'active' && (
        <S.Pill
          isLight={light}
          style={{ backgroundColor: light ? 'white' : '#2d2d2d' }}
        >
          <S.PillText isLight={light}> Lowest Price:</S.PillText>
          <S.PillInfo isLight={light}>${formattedPrice}</S.PillInfo>
        </S.Pill>
      )}
      {status === 'no-sale' && (
        <S.Pill
          isLight={light}
          style={{ backgroundColor: light ? 'white' : '#e5e5e5' }}
        >
          <S.NotForSale isLight={light}>None for sale</S.NotForSale>
        </S.Pill>
      )}
      {status === 'no-active-listing' && (
        <S.Pill
          isLight={light}
          style={{ backgroundColor: light ? 'white' : '#e5e5e5' }}
        >
          <S.NotForSale isLight={light}>Not for sale</S.NotForSale>
        </S.Pill>
      )}
    </S.Container>
  );
};

export default TilePill;
