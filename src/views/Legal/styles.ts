import styled from 'styled-components';

export const Container = styled.div`
  padding: 48px 80px 48px 80px;
  min-height: calc(100vh - 205px);
  width: 100%;
`;

export const HelpContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const HelpColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  padding-left: 50px;
`;

export const Header = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: black;
  padding-top: 48px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgb(235, 235, 235);
`;

export const SubTitle = styled.div`
  margin-top: 40px;
  font-size: 16px;
  color: rgb(158, 158, 158);
  font-weight: 600;
  a {
    margin-right: 5px;
  }
`;
