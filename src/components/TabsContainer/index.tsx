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
      width: ${(props) => (props.width ? `${props.width}` : '100%')};
    }
    .PrivateTabIndicator-colorSecondary-3 {
      background-color: black !important;
      height: 3px;
    }

    @media screen and (max-width: 600px) {
      .MuiTab-wrapper {
        font-size: 1rem;
      }
    }
  }
`;

export default Tabs;
