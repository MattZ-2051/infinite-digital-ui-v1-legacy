import styled from 'styled-components/macro';
import Button from 'components/Button';
import bg from 'assets/img/backgrounds/hero-bg2.jpeg';
import { Link } from 'react-router-dom';

export interface IProps {}

const FeatureBoxes: React.FC<IProps> = () => {
  return (
    <Container>
      <Content>
        <h5>FEATURED INFINITE</h5>
        <h2>Gold DROP BOX</h2>
        <h3>Infinite Launch Series 1</h3>

        <p style={{ fontSize: '18px' }}>
          Only <span style={{ fontSize: '35px', fontWeight: 'bold' }}>7</span>{' '}
          left
        </p>

        <p style={{ fontSize: '24px' }}>
          Price{' '}
          <span style={{ fontSize: '45px', fontWeight: 'bold' }}>$50</span>
        </p>

        <Button type="button" color="black">
          Get yours now
        </Button>

        <p>
          Each box contains 3 products. <br />
          <Link to="/">Click Here</Link> to learn more.
        </p>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  align-items: center;
  padding: 0 80px 0 80px;
  height: 720px;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-color: white;
`;

const Content = styled.div`
  display: inline-grid;
  grid-gap: 10px;
  height: auto;
  font-weight: 600;

  p {
    margin: 0;
  }
`;

export default FeatureBoxes;
