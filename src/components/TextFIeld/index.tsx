import styled from 'styled-components';
import TextFieldMUI from '@material-ui/core/TextField';

export interface IProps {}

const TextField = () => {
  return (
    <TextFieldComponent
      id="outlined-full-width"
      label="Username"
      fullWidth
      margin="normal"
      // InputLabelProps={{
      //   shrink: true,
      // }}
      variant="outlined"
      name="username"
      //inputRef={register({ required: true, maxLength: 20 })}
    />
  );
};


const TextFieldComponent = styled(TextFieldMUI)`
  && {
    .MuiFormLabel-root.Mui-focused {
      border-color: black;

      fieldset {
        border-color: black;
        .Mui-focused {
          border-color: black;
        }
      }
    }
  }
`;

export default TextField;
