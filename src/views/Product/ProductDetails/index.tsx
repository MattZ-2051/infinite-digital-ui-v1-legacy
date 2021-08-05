import { Sku } from 'entities/sku';
import { ProductWithFunctions } from 'entities/product';
import ImageGallery from 'components/ImageGallery';
import Rarity from 'components/Rarity';
import { useAppSelector } from 'store/hooks';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import * as S from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { SkuCounter } from 'views/Sku/SkuDetail/components/SkuCounter/skuCounter';
import { ReactComponent as hederaIcon } from 'assets/svg/logos/hedera.svg';
import SvgIcon from '@material-ui/core/SvgIcon';

const HederaIcon = () => (
  <SvgIcon viewBox="-7 -7 25 27" component={hederaIcon} />
);

interface Props {
  sku: Sku;
  totalSupply: number;
  circulatingSupply: number;
  redeemable: boolean;
  skuTokenId: string | undefined;
  explorerLink: string | undefined;
  serialNumber?: string;
}

const ProductDetails = ({
  sku,
  totalSupply,
  circulatingSupply,
  redeemable,
  skuTokenId = undefined,
  explorerLink = undefined,
  serialNumber,
}: Props) => {
  //TODO: add backend changes for sku series name and series name for series
  const loggedInUser = useAppSelector((state) => state.session.user);
  const history = useHistory();
  const { isAuthenticated } = useAuth0();
  const [descriptionVisible, setDescriptionVisible] = useState<boolean>(false);
  const handleRedirectToSkuPage = () => {
    history.push(`/marketplace/${sku?._id}`);
  };
  const skuIsVariable = sku?.supplyType === 'variable';
  const theme = useTheme();
  const isSmall: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
  };

  return (
    <S.Container style={{ height: 'auto' }}>
      <ImageGallery
        nftPublicAsset={sku?.nftPublicAssets}
        width="479px"
        height="473px"
      />
      <S.Body>
        <S.Flex justifyContent="space-between" alignItems="center">
          <S.Issuer>{sku?.issuerName}</S.Issuer>
          <Rarity type={sku?.rarity} />
        </S.Flex>
        <S.SkuName>{sku?.name}</S.SkuName>
        <S.Flex alignItems="flex-end">
          {redeemable && (
            <S.Flex alignItems="baseline">
              <S.RedeemIcon />
              <S.SkuInfo>Redeemable&nbsp;</S.SkuInfo>
              <S.SkuInfo color="#7c7c7c">/</S.SkuInfo>&nbsp;
            </S.Flex>
          )}
          {sku?.supplyType === 'fixed' && (
            <S.SkuInfo color="#7c7c7c">
              <S.ItemCountContainer>
                {serialNumber
                  ? `${serialNumber} of ${totalSupply}`
                  : `Limited to ${totalSupply} edition${
                      totalSupply > 1 && 's'
                    }.`}
              </S.ItemCountContainer>
            </S.SkuInfo>
          )}

          {sku?.supplyType === 'variable' && (
            <S.SkuInfo onClick={handleRedirectToSkuPage} hover={true}>
              <S.ItemCountContainer>
                {`${circulatingSupply} Released `}
              </S.ItemCountContainer>
            </S.SkuInfo>
          )}
          {skuTokenId && (
            <S.TokenExplorerLinkPlain>
              {skuIsVariable && '/'}
              <S.HederaIconContainer>{HederaIcon()}</S.HederaIconContainer>
              {explorerLink ? (
                <S.TokenExplorerLink target="_blank" href={explorerLink}>
                  Token {skuTokenId}
                </S.TokenExplorerLink>
              ) : (
                <>Token {skuTokenId}</>
              )}
            </S.TokenExplorerLinkPlain>
          )}
        </S.Flex>
        <S.Flex>
          <S.SkuInfo color="#7c7c7c">
            Created by{' '}
            <S.Link to={`/collection/${sku?.issuer?.username}`}>
              @{sku?.issuer?.username}
            </S.Link>
          </S.SkuInfo>
        </S.Flex>
        <S.GreyLine />
        <S.Footer>
          <S.Link to={`/marketplace/${sku?._id}`}>
            {' '}
            <S.BackArrow />
            <span>View Release Details</span>
          </S.Link>
        </S.Footer>
      </S.Body>
    </S.Container>
  );
};

export default ProductDetails;
