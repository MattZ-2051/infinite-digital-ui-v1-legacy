import React from 'react';
import styled from 'styled-components/macro';
import Drawer from '@material-ui/core/Drawer';

interface IProps {
  children: any;
  open?: boolean;
  anchor?: string;
  onClose?: any;
}

const DrawerComponent = ({ children, ...rest }: IProps) => {
  return <StyledDrawer data-testid="drawer">{children}</StyledDrawer>;
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
