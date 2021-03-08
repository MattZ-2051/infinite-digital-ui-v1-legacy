import styled from 'styled-components/macro';
import Drawer from '@material-ui/core/Drawer';

const DrawerComponent = (props: any) => {
  return (
    <StyledDrawer {...props}>
      {props.children}
    </StyledDrawer>
  );
};

const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    width: 280px;
    padding-top: 120px;
    padding-left: 32px;
    box-sizing: border-box;
    background-color: black;
    color: white;
  }
`;

export default DrawerComponent;
