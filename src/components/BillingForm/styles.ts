import styled from 'styled-components/macro';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

export const Div = styled.div`
  padding-bottom: 40px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const DropDown = styled(Select)`
  width: 100%;
`;

export const FormInput = styled(TextField)`
  & .Mui-focused {
    color: black;
  }

  .MuiInput-underline:after {
    border-bottom: 2px solid black;
  }
`;
