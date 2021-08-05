import styled, { css } from 'styled-components/macro';

export const Button = styled.button<{ theme: 'light' | 'dark' }>`
  background-color: ${(props) => (props.theme == 'light' ? 'black' : 'white')};
  color: ${(props) => (props.theme == 'light' ? 'white' : 'black')};
  border: 0;
  height: 56px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 26px;
  width: 410px;
  outline: none;
  font-size: 20px;
  font-weight: 600;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin-top: 24px;
  }
`;
export const Message = styled.span`
  font-weight: 400;
  color: #9e9e9e;
  font-size: 16px;
  margin-bottom: 24px;
  margin-top: 45px;
  @media screen and (max-width: 960px) {
    margin-top: 20px;
  }
`;

export const TileContainer = styled.div<{ index: number }>`
  padding: 0 12px;
`;

export const hasCollection = css`
  margin: auto;
  :hover {
    overflow: auto;
  }
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media screen and (max-width: 840px) {
    justify-content: center;
  }
`;

export const noCollection = css`
  display: flex;
  overflow: auto;
  width: 100%;
`;

export const Container = styled.div<{ collection?: boolean }>`
  ${({ collection }) => (collection ? hasCollection : noCollection)}
`;
