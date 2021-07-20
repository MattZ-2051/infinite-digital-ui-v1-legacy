import React, { useState, useEffect, useCallback } from 'react';
import OwnerAccessList from './assetList';
import { getPrivateAssets } from 'services/api/productService';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useAuth0 } from '@auth0/auth0-react';
import * as S from './styles';

interface IProps {
  skuId: string;
  productId: string;
  themeStyle: 'light' | 'dark';
  owner: boolean;
}

const CURRENT_PAGE = 1;
const PER_PAGE = 5;

const OwnerAccess = ({ skuId, productId, themeStyle, owner }: IProps) => {
  const [valueCurrentPage, setCurrentPage] = useState<number>(CURRENT_PAGE);
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const [privateAssets, setPrivateAssets] = useState<any>([]);
  const { getAccessTokenSilently } = useAuth0();

  const changePageCallback = useCallback(
    (ev, page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  useEffect(() => {
    const fetchData = async () => {
      getPrivateAssets(skuId, valueCurrentPage, PER_PAGE).then((resp) =>
        setPrivateAssets(resp)
      );
    };
    fetchData();
  }, [skuId, valueCurrentPage, PER_PAGE]);
  return privateAssets?.data?.length > 0 ? (
    <>
      <OwnerAccessList
        assets={privateAssets.data || []}
        owner={owner}
        productId={productId}
        themeStyle={themeStyle}
      />

      {privateAssets?.data?.length >= PER_PAGE && (
        <S.PaginationContainer>
          <S.CustomPagination
            count={Math.ceil(privateAssets?.total / PER_PAGE)}
            page={valueCurrentPage}
            onChange={changePageCallback}
            siblingCount={matchesMobile ? 0 : 1}
            // style={{ color: 'white' }}
            themeStyle={themeStyle}
          />
        </S.PaginationContainer>
      )}
    </>
  ) : null;
};

export default OwnerAccess;
