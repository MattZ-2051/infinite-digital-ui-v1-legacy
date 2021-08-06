import React from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'components/Collpasible';
import SkuClaimTile from './skuClaimTile';
import { useHistory } from 'react-router-dom';
import { Sku } from 'entities/sku';
import PageLoader from 'components/PageLoader';
import * as S from './styles';
import { HowItWorksCollapsible } from './howItWorksCollapsible';
import { useMediaQuery } from '@material-ui/core';

interface IProps {
  userClaims: Sku[] | undefined;
  themeStyle: 'light' | 'dark';
  onChangeClaim: (
    claimId: any,
    { newDigitailProductId, newSerialNumber }: any
  ) => void;
  loading: boolean;
}

const Claims = ({ themeStyle, userClaims, onChangeClaim, loading }: IProps) => {
  const matchesMobile = useMediaQuery('(max-width:960px)', { noSsr: true });
  const history = useHistory();
  const collapsibleBody = (
    <div>
      <S.Text>
        In order to claim digital NFTs of INFINITE tagged products you must
      </S.Text>
      <div>
        <ul>
          <S.Li>
            Own an INFINITE tagged physical product that offers a digital NFT
            claim.
          </S.Li>
          <S.Li>
            Have your{' '}
            <S.Link themeStyle={themeStyle} href="https://getinfinite.io">
              INFINITE iOS app
            </S.Link>{' '}
            account linked to the same email as your marketplace account.
          </S.Li>
          <S.Li>Have not yet claimed a digital NFT for the product.</S.Li>
        </ul>
        <S.Text>
          Learn more about the process{' '}
          <S.Link
            themeStyle={themeStyle}
            onClick={() => {
              window.open(
                'https://support.suku.world/infinite/claiming-a-product',
                '_blank'
              );
            }}
          >
            here
          </S.Link>
          .
        </S.Text>
      </div>
    </div>
  );
  if (loading)
    return (
      <PageLoader
        color={themeStyle === 'dark' ? 'white' : 'black'}
        backGroundColor={themeStyle === 'dark' ? 'black' : 'white'}
      />
    );

  return (
    <div>
      <Grid container spacing={3}>
        {!matchesMobile && (
          <Grid item xs={12} sm={3}>
            <HowItWorksCollapsible themeStyle={themeStyle} open={true} />
          </Grid>
        )}
        {userClaims && userClaims.length > 0 ? (
          <Grid item xs={12} sm={9}>
            <S.Container>
              {userClaims.map((sku: Sku, index) => {
                return (
                  <S.TileContainer key={sku._id} index={index}>
                    <SkuClaimTile
                      sku={sku}
                      themeStyle={themeStyle}
                      onChangeClaim={onChangeClaim}
                    />
                  </S.TileContainer>
                );
              })}
            </S.Container>
          </Grid>
        ) : (
          <S.NoClaimableItems>
            <S.Text style={{ color: '#9e9e9e', minHeight: '40vh' }}>
              No Claimable NFTs.
            </S.Text>
          </S.NoClaimableItems>
        )}
      </Grid>
    </div>
  );
};

export default Claims;
