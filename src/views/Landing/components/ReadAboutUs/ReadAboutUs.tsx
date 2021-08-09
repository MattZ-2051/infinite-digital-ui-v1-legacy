import { ReadMore } from './components/ReadMore';
import * as S from './styles';
export const ReadAboutUs = () => {
  return (
    <S.MainContainer>
      <S.Container>
        <S.LeftColumn>
          <S.WhatsNew>{`What's new?`}</S.WhatsNew>
          <S.Title>Read all about us.</S.Title>
          <S.SubTitle>
            Infinite World is at the forefront of creating sustainable
            ecosystems for NFTs and beyond.
          </S.SubTitle>
        </S.LeftColumn>
        <S.RightColumn>
          <ReadMore
            title={'Forbes'}
            text={
              'Suku’s Infinite NFT Marketplace Bows Today, Get Your John Lennon Digital Collectibles'
            }
            link={
              'https://www.forbes.com/sites/sharonedelson/2021/05/19/sukus-infinite-nft-marketplace-bows-today-get-your-john-lennon-digital-collectibles/?sh=7b203a5c47ab'
            }
            white={false}
          />
          <ReadMore
            title={'Decrypt'}
            text={`SUKU's New NFT Platform Claims to Be 'Carbon Negative'`}
            link={
              'https://decrypt.co/71453/suku-nft-environment-carbon-negative'
            }
            white={true}
          />
          <ReadMore
            title={'Footwearnews'}
            text={
              'NBA Star Spencer Dinwiddie Launches K8iros ‘Crypto Sneaker’ for a Good Cause'
            }
            link={
              'https://footwearnews.com/2021/focus/athletic-outdoor/spencer-dinwiddie-k8iros-crypto-sneaker-nft-release-info-1203162082/'
            }
            white={false}
          />
        </S.RightColumn>
      </S.Container>
    </S.MainContainer>
  );
};
