import styled from 'styled-components/macro';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export const SearchBarContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 9px 12px;
`;

export const SearchBarInput = styled.input`
  width: 100%;
  color: white;
  border: none;
  background-color: transparent;
  font-size: 16px;
  line-height: 20px;
  margin-left: 20px;
  &:focus {
    outline: none;
  }
`;

export const ContainerInputImg = styled.div`
  display: flex;
  flex: 2;
`;

export const ContainerSort = styled.span`
  color: #9e9e9e;
  font-weight: 500;
  font-size: 18px;
`;

export const SerialLabel = styled.span`
  font-size: 18px;
  font-weight: normal;
`;

export const CustomCheckBox = styled(Checkbox)`
  .Mui-checked {
    color: white;
  }
  .MuiIconButton-label {
    color: #7c7c7c;
  }
  &.MuiIconButton-colorSecondary:hover {
    background-color: transparent;
  }
  &.MuiCheckbox-colorSecondary.Mui-checked {
    color: transparent;
  }

  .Mui-checked:hover {
    border: none;
    background: transparent;
  }
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerCheckBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Label = styled.div`
  width: 120px;
  color: #9e9e9e;
  font-size: 18px;
  line-height: 23px;
`;

export const Dropdown = styled(Select)`
  width: 100%;
`;

export const ArrowDown = styled(KeyboardArrowDownIcon)`
  color: white;
`;

export const ArrowUp = styled(KeyboardArrowUpIcon)`
  color: white;
`;
