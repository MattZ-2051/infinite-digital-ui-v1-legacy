import styled from 'styled-components/macro';
import Button from 'components/Button';
import bg from 'assets/img/backgrounds/hero-bg3.jpeg';

export interface IProps {}

const FeatureProducts: React.FC<IProps> = () => {
  return (
    <Container>
      <Content>
        <h5>MARKETPLACE FEATURE</h5>
        <div>SKU: 3319SE</div>

        <h2>ADIDAS Kaptir</h2>
        <h3>Super Fire (Black)</h3>
        <p>2 listings for sale</p>
        <p> Listings from $900 to $1,200</p>

        <Button type="button" color="white">
          Get yours now
        </Button>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 80px 0 80px;
  height: 720px;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-color: #000000;
`;

const Content = styled.div`
  display: inline-grid;
  grid-gap: 10px;
  height: auto;
  font-weight: 600;
  color: white;

  p {
    margin: 0;
  }
`;

export default FeatureProducts;
