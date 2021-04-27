import React from 'react';
import styled from 'styled-components/macro';
//Local
import Modal, { ModalProps } from '@material-ui/core/Modal';

interface IProps {
  children: any;
  open?: boolean;
  onClose?: any;
}

const ModalComponent = ({ children, ...props }: IProps) => {
  return (
    <ModalContainer {...(props as any)}>
      <ModalBody>{children}</ModalBody>
    </ModalContainer>
  );
};

const ModalContainer: any = styled(Modal)`
  z-index: 1400 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  // backdrop-filter: blur(2px);
` as React.ComponentType<ModalProps>;

const ModalBody = styled.div`
  background-color: #ffffff;
  position: absolute;
  min-width: 400px;
  min-height: 400px;
  padding: 20px;
  border-radius: 12px;
  outline: none;
`;

export default ModalComponent;
