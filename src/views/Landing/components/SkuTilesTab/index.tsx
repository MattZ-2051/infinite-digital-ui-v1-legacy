import LatestReleases from './components/LatestReleases';
import * as S from './styles';
import { useHistory } from 'react-router';
import { Sku } from 'entities/sku';

interface IProps {
  tiles: Sku[];
  matchesMobile: boolean;
}

const SkuTilesTab = ({ tiles, matchesMobile }: IProps): JSX.Element => {
  const history = useHistory();

  const DeskTopView = () => {
    return (
      <S.Container>
        <S.SubHeader>A curated marketplace for NFTs and beyond</S.SubHeader>
        <S.Header>Welcome to the Infinite metaverse</S.Header>
        <LatestReleases tiles={tiles} />
        <S.FlexDiv>
          <S.MarketPlaceButton onClick={() => history.push('/marketplace')}>
            Explore The Marketplace
          </S.MarketPlaceButton>
        </S.FlexDiv>
      </S.Container>
    );
  };

  const MobileView = () => {
    return (
      <S.Container>
        <S.SubHeader>
          A curated marketplace for NFTs
          <br /> and beyond.
        </S.SubHeader>
        <S.Header>
          Welcome to the <br />
          Infinite metaverse
        </S.Header>
        <S.FlexDiv>
          <S.MarketPlaceButton onClick={() => history.push('/marketplace')}>
            Explore The Marketplace
          </S.MarketPlaceButton>
        </S.FlexDiv>
        <LatestReleases tiles={tiles} />
      </S.Container>
    );
  };
  return <>{matchesMobile ? <MobileView /> : <DeskTopView />}</>;
};

export default SkuTilesTab;
