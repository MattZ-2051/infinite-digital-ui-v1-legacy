import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const Container = styled.section`
  padding: 40px;
  height: 100%;
  bottom: 40px;
  max-width: 1440px;
  margin: auto;
  border-radius: 10px;

  @media screen and (max-width: 960px) {
    padding: 24px;
  }
`;

export const ViewAll = styled(Link)`
  font-weight: bold;
  font-family: 'PlusJakartaSans';
  position: absolute;
  right: 0;
  top: 21px;
  text-decoration: none;
  font-size: 18px;
`;
