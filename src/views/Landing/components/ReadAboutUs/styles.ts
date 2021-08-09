import styled from 'styled-components/macro';

export const MainContainer = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  padding-bottom: 300px;
  padding-top: 277px;
  font-family: 'PlusJakartaSans';
  padding-left:20px;
  padding-right:20px;
  @media screen and (max-width: 960px) {
    padding-top=320px;
    padding-bottom:320px;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 342px;
    padding-top: 316px;
  }
`;

export const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  color: white;
  justify-content: space-between;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 56px;
`;

export const WhatsNew = styled.div`
  color: #9da1ab;
  font-weight: 700;
  font-size: 18px;
  line-height: 32px;
  margin-bottom: 18px;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 48px;
  line-height: 56px;
  margin-bottom: 24px;
`;

export const SubTitle = styled.div`
  color: #9da1ab;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  max-width: 464px;
`;

export const RightColumn = styled.div`
  @media screen and (min-width: 961px) {
    margin-left: 10px;
  }
  width: 80%;
  max-width: 764px;
`;
