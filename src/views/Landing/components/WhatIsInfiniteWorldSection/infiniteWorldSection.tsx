import * as S from './styles';

const InfiniteWorldSection = () => {
  return (
    <S.MainContainer>
      <S.Container>
        <S.TitleContainer>
          <S.MainTitle>What is infinite World?</S.MainTitle>
          <S.MainText style={{ marginBottom: '0px' }}>
            We provide the infrastructure for brands and creators to build
            communities in the metaverse
          </S.MainText>
        </S.TitleContainer>
        <S.ColumnsContainer>
          <S.Column>
            <S.ColumnTitle>Build your own NFT Megaverse</S.ColumnTitle>
            <S.ColumnText>
              We create state of the art NFT worlds and marketplaces for brands
              and creators that enable them to achieve elevated consumer
              experiences
            </S.ColumnText>
          </S.Column>
          <S.Column>
            <S.ColumnTitle>
              Curate your collection of digital and physical goods
            </S.ColumnTitle>
            <S.ColumnText>
              Our carbon negative NFT marketplace for exclusive digital ad
              physical products connects communities, creators brands and
              creators.
            </S.ColumnText>
          </S.Column>
          <S.Column>
            <S.ColumnTitle>
              Experience utility of your NFTs like never before.
            </S.ColumnTitle>
            <S.ColumnText>
              Welcome to the Megaverse. We leverage the best of blockchain and
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
