import styled from 'styled-components/macro';

export const MainContainer = styled.div`
  background-color: #ddf874;
  padding: 120px 80px 144px 80px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 1250px) {
    padding: 150px 0px 88px 0px;
  }
`;

export const Container = styled.div`
  align-self: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1440px;
  @media screen and (max-width: 1250px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export const MainTitle = styled.div`
  font-size: 64px;
  text-align: center;
  font-family: 'PlusJakartaSans';
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 74px;
  @media screen and (max-width: 1250px) {
    font-size: 34px;
    line-height: 44px;
  }
`;

export const MainText = styled.div`
  font-family: 'PlusJakartaSans';
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  line-height: 28px;
  @media screen and (max-width: 1250px) {
    margin-bottom: 78px;
    line-height: 26px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 62px;
  @media screen and (max-width: 1250px) {
    margin-bottom: 64px;
  }
`;

export const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  @media screen and (max-width: 1250px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
export const ColumnTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
  max-width: 408px;
  text-align: center;
  border-bottom: solid 2px;
  padding-bottom: 16px;
  margin-bottom: 24px;
  line-height: 40px;
  @media screen and (max-width: 1250px) {
    line-height: 32px;
    margin-bottom: 16px;
    font-size: 22px;
    width: 366px;
  }
  @media screen and (max-width: 600px) {
    line-height: 32px;
    margin-bottom: 16px;
    font-size: 22px;
    width: 100%;
  }
`;
export const ColumnText = styled.div`
  font-family: 'PlusJakartaSans';
  line-height: 26px;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  max-width: 400px;
  @media screen and (max-width: 1250px) {
    margin-bottom: 74px;
  }
`;
