import styled from 'styled-components/macro';
import Checkbox from '@material-ui/core/Checkbox';

export const CustomCheckBox = styled(Checkbox)`
  .Mui-checked {
    color: white;
  }
  .MuiIconButton-label {
    color: #7c7c7c;
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
`;

export const Label = styled.div`
  width: 120px;
  color: #9e9e9e;
  font-size: 18px;
  line-height: 23px;
`;
