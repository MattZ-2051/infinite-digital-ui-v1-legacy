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
