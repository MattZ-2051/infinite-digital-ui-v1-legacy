import * as S from './styles';
import BrandsPageImg from 'assets/VIPLanding/BrandsPageMobile.png';
import MarketplaceImg from 'assets/VIPLanding/MarketplaceMobile.png';
import ThreeDWorldImg from 'assets/VIPLanding/3dWorldMobile.png';
import { AboutTileProps } from '../index';
import { useMediaQuery } from '@material-ui/core';

const TileImg = ({ category }) => {
  return (
    <>
      {category === 'Products' && (
        <S.ImgContainer>
          <S.Img src={BrandsPageImg} />
        </S.ImgContainer>
      )}
      {category === 'Marketplace' && (
        <S.ImgContainer>
          <S.Img src={MarketplaceImg} />
        </S.ImgContainer>
      )}
      {category === '3d Worlds' && (
        <S.ImgContainer>
          <S.Img src={ThreeDWorldImg} />
        </S.ImgContainer>
      )}
    </>
  );
};

const AboutTile = ({ title, description, category }: AboutTileProps) => {
  return (
    <S.Container>
      <TileImg category={category} />
      <S.Category>{category}</S.Category>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Container>
  );
};

export default AboutTile;
