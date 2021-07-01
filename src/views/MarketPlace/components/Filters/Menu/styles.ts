import styled from 'styled-components/macro';

export const ButtonFilters = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 24px;
  small {
    font-size: 16px;
  }
`;

export const Li = styled.li`
  padding: 8px 0px;
`;

export const Button = styled.button`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  border: none;
  color: #9e9e9e;
  background-color: transparent;
  :focus {
    outline: none;
    color: black;
  }
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  padding: 0;
`;

export const TotalFilter = styled.span`
  font-size: 16px;
  line-height: 20px;
  color: #9e9e9e;
`;