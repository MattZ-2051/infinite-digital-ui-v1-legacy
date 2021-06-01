import React from 'react';
import styled from 'styled-components/macro';
//Local
import Modal, { ModalProps } from '@material-ui/core/Modal';

interface IProps {
  children: any;
  open?: boolean;
  onClose?: any;
  height?: string;
  align?: string;
}

const ModalComponent = ({
  children,
  height,
  align,
  ...props
}: IProps): JSX.Element => {
  return (
    <ModalContainer {...(props as any)}>
      <ModalBody align={align} height={height}>
        {children}
      </ModalBody>
    </ModalContainer>
  );
};

const ModalContainer: any = styled(Modal)`
  overflow-y: scroll;
  // z-index: 1400 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  backdrop-filter: blur(2px);
` as React.ComponentType<ModalProps>;

const ModalBody = styled.div<{ height?: string; align?: string }>`
  margin: 30px 0;
  background-color: #ffffff;
  position: absolute;
  min-width: 280px;
  min-height: ${(props) => (props.height ? `${props.height}` : `400px`)};
  padding: 20px;
  border-radius: 12px;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.align ? `${props.align}` : `center`)};
  @media screen and (max-width: 550px) {
    width: 90%;
  }
`;

export default ModalComponent;
