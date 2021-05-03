import React from 'react';
import styled from 'styled-components/macro';
import { ProductWithFunctions } from 'entities/product';
import ImageGallery from 'components/ImageGallery';
import Rarity from 'components/Rarity';
import { useAppSelector } from 'store/hooks';
import { ReactComponent as RedeemSvg } from 'assets/svg/icons/redeemable2.svg';
import { useHistory } from 'react-router-dom';
import { skuFactory } from 'store/sku/skuFactory';

interface Props {
  product: ProductWithFunctions | undefined;
}

const S: any = {};

const ProductDetails = ({ product }: Props) => {
  //TODO: add backend changes for sku series name and series name for series
  const loggedInUser = useAppSelector((state) => state.session.user);
  const history = useHistory();

  const handleRedirectToSkuPage = () => {
    history.push(`/marketplace/${product?.sku._id}`);
  };

  let redeemable = false;

  if (
    loggedInUser.id === product?.owner.id &&
    product?.sku.redeemable === true
  ) {
    redeemable = true;
  }
  return (
    <S.Container>
      {product && (
        <ImageGallery
          images={[product?.sku.graphicUrl, ...product?.sku.imageUrls]}
          height="480px"
        />
      )}
      <S.Body>
        <S.Flex justifyContent="space-between" alignItems="center">
          <S.Issuer>{product?.sku.issuerName}</S.Issuer>
          <Rarity type={product?.sku.rarity} />
        </S.Flex>
        <S.SkuName>{product?.sku.name}</S.SkuName>
        <div>
          Series <S.SkuSeries>{product?.sku.series.name}</S.SkuSeries>
        </div>
        <S.Flex>
          {redeemable && (
            <S.Flex alignItems="baseline">
              <S.RedeemIcon />
              <S.SkuInfo>Redeemable</S.SkuInfo>
              <S.SkuInfo color="#7c7c7c">/</S.SkuInfo>
            </S.Flex>
          )}
          {product?.sku.supplyType !== 'variable' && (
            <S.SkuInfo color="#7c7c7c">
              {product?.listing.supply} released
            </S.SkuInfo>
          )}

          <S.SkuInfo onClick={handleRedirectToSkuPage} hover={true}>
            (See All)
          </S.SkuInfo>
        </S.Flex>
        <S.Description>Description</S.Description>
        <S.GreyLine></S.GreyLine>
        <S.DescriptionText>{product?.sku.description}</S.DescriptionText>
      </S.Body>
    </S.Container>
  );
};

S.Body = styled.div`
  color: black;
  padding: 34px;
`;

S.Container = styled.div`
  background-color: white;
  overflow: auto;
`;

S.Description = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  padding-top: 32px;
`;

S.SkuSeries = styled.span`
  font-size: 18px;
`;

S.RedeemIcon = styled(RedeemSvg)`
  margin-right: 10px;
`;

S.SkuName = styled.p`
  font-size: 48px;
  font-weight: 600;
  margin: 0;
  padding: 16px 0;
`;

S.SkuInfo = styled.span<{ color: string; hover?: boolean }>`
  font-size: 16px;
  color: ${(props) => `${props.color}`};
  padding-right: 10px;
  margin: 0;
  padding-top: 16px;
  ${(props) =>
    props.hover
      ? `:hover {
    cursor: pointer;
    border-bottom: 1px solid black;
    transform: scale(1.1);
  }`
      : ``};
`;

S.Issuer = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #7c7c7c;
`;

S.Flex = styled.div<{ justifyContent: string; alignItems: string }>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

S.GreyLine = styled.div`
  border-bottom: 2px solid #ebebeb;
  width: 100%;
  padding-top: 16px;
`;

S.DescriptionText = styled.p`
  padding-top: 24px;
  color: #9e9e9e;
  font-size: 16px;
  margin: 0;
`;

export default ProductDetails;
