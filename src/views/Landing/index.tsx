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

export interface IProps {}

const Landing: React.FC<IProps> = () => {
  const { getAccessTokenSilently } = useAuth0();
  // const listing = useAppSelector((state) => state.listings).listings;
  const dispatch = useAppDispatch();

  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  useEffect(() => {
    (async () => {
      // const token = await getAccessTokenSilently();
      dispatch(getListingsThunk({ token: '' }));
    })();
  }, [dispatch, getAccessTokenSilently]);

  return (
    <main>
      <Hero isAuthenticated={isAuthenticated} login={loginWithRedirect} />
      <FeatureBoxes />
      <FeatureProducts />
      <LatestProducts />
    </main>
  );
};

export default Landing;
