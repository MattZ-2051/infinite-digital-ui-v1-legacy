import styled from 'styled-components/macro';
import MuiTab from '@material-ui/core/Tab';


const Tab = styled(MuiTab)`
  && {
    font-size: 20px;
    font-weight: 600;
    line-height: 38.4px;
    &:active: {
      outline: none,
    },

  }

`

export default Tab;
