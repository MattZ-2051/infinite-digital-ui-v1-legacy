import styled from 'styled-components/macro';
//Local
import Modal, { ModalProps } from '@material-ui/core/Modal';

export const ModalContainer: any = styled(Modal)`
  overflow-y: scroll;
  /* z-index: 1400 !important;*/
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin: auto;
  /* backdrop-filter: blur(2px); Using overflow-y and backdrop-filter is causing issues.*/
` as React.ComponentType<ModalProps>;

export const ModalBody = styled.div<{
  height?: string;
  align?: string;
  width?: string;
  padding?: string;
  margin?: string;
  centered?: boolean;
}>`
  margin: ${(props) => (props.margin ? `${props.margin}` : `0`)};
  top: ${(props) => (props.centered ? `50%` : `30px`)};
  ${(props) => {
    if (props.centered)
      return `
      left: 50%;
      transform: translate(-50%, -50%);
      `;
  }}
  background-color: #ffffff;
  position: absolute;
  min-width: 280px;
  min-height: ${(props) => (props.height ? `${props.height}` : `400px`)};
  padding: ${(props) => (props.padding ? `${props.padding}` : `20px`)};
  border-radius: 12px;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.align ? `${props.align}` : `center`)};
  @media screen and (max-width: 950px) {
    margin-top: ${(props) =>
      props.margin ? `${props.margin}` : `${props.centered ? '' : '50px'}`};
  }
  @media screen and (max-width: 550px) {
    width: ${(props) => (props.width ? `${props.width}` : '90%')};
    ${(props) => {
      if (props.centered)
        return `
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        `;
    }}
  }
  @media screen and (max-height: 760px) {
    ${(props) => {
      if (props.centered)
        return `
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        `;
    }}
  }
`;
