import React from 'react';
import styled from 'styled-components/macro';
//Local
import Modal, { ModalProps } from '@material-ui/core/Modal';
import { StyledProps } from '@material-ui/core';
import * as S from './style';

interface IProps extends ModalProps {
  children: any;
  height?: string;
  align?: string;
  width?: string;
  padding?: string;
  bodyStyle?: any;
  margin?: string;
  centered?: boolean;
}

const ModalComponent = ({
  children,
  height,
  align,
  width,
  padding,
  bodyStyle,
  margin,
  centered,
  ...props
}: IProps): JSX.Element => {
  return (
    <S.ModalContainer {...(props as any)}>
      <S.ModalBody
        align={align}
        height={height}
        width={width}
        padding={padding}
        style={bodyStyle}
        margin={margin}
        centered={centered}
      >
        {children}
      </S.ModalBody>
    </S.ModalContainer>
  );
};

export default ModalComponent;
