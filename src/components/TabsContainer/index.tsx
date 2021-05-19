import styled from 'styled-components/macro';
import MuiTabs from '@material-ui/core/Tabs';

export interface IProps {
  width?: string;
}

const Tabs = styled(({ width, ...rest }) => <MuiTabs {...rest} />)`
  margin-bottom: 32px;

  && {
    .MuiTabs-centered {
      width: ${(props) => (props.width ? `${props.width}` : '100%')};
      border-bottom: 2px solid #ebebeb;
    }
    .MuiTabs-indicator {
      background-color: black !important;
      height: 3px;
    }

    .MuiTab-root {
      padding: 14px 0;
      margin-right: 20px;
      max-width: fit-content;
    }

    .MuiTab-wrapper {
      font-size: 28px;
      text-transform: capitalize;
    }

    .MuiTabs-centered {
      margin: auto;
      justify-content: flex-start;
      width: 100%;
    }
  }
`;

export default Tabs;
