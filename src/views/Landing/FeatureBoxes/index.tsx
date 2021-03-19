import styled from 'styled-components/macro';
import Button from 'components/Button';
import bg from 'assets/img/backgrounds/hero-bg2.jpeg';
import { Link } from 'react-router-dom';

export interface IProps {}

const FeatureBoxes: React.FC<IProps> = () => {
  return (
    <OuterContainer id="feature-products">
      <InnerContainer>
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

        <Image />

      </InnerContainer>
    </OuterContainer>
  );
};

const OuterContainer = styled.section`
  width: 100%;
  background-color: #fcfcfc;
`;

const InnerContainer = styled.div`
  height: 720px;
  max-width: 1440px;
  margin: auto;
  padding: 0 50px 0 50px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1280px) {
    padding: 0 32px 0 32px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
    height: auto;
    padding: 50px 32px 50px 32px;
  }
`;

const Content = styled.div`
  display: inline-grid;
  grid-gap: 12px;
  height: auto;
  font-weight: 600;
  min-width: 340px;

  @media screen and (max-width: 960px) {
    min-width: 280px;
    font-size: 0.85rem;
    grid-gap: 10px;
  }

  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
  }

  p {
    margin: 0;
  }
`;

const Image = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${bg});
  height: 720px;
  width: calc(100% - 340px);
  background-size: contain;
  margin-left: 25px;

  @media screen and (max-width: 960px) {
    width: calc(100% - 280px);
  }

  @media screen and (max-width: 600px) {
    height: 250px;
    width: 100%;
    margin-bottom: 30px;
  }
`;

export default FeatureBoxes;
