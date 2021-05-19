import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
// Icons
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export interface IProps {
  to?: string;
  label?: string;
  [rest: string]: any;
}

const CircularButton = ({ to = '/', label, ...rest }: IProps) => {
  return (
    <StyledLink to={to} {...rest}>
      {label}
      <CircleContainer>
        <ArrowForwardIosIcon />
      </CircleContainer>
    </StyledLink>
  );
};

const CircleContainer = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: black;
  border-radius: 50%;
  transition: 0.4s;

  .MuiSvgIcon-root {
    font-size: 12px;
  }
`;

const StyledLink = styled(Link)`
  transition: 0.4s;
  text-decoration: none;
  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 10px;

  &:hover {
    color: var(--grey-40);

    ${CircleContainer} {
      background-color: var(--grey-40);
    }
  }
`;

export default CircularButton;
