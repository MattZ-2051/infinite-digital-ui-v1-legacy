import Hero from './Hero';
import FeatureProducts from './FeatureProducts';
import FeatureBoxes from './FeatureBoxes';
import LatestProducts from './LatestProducts';
import { useAppDispatch } from 'hooks/store';

import { getProducts } from 'store/product/productThunks';
import { useAuth0 } from '@auth0/auth0-react';

export interface IProps {}

const Landing: React.FC<IProps> = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  const send = async () => {
    const token = await getAccessTokenSilently();
    dispatch(getProducts({ token: token }));
  };

  return (
    <main>
      <button onClick={send}>Enviar</button>

      <Hero />
      <FeatureBoxes />
      <FeatureProducts />
      <LatestProducts />
    </main>
  );
};

export default Landing;
