import * as React from 'react';
import * as S from './style';

import phoneImg from 'assets/img/backgrounds/phone-with-stand.png';

const VerifiedAuthenticity = (): React.ReactElement => {
  return (
    <S.Container>
      <S.BlockGrid>
        <S.ImgBlock className="block__img">
          <img
            width="auto"
            height="653"
            src={phoneImg}
            className="img__phone"
          />
        </S.ImgBlock>
        <S.Header>
          <h2>Verified Authenticity</h2>
          <h3>Authenticate your Collectibles and Luxury Items</h3>
        </S.Header>
        <S.Action className="block__action">
          <p>
            We provide a unique platform to manage your physical collectables
            through a digital closet of NFTs. Bringing confidence and
            accessibility, collectibles are permanently tracked and tagged as
            authentic with a discrete tamper-proof NFC sticker.
          </p>
          <h4>
            Claim ownership of your items to curate your collection and share
            them on InfiniteWorld.
          </h4>
          <S.Stores className="block__store">
            <a
              href="https://apps.apple.com/us/app/infinite-by-suku/id1513642328"
              target="_blank"
              rel="noreferrer"
            >
              <S.AppStore aria-label="App Store" />
            </a>
          </S.Stores>
        </S.Action>
      </S.BlockGrid>
    </S.Container>
  );
};

export default VerifiedAuthenticity;
