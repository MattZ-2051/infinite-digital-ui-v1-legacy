import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 75% 13% 12%;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  padding: 20px 0;
`;

export const TransactionDetail = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const TransactionDescription = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #9e9e9e;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Bold = styled.span`
  font-weight: 600;
  padding: 0 5px;
  color: black;
`;

export const Color = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: 600;
`;

export const Icon = styled.img`
  padding-right: 24px;
`;

export const Date = styled.span`
  color: #9e9e9e;
`;

export const Link = styled(NavLink)`
  padding: 0 5px;
`;
