import * as S from './styles';
const FeaturedOn = () => {
  return (
    <S.MainContainer>
      <S.Featured className="block__features">
        <S.Title>As featured on:</S.Title>
        <S.Brands>
          <S.BrandLink>
            <a
              href="https://www.forbes.com/sites/sharonedelson/2021/05/19/sukus-infinite-nft-marketplace-bows-today-get-your-john-lennon-digital-collectibles/?sh=6c167c0e47ab"
              target="_blank"
              rel="noreferrer"
            >
              <S.Forbes aria-label="Forbes" />
            </a>
          </S.BrandLink>
          <S.BrandLink>
            <a
              href="https://www.coindesk.com/suku-sneaker-app-switches-from-ethereum-to-hedera-hashgraph"
              target="_blank"
              rel="noreferrer"
            >
              <S.Coindesk aria-label="Coindesk" />
            </a>
          </S.BrandLink>
          <S.BrandLink>
            <a
              href="https://finance.yahoo.com/news/sukus-infinite-nft-marketplace-auction-213500984.html"
              target="_blank"
              rel="noreferrer"
            >
              <S.YFinance aria-label="Yahoo Finance" />
            </a>
          </S.BrandLink>
        </S.Brands>
      </S.Featured>
    </S.MainContainer>
  );
};

export default FeaturedOn;
