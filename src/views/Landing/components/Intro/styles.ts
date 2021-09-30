import styled from 'styled-components/macro';

export const Container = styled.div`
  background: black;
  padding: 0px 80px 40px 80px;
  max-width: 1440px;
  margin: auto;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p<{ color: string }>`
  margin: 0;
  font-size: 54px;
  font-weight: 600;
  color: ${(props) => `${props.color}`};
  text-align: center;
  @media screen and (max-width: 640px) {
    font-size: 36px;
  }
`;

export const SubText = styled.p`
  font-size: 16px;
  color: #7c7c7c;
`;
