import styled from 'styled-components/macro';
import { Theme } from 'theme/theme';

export const TransactionOwnerAccess = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 80%;
  overflow-x: hidden;
  /* padding-right: 80px; */
  flex: 1;
  /* padding-top: 24px; */

  :hover {
    overflow-y: auto;
    cursor: pointer;
  }

  @media screen and (max-width: 960px) {
    margin-left: 0;
  }
`;

export const RowOwnerAccess = styled.div`
  height: 106px;
  border-bottom: 1px solid #2e2e2e;
  display: flex;
  align-items: center;
`;

export const RowContainerOwnerDescription = styled.div<{
  theme: Theme;
  themeStyle?: 'light' | 'dark';
  owner: boolean;
}>`
  /* display: flex; */
  /* flex: 1; */
  /* flex-direction: column; */
  min-width: 10px;
  overflow-wrap: break-word;
  p {
    color: ${(props) =>
      props.themeStyle === 'dark'
        ? props.theme.palette.light.baseMain
        : props.theme.palette.dark.baseMain};
    font-size: 16px;
    line-height: 20px;
    opacity: ${(props) => (props.owner ? 1 : 0.5)};
  }
`;

export const ContainerTypeFile = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  width: 200px;
  justify-content: space-between;
  span {
    color: #9e9e9e;
    font-size: 14px;
    line-height: 18px;
  }
`;

export const ContainerDownloadIcon = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

export const ContainerNoOwnerText = styled.div`
  margin-top: 20px;
`;
