import { useWindowScroll } from 'react-use';
import * as S from './styles';

const InfiniteWorldSection = () => {
  return (
    <S.MainContainer>
      <S.Container>
        <S.TitleContainer>
          <S.MainTitle>What is InfiniteWorld?</S.MainTitle>
          <S.MainText style={{ marginBottom: '0px' }}>
            We provide the infrastructure for brands and creators to build
            communities in the metaverse
          </S.MainText>
        </S.TitleContainer>
        <S.ColumnsContainer>
          <S.Column>
            <S.ColumnTitle
              style={{ minWidth: window.innerWidth > 1250 ? '340px' : '0' }}
            >
              Build your own
              {window.innerWidth > 1250 && <br />} NFT Metaverse
            </S.ColumnTitle>
            <S.ColumnText>
              We create state of the art NFT worlds and marketplaces for brands
              and creators that enable them to achieve elevated consumer
              experiences.
            </S.ColumnText>
          </S.Column>
          <S.Column style={{ margin: '0 10px 0 10px' }}>
            <S.ColumnTitle>
              Curate your collection of digital and physical goods
            </S.ColumnTitle>
            <S.ColumnText>
              Our carbon negative NFT marketplace for exclusive digital and
              physical products connects communities, creators, and brands.
            </S.ColumnText>
          </S.Column>
          <S.Column>
            <S.ColumnTitle>
              Experience utility of your NFTs like never before
            </S.ColumnTitle>
            <S.ColumnText>
              Welcome to the metaverse. We leverage the best of blockchain and
              digital capabilities to create a realm of consumer experience like
              never before.
            </S.ColumnText>
          </S.Column>
        </S.ColumnsContainer>
      </S.Container>
    </S.MainContainer>
  );
};

export default InfiniteWorldSection;
