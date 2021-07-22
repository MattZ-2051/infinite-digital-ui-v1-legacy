import styled from 'styled-components/macro';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export const Title = styled.div<{ borderTitle?: boolean }>`
  font-size: 24px;
  font-weight: 600;
  color: black;
  padding-bottom: 16px;
  margin-bottom: 15px;
  display: flex;
  border-bottom: ${(props) => (props.borderTitle ? '2px solid #ebebeb' : '')};
  line-height: 30px;
  @media screen and (max-width: 960px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  align-items: baseline;
`;

export const Total = styled.p`
  margin: 0;
  color: #9e9e9e;
  font-size: 16px;
  font-weight: 500;
  padding-left: 12px;
`;

export const DownArrow = styled(KeyboardArrowDownIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const UpArrow = styled(KeyboardArrowUpIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const ToggleArrow = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
`;
