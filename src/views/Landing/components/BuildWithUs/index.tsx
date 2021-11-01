import * as React from 'react';
import * as S from './style';

import landingImg from 'assets/img/backgrounds/spencer-landing.png';
import shootImg from 'assets/img/backgrounds/spencer-shoot.png';
import shoesImg from 'assets/img/backgrounds/spencer-shoes.png';

const BuildWithUs = (): React.ReactElement => {
  return (
    <S.BackgroundContainer>
      <S.Container>
        <S.BlockGrid>
          <S.Header>
            <h2>Build your own marketplace</h2>
            <h3 style={{ fontWeight: 500 }}>We provide 360º NFT Solutions for creators and brands</h3>
          </S.Header>
          <S.Action className="block__action">
            <p>
              Whether on InfiniteWorld or through custom solutions, we can help
              you engage with your audience through innovative NFT releases that
              bridge the gap between the digital and physical world.
            </p>
            <S.ActionButton href="https://goinfinite.io/help">
              Create with us
            </S.ActionButton>
          </S.Action>
          <S.Featured className="block__features">
            <h4>As featured on:</h4>
            <a
              href="https://www.forbes.com/sites/sharonedelson/2021/05/19/sukus-infinite-nft-marketplace-bows-today-get-your-john-lennon-digital-collectibles/?sh=6c167c0e47ab"
              target="_blank"
              rel="noreferrer"
            >
              <S.Forbes aria-label="Forbes" />
            </a>
            <a
              href="https://www.coindesk.com/suku-sneaker-app-switches-from-ethereum-to-hedera-hashgraph"
              target="_blank"
              rel="noreferrer"
            >
              <S.Coindesk aria-label="Coindesk" />
            </a>
            <a
              href="https://finance.yahoo.com/news/sukus-infinite-nft-marketplace-auction-213500984.html"
              target="_blank"
              rel="noreferrer"
            >
              <S.YFinance aria-label="Yahoo Finance" />
            </a>
          </S.Featured>
          <S.ImgBlock className="block__img">
            <S.ImgFrame className="img__landing__frame">
              <img width="407" height="534" src={landingImg} style={{ transform: 'translateZ(7px)' }} />
            </S.ImgFrame>

            <img
              width="192"
              height="540"
              src={shootImg}
              className="img__shoot"
            />
            <img
              width="341"
              height="280"
              src={shoesImg}
              className="img__shoes"
            />
          </S.ImgBlock>
        </S.BlockGrid>
      </S.Container>
    </S.BackgroundContainer>
  );
};

export default BuildWithUs;
