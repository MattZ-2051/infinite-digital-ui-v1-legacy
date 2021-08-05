import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';

export const InputDiv = styled.div`
  padding-bottom: 2px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  @media screen and (min-width: 960px) {
    margin-right: 32px;
    width: 280px;
  }
  @media screen and (max-width: 960px) {
    height: 40px;
    width: 100%;
    background-color: #efefef;
    border-radius: 30px;
  }
`;

export const Input = styled.input<{ theme: 'dark' | 'light' }>`
  border: none;
  outline: none;
  height: 40px;
  text-indent: 15px;
  background-color: initial;
  color: ${(props) => (props.theme == 'light' ? 'black' : 'white')};
  width: inherit;
  margin-left: 7px;
  @media screen and (max-width: 960px) {
    height: 20px;
    background-color: #efefef;
    color: black;
    border-radius: 30px;
  }
`;

export const Clear = styled(ClearIcon)`
  width: 20px;
  margin-right: 20px;
  color: #9da1a8;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
