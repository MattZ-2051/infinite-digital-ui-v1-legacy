import LatestReleases from './components/LatestReleases';
import * as S from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from 'react-router';

const SkuTilesTab = (): JSX.Element => {
  const matchesMobile = useMediaQuery('(max-width:960px)', { noSsr: true });
  const history = useHistory();

  const DeskTopView = ({ matchesMobile }) => {
    return (
      <S.Container>
        <S.SubHeader>A curated marketplace for NFTs and beyond.</S.SubHeader>
        <S.Header>Welcome to the Megaverse, to Infinite World</S.Header>
        <LatestReleases matchesMobile={matchesMobile} />
        <S.FlexDiv>
          <S.MarketPlaceButton onClick={() => history.push('/marketplace')}>
            Explore The Marketplace
          </S.MarketPlaceButton>
        </S.FlexDiv>
      </S.Container>
    );
  };

  const MobileView = ({ matchesMobile }) => {
    return (
      <S.Container>
        <S.SubHeader>
          A curated marketplace for NFTs
          <br /> and beyond.
        </S.SubHeader>
        <S.Header>
          Welcome to the <br />
          Megaverse <br /> to Infinite World
        </S.Header>
        <S.FlexDiv>
          <S.MarketPlaceButton onClick={() => history.push('/marketplace')}>
            Explore The Marketplace
          </S.MarketPlaceButton>
        </S.FlexDiv>
        <LatestReleases matchesMobile={matchesMobile} />
      </S.Container>
    );
  };
  return (
    <>
      {matchesMobile ? (
        <MobileView matchesMobile={matchesMobile} />
      ) : (
        <DeskTopView matchesMobile={matchesMobile} />
      )}
    </>
  );
};

export default SkuTilesTab;
