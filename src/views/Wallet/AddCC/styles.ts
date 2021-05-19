import styled from 'styled-components/macro';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Select from '@material-ui/core/Select';

export const S: any = {};

S.Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 80vh;
margin: auto
z-index: 1;
overflow: auto;
`;

S.HeaderContainer = styled.div`
  padding-bottom: 10px;
`;

S.ButtonContainer = styled.div`
  padding-top: 16px;
  padding-bottom: 40px;
`;

S.EnterDetailsText = styled.span`
  color: #7d7d7d;
  font-size: 16px;
  padding-top: 10px;
`;

S.Div = styled.div`
  padding-bottom: 40px;
`;

S.ExitIcon = styled.img`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

S.FormInputError = styled(TextField)`
  color: red;
  & .Mui-focused {
    color: black;
  }

  .MuiInput-underline:after {
    border-bottom: 2px solid red;
  }
`;

S.DropDown = styled(Select)`
  width: 100%;
`;

S.FormInput = styled(TextField)`
  & .Mui-focused {
    color: black;
  }

  .MuiInput-underline:after {
    border-bottom: 2px solid black;
  }
`;

S.Dropdown = styled.div<{ isOpen: boolean }>`
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

S.ArrowDown = styled(KeyboardArrowDownIcon)`
  color: #7d7d7d;
`;

S.ArrowUp = styled(KeyboardArrowUpIcon)`
  color: #7d7d7d;
`;

S.Box = styled.div`
  width: 410px;
  height: 100%;
  padding-top: 5%;
  margin: auto;
`;

S.Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

S.HeaderText = styled.span`
  font-size: 22px;
  padding-left: 18px;
  font-weigth: 600;
`;

S.HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.Button = styled.button`
  width: 410px;
  height: 56px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 35px;
  font-size: 20px;
  font-weigth: 600;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;