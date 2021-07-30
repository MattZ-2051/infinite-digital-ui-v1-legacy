import styled from 'styled-components/macro';
export const Container = styled.div`
  position: fixed;
  width: calc(100% - 160px);
  height: 94px;
  background: white;
  color: black;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 32px;
  z-index: 10000;
  border-radius: 14px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 960px) {
    width: 100%;
    height: auto;
  }
`;

export const Text = styled.p`
  color: black;
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  padding: 20px 32px;
  text-align: left;
  width: 90%;
  @media screen and (max-width: 960px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 32px;
  @media screen and (max-width: 960px) {
    right: 12px;
  }
`;
