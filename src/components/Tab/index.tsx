import styled from 'styled-components/macro';
import MuiTab from '@material-ui/core/Tab';

const Tab = styled(MuiTab)`
  && {
    font-size: 24px;
    font-weight: bold;
    line-height: 38.4px;
    font-family: 'PlusJakartaSans';
    letter-spacing: -0.5px;
    &:active {
      outline: none;
    }
  }
`;

export default Tab;
