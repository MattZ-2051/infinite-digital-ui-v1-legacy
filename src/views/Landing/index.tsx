import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// Local
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { getListingsThunk } from 'store/listing/listingThunks';
// Components
import Hero from './Hero';
import FeatureProducts from './FeatureProducts';
import FeatureBoxes from './FeatureBoxes';
import LatestProducts from './LatestProducts';

export interface IProps {}

const Landing: React.FC<IProps> = () => {
  const { getAccessTokenSilently } = useAuth0();
  const listing = useAppSelector((state) => state.listings).listings;
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      // const token = await getAccessTokenSilently();
      dispatch(getListingsThunk({ token: '' }));
    })();
  }, [dispatch, getAccessTokenSilently]);

  return (
    <main>
      <Hero />
      <FeatureBoxes />
      <FeatureProducts listing={listing} />
      <LatestProducts />
    </main>
  );
};

export default Landing;
