import styled from 'styled-components/macro';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Select from '@material-ui/core/Select';

export const FormContainer = styled.div`
  padding-top: 25px;
  transition-timing-function: ease-in;
  transition: 0.5s;
`;

export const InputContainer = styled.div`
  max-height: 27vh;
  overflow: auto;
  width: 100%;
  z-index: 1;
  right: 0;
`;

export const DropDown = styled(Select)`
  width: 100%;
  z-index: 9000 !important;
`;

export const FormRow = styled.div`
  padding-top: 12px;
  z-index: 9000 !important;
`;

export const FormInput = styled(TextField)`
  & .Mui-focused {
    color: black;
  }

  .MuiInput-underline:after {
    border-bottom: 2px solid black;
  }
`;

export const DisclaimerText = styled.p`
  margin: 0;
  font-size: 12px;
  padding-top: 24px;
  padding-bottom: 11px;
  color: #9e9e9e;
  text-align: center;
  font-weight: 400;
`;
export const Dropdown = styled.div<{ isOpen: boolean }>`
  color: ${({ isOpen }) => (isOpen ? 'black' : '#7d7d7d')};
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: ${({ isOpen }) =>
    isOpen ? '2px solid black' : '2px solid #ebebeb'};

  align-items: center;
  padding: 10px 0;
  :hover {
    color: black;
    cursor: pointer;
    border-bottom: 2px solid black;
  }
  :hover .arrow {
    color: black;
  }
`;

export const ArrowDown = styled(KeyboardArrowDownIcon)`
  color: #7d7d7d;
`;

export const ArrowUp = styled(KeyboardArrowUpIcon)`
  color: #7d7d7d;
`;

export const Button = styled.button`
  border: none;
  border-radius: 35px;
  background-color: black;
  width: 330px;
  height: 56px;
  font-size: 20px;
  color: white;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
