import styled from 'styled-components/macro';
export interface IProps {}

const FeatureBoxes: React.FC<IProps> = () => {
  return (
    <Container>
      <h2>FeatureBoxes</h2>
    </Container>
  );
};

const Container = styled.section`
  padding: 0 0 0 0;
  height: 720px;
`;

export default FeatureBoxes;