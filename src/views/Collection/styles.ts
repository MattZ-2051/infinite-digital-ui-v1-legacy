import styled from 'styled-components/macro';

export const Container = styled.div`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-right: 2.5rem;
  @media screen and (max-width: 960px) {
    margin-right: 0;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  @media screen and (min-height: 1920px) {
    min-height: ${() => window.innerHeight - 128}px;
  }
  /* NOTE: This is setting children to black. Might need a more elegant way */
  > * {
    background-color: black;
    color: white;
  }
`;

export const ContainerMarginLeft = styled.div`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-left: 2.5rem;
  @media screen and (max-width: 960px) {
    margin-left: 0;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  /* NOTE: This is setting children to black. Might need a more elegant way */
  > * {
    background-color: black;
    color: white;
  }
`;

export const ContainerMarginRight = styled.div`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-right: 2.5rem;
  @media screen and (max-width: 960px) {
    margin-right: 0;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  /* NOTE: This is setting children to black. Might need a more elegant way */
  > * {
    background-color: black;
    color: white;
  }
`;

export const BasicInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NotifyIconImg = styled.img`
  margin-right: 8px;
  vertical-align: middle;
`;
