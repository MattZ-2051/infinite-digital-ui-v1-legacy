import React from "react";
import styled from "styled-components/macro";
import Modal, { ModalProps } from "@material-ui/core/Modal";

const ModalComponent: any = ({children, ...props}) => {
  return (
    <ModalContainer
      {...(props as any)}
    >
      <ModalBody>
        {children}
      </ModalBody>
    </ModalContainer>
  );
};

const ModalContainer: any = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  backdrop-filter: blur(2px);
` as React.ComponentType<ModalProps>;

const ModalBody = styled.div`
  background-color: #ffffff;
  position: absolute;
  width: 400px;
  padding: 20px;
  border-radius: 5px;
  outline: none;
`;

export default ModalComponent;
