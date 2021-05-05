import styled from 'styled-components/macro';

export const Container = styled.div`
  background-color: #1a1a1a;
`;

export const Content = styled.div`
  margin: auto;
  max-width: 1440px;
  height: 100vh;
  background-color: #1a1a1a;
  color: white;
  display: grid;
  padding-left: 80px;
  grid-template-columns: 480px 1fr;

  @media screen and (max-width: 1160px) {
    height: auto;
    display: flex;
    flex-direction: column;
    height: auto;
    padding-left: 0px;
  }
`;
