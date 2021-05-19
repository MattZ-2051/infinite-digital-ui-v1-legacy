import styled from 'styled-components';

export const TextContainer = styled.div<{
  fontSize?: string;
  textAlign?: string;
  fontWeight?: string;
}>`
  text-align: ${(props) => (props.textAlign ? `${props.textAlign}` : 'left')};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : '14px')};
  font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : '300')};
`;

export const GradientText = styled.span<{
  fontSize?: string;
  textAlign?: string;
  fontWeight?: string;
}>`
  text-align: ${(props) => (props.textAlign ? `${props.textAlign}` : 'left')};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : '24px')};
  font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : '300')};
  background: -webkit-linear-gradient(left, blue, red);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
