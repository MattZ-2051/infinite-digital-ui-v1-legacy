import styled from 'styled-components/macro';
import Drawer from '@material-ui/core/Drawer';

interface IProps {
  children: any;
  open?: boolean;
  anchor?: string;
  onClose?: any;
  [rest: string]: any;
}

const DrawerComponent = ({ children, ...rest }: IProps) => {
  return (
    <StyledDrawer {...rest} data-testid="drawer">
      {children}
    </StyledDrawer>
  );
};

interface IStyledDrawer {
  [rest: string]: any;
}

const StyledDrawer = styled(Drawer)<IStyledDrawer>`
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
