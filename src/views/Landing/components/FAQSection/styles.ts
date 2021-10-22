import styled from 'styled-components/macro';
export const MainContainer = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  padding-bottom: 20rem;
  padding-top: 6rem;
  @media screen and (max-width: 960px) {
    width: 100%;
    padding-left: 1.63rem;
    padding-right: 1.63rem;
    padding-bottom: 3.25rem;
    padding-top: 3rem;
  }
`;

export const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  color: white;
  font-size: 48px;
  font-family: 'PlusJakartaSans';
  font-weight: 600;
  line-height: 56px;
  text-align: center;
  @media screen and (max-width: 960px) {
    font-size: 32px;
    line-height: 44px;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
`;

export const CollapsibleContainer = styled.div`
  margin-top: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: solid 1px;
  @media screen and (max-width: 960px) {
    margin-top: 29px;
  }
`;

export const ButtonText = styled.div`
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-family: 'PlusJakartaSans';
  font-weight: 600;
  line-height: 13px;
  text-align: center;
`;

export const Button = styled.div`
  cursor: pointer;
  margin-top: 25px;
  width: 200px;
  height: 48px;
  border-radius: 30px;
  border: 1px solid;
  border-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: #ddf874;
    border-color: #ddf874;
  }
  &:hover ${ButtonText} {
    color: black;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;
    margin-top: 13px;
  }
`;
