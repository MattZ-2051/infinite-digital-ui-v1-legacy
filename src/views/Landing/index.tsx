import Hero from './Hero';
import FeatureProducts from './FeatureProducts';
import FeatureBoxes from './FeatureBoxes';
import LatestProducts from './LatestProducts';

export interface IProps {}

const Landing: React.FC<IProps> = () => {
  return (
    <main>
      <Hero />
      <FeatureBoxes />
      <FeatureProducts />
      <LatestProducts />
    </main>
  );
};

export default Landing;
