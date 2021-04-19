import styled from 'styled-components/macro';

export interface IProps {}

const SquircleContainer: React.FC<IProps> = () => {
  return (
    <>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
          <path
            fill="red"
            stroke="none"
            d="
            M 0,0.5 
            C 0,0 0,0 0.5,0 
            S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"
          />
        </clipPath>
      </svg>

      <Container>
        
      </Container>
    </>
  );
};

const Container = styled.div`
  clip-path: url(#squircleClip);
  background-color: #703ce9;
  width: 200px;
  height: 200px;
  position: absolute;
  left: 60%;
  top: 20%;
  z-index: 15000;
`;

export default SquircleContainer;
