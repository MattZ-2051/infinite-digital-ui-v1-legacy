import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 46%;
  max-width: 713px;
  /* flex: 2; */
  margin-left: 64px;

  @media screen and (max-width: 960px) {
    margin-left: 0;
    width: 100%;
    max-width: 100%;
  }
`;

export const ViewAll = styled(Link)`
  float: right;
  text-decoration: none;
  font-size: 18px;
  margin-top: 24px;
`;

export const Items = styled.div`
  /* padding-top: 24px; */
  width: 100%;
  max-width: 713px;
  overflow: hidden;
  height: 450px;
  @media screen and (max-width: 960px) {
    margin-left: 0;
  }
`;

export const Title = styled.h2`
  font-weight: 600 !important;
  font-size: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid #ebebeb;
  margin-bottom: 20px;
  font-weight: 500px;
  color: black;
`;

export const NoOwners = styled.div`
  padding-top: 24px;
  font-size: 18px;
  color: black;
  font-weight: 500;
  padding-bottom: 20px;
  width: 100%;
`;

export const ViewAllLink = styled(Link)`
  text-align: center;
  font-weight: bold;
  color: black;
  display: block;
  margin-top: 40px;
  text-decoration: none;
`;
