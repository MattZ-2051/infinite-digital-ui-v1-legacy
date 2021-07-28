import React from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'components/Collpasible';
import SkuClaimTile from './skuClaimTile';
import { useHistory } from 'react-router-dom';
import { Sku } from 'entities/sku';
import PageLoader from 'components/PageLoader';
import * as S from './styles';

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
              INFINITEiOSapp
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
              history.push('/help');
            }}
          >
            here
          </S.Link>
          .
        </S.Text>
      </div>
    </div>
  );
  return !loading ? (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Collapsible
            title="How it works?"
            body={collapsibleBody}
            breakPointSize="xs"
            borderTitle={true}
            themeStyle={themeStyle}
          />
        </Grid>
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
  ) : (
    <PageLoader
      color={themeStyle === 'dark' ? 'white' : 'black'}
      backGroundColor={themeStyle === 'dark' ? 'black' : 'white'}
    />
  );
};

export default Claims;
