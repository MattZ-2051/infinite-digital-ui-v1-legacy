import styled from 'styled-components/macro';
export interface IProps {}

const LatestProducts: React.FC<IProps> = () => {
  return (
    <Container>
      <h2>LatestProducts</h2>
    </Container>
  );
};

const Container = styled.section`
  padding: 0 0 0 0;
`;

export default LatestProducts;
