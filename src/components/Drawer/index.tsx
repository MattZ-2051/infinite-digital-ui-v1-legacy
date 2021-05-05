import React from 'react';
import styled from 'styled-components/macro';
import Drawer from '@material-ui/core/Drawer';

interface IProps {
  children: any;
  open?: boolean;
  anchor?: string;
  onClose?: any;
}

const DrawerComponent = ({ children, open, onClose }: IProps) => {
  return (
    <StyledDrawer data-testid="drawer" open={open} onClose={onClose}>
      {children}
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
