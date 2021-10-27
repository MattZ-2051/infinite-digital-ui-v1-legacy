import * as S from './styles';
import BrandsPageImgMobile from 'assets/VIPLanding/BrandsPageMobile.png';
import BrandsPageImg from 'assets/VIPLanding/BrandsPage.png';
import MarketplaceImgMobile from 'assets/VIPLanding/MarketplaceMobile.png';
import MarketplaceImg from 'assets/VIPLanding/MarketplaceImg.png';
import ThreeDWorldImgMobile from 'assets/VIPLanding/3dWorldMobile.png';
import ThreeDWorldImg from 'assets/VIPLanding/3dWorldImg.png';
import { AboutTileProps } from '../index';
import { useMediaQuery } from '@material-ui/core';

const TileImg = ({ category }) => {
  const matchesMobile = useMediaQuery('(max-width:640px)', { noSsr: true });

  const brandsImg = matchesMobile ? BrandsPageImgMobile : BrandsPageImg;
  const marketplaceImg = matchesMobile ? MarketplaceImgMobile : MarketplaceImg;
  const threeDImg = matchesMobile ? ThreeDWorldImgMobile : ThreeDWorldImg;

  return (
    <>
      {category === 'Products' && (
        <S.ImgContainer>
          <S.Img src={brandsImg} />
        </S.ImgContainer>
      )}
      {category === 'Marketplace' && (
        <S.ImgContainer>
          <S.Img src={marketplaceImg} />
        </S.ImgContainer>
      )}
      {category === '3d Worlds' && (
        <S.ImgContainer>
          <S.Img src={threeDImg} />
        </S.ImgContainer>
      )}
    </>
  );
};

const AboutTile = ({ title, description, category }: AboutTileProps) => {
  const matchesMobile = useMediaQuery('(max-width:640px)', { noSsr: true });

  return (
    <S.Container>
      {!matchesMobile && <TileImg category={category} />}
      <S.Category>{category}</S.Category>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      {matchesMobile && <TileImg category={category} />}
    </S.Container>
  );
};

export default AboutTile;
