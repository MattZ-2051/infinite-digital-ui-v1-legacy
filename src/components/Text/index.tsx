import styled from 'styled-components';

export const TextContainer = styled.div<{
  fontSize?: string;
  textAlign?: string;
}>`
  text-align: ${(props) => (props.textAlign ? `${props.textAlign}` : 'left')};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : '24px')};
`;
