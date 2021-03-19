import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// Local
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { getListingsThunk } from 'store/listing/listingThunks';
// Components
import Hero from './Hero';
import FeatureProducts from './Featured/FeatureProducts';
import FeatureBoxes from './Featured/FeatureBoxes';
import LatestProducts from './LatestProducts';

import { getProducts } from 'store/product/productThunks';
import { getDropBoxesThunk } from 'store/dropBox/dropBoxThunks';
import { useSelector } from 'react-redux';

export interface IProps {
}


export const listingSelector = (state) => state.listings.listings;
export const dropBoxSelector = (state) => state.dropBoxes.dropBoxes;

const Landing: React.FC<IProps> = () => {
  const { getAccessTokenSilently } = useAuth0();
  // const listing = useAppSelector((state) => state.listings).listings;
  const dispatch = useAppDispatch();
  const listings = useSelector(listingSelector);
  const dropBoxes = useSelector(dropBoxSelector);

  const send = async () => {
    const token = await getAccessTokenSilently();
    dispatch(getProducts({ token: token }));
  };
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  useEffect(() => {
    (async () => {
      // const token = await getAccessTokenSilently();
      dispatch(getListingsThunk({ token: '' }));
      dispatch(getDropBoxesThunk({ token: '' }))
    })();
  }, [dispatch, getAccessTokenSilently]);

  return (
    <main>
      <Hero isAuthenticated={isAuthenticated} login={loginWithRedirect} />
      <FeatureBoxes />
      <FeatureProducts />
      <LatestProducts dropBoxArr={dropBoxes} listingsArr={listings} />
    </main>
  );
};

export default Landing;
