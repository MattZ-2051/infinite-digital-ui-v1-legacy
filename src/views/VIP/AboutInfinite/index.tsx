import AboutTile from './AboutTile';
import * as S from './styles';
import { useMediaQuery } from '@material-ui/core';

export interface AboutTileProps {
  title: string;
  category: string;
  description: string;
}

const AboutTileInfo: AboutTileProps[] = [
  {
    title: `Physical to Digital Products`,
    category: 'Products',
    description:
      ' We will bring the virtual and physical worlds together by connecting virtual to real world branded merch.',
  },
  {
    title: 'White labeled NFT Marketplaces',
    category: 'Marketplace',
    description:
      'Our white-labelled marketplace, using Infinite World’s Infrastructure, is optimized to sell exclusive branded products from the virtual and physical worlds.',
  },
  {
    title: 'Branded 3d Worlds',
    category: '3d Worlds',
    description:
      'We can create state of the art 3D Worlds for brands to engage with their communities.',
  },
];

const AboutInfinite = () => {
  const isMobileView = useMediaQuery('(max-width:640px)');

  return (
    <S.BackgroundContainer>
      <S.Container>
        <S.TextContainer padding="0 0 2rem 0">
          <S.WhiteText fontSize="32px">About Infinite</S.WhiteText>
        </S.TextContainer>
        <S.TextContainer padding="0 0 1.5rem 0">
          <S.GreenText>
            We bring brands, creators, and products into the combined virtual
            and physical
            {!isMobileView && <br />} worlds through our scalable infrastructure
            and NFTs of true utility.
          </S.GreenText>
        </S.TextContainer>
        <S.TextContainer padding="0 0 2.5rem 0">
          <S.DarkGreyText>
            We provide the tool box to brands and creators to increase
            engagement, traceability and authenticity for their real world and
            virtual products,
            {!isMobileView && <br />}
            events, and interactions. We’ve built the avenue for brands and
            creators for crowdsource engagement.
          </S.DarkGreyText>
        </S.TextContainer>
        <S.TextContainer padding="0 0 0.5rem 0">
          <S.WhiteText fontSize={isMobileView ? '20px' : '24px'}>
            Brands and Creators need to be in this InfiniteWorld Megaverse!
          </S.WhiteText>
        </S.TextContainer>
        <S.TextContainer padding="0 0 4rem 0">
          <S.GreyItalicText>
            InfiniteWorld will provide you with tools to get you there!
          </S.GreyItalicText>
        </S.TextContainer>
        <S.AboutTileContainer>
          {AboutTileInfo.map((info, index) => {
            return <AboutTile {...info} key={index} />;
          })}
        </S.AboutTileContainer>
      </S.Container>
    </S.BackgroundContainer>
  );
};

export default AboutInfinite;
