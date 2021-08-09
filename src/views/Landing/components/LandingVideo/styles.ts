import styled from 'styled-components/macro';

export const Container = styled.section`
  max-width: 1440px;
  padding: 100px 80px 0px 80px;
  background-color: black;

  h6 {
  }
`;

export const Header = styled.h3`
  color: white;
  font-size: 64px;
  font-weight: 600;
  text-align: center;
`;

export const SubHeader = styled.h6`
  color: #9da1a8;
  font-size: 16px;
  text-align: center;
  font-weight: 400;
  padding-top: 32px;
`;

export const Button = styled.button<{ width: string }>`
  width: ${(props) => `${props.width}`};
  height: 48px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  background-color: black;
  border: 1px solid #3a3a3a;
  border-radius: 35px;
  :focus {
    outline: none;
    border: none;
  }
  :hover {
    cursor: pointer;
    background-color: #ddf874;
    color: black;
  }
`;
