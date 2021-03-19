import styled from 'styled-components/macro';
import MuiTabs from '@material-ui/core/Tabs';

export interface IProps {
  width?: string;
}

const Tabs = styled(({ width, ...rest }) => <MuiTabs {...rest} />)`
&& {
  .MuiTabs-centered {
    justify-content: space-between;
    margin: auto;
    width: ${(props) => props.width ? `${props.width}` : '100%'};
  }
  .MuiTabs-indicator {
    background-color: black !important;
    height: 3px;
  }

  @media screen and (max-width: 600px) {
    .MuiTab-wrapper {
      font-size: 1rem;
    }
    .MuiTabs-centered {
      justify-content: space-around;
      margin: auto;
    }
  }
}
`;

export default Tabs;
