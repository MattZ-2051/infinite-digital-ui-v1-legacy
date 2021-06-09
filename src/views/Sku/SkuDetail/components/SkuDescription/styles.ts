import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 62%;
  margin-bottom: 50px;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const Description = styled.div`
  padding-top: 24px;
  color: #9e9e9e;
  font-size: 15px;
  margin: 0;

  h3 {
    font-size: 16px;
    color: black;
  }

  .sale-opens {
    color: #06bc4c;
  }

  .sale-closes {
    color: #da1111;
  }

  ul {
    padding-left: 20px;
  }

  a {
    font-weight: 400;
  }
`;

export const Hedera = styled.div`
  width: 100%;
  padding: 12px 24px;
  margin-top: 24px;
  background: #f4f4f4;
  border-radius: 26px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    margin-right: 8px;
    display: flex;
    align-items: center;
  }
  svg {
    fill: white;
  }
  span {
    vertical-align: super;
  }
  a {
    float: right;
    font-weight: normal;
    text-decoration: none;
    color: #9e9e9e;
  }
`;

export const IconContainer = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: #2e2e2e;
  border-radius: 50%;
`;

export const DivContainer = styled.div``;
