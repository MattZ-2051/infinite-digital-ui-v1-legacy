import styled from 'styled-components/macro';

export const Container = styled.div`
  height: 88px;
  width: calc(100% - 80px);
  background-color: #303030;
  margin-right: 80px;
  margin-bottom: 32px;
  border-radius: 16px;
  @media screen and (max-width: 900px) {
    height: 100%;
    width: 100%;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: space-between;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  @media screen and (max-width: 900px) {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-column-gap: 10px;
    padding: 16px 24px;
    grid-auto-flow: column;
  }
`;
