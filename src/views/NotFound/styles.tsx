import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 162px);
  background-color: #000;
  a {
    text-decoration: none;
  }

  @media screen and (max-width: 600px) {
    padding: 48px 24px 48px 24px;
  }
`;

export const Header = styled.span`
  font-size: 56px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  line-height: 70px;
`;

export const ColoredHeader = styled(Header)`
  background: linear-gradient(#40c9ff, #e81cff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const SubTitle = styled.div`
  font-size: 18px;
  color: #8e8e8e;
  text-align: center;
  max-width: 458px;
  margin-top: 16px;
  margin-bottom: 32px;
  line-height: 32px;
`;
