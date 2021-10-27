import styled from 'styled-components/macro';

export const Container = styled.div`
  max-width: 23.75rem;
  @media screen and (max-width: 1140px) {
    padding: 1.5rem 1.25rem;
  }
`;

export const ImgContainer = styled.div`
  position: relative;
  @media screen and (max-width: 640px) {
    padding-top: 1.5rem;
  }
`;

export const ShoImg = styled.img`
  position: absolute;
  left: 8%;
`;

export const Img = styled.img`
  width: 100%;
  height: auto;
`;

export const Title = styled.p`
  margin: 0;
  font-size: 24px;
  color: white;
  font-weight: 400;
  padding: 1rem 0;
`;

export const Description = styled.p`
  margin: 0;
  color: #7c7c7c;
  font-size: 16px;
  font-weight: 400;
`;

export const Category = styled.p`
  font-size: 16px;
  color: #9da1a8;
  font-weight: 700;
  margin: 0;
  padding: 1rem 0;
`;
