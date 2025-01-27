import styled from 'styled-components/macro';

export const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 48px 80px 48px 80px;
  min-height: 100vh;

  @media screen and (max-width: 600px) {
    padding: 48px 24px 48px 24px;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  @media screen and (max-width: 1140px) {
    flex-direction: column;
  }
`;

export const Main = styled.main`
  display: flex;
`;

export const Content = styled.section`
  width: 100%;
  @media screen and (max-width: 1140px) {
    width: 100%;
  }
`;

export const Sidebar = styled.aside`
  width: 300px;
  min-width: 300px;
  margin-right: 24px;

  @media screen and (max-width: 1140px) {
    display: none;
  }
`;

export const ToggleFilter = styled.div`
  display: none;
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #dadada;
  }

  @media screen and (max-width: 1140px) {
    display: block;
    margin: 10px 0 10px 0;
    display: flex;
  }
`;

export const ProductsGrid = styled.div`
  margin: auto;
  display: grid;
  grid-gap: 26px;
  grid-template-columns: repeat(auto-fit, 300px);
  margin-top: 20px;
  // justify-content: center;
  @media screen and (max-width: 1140px) {
    justify-content: center;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  @media screen and (max-width: 960px) {
    justify-content: center;
  }
`;

export const NoResults = styled.div`
  padding: 0 80px 0 80px;
`;
