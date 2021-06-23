import styled from 'styled-components/macro';

export const TransactionOwnerAccess = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 80%;
  overflow-x: hidden;
  padding-right: 80px;

  :hover {
    overflow-y: auto;
    cursor: pointer;
  }

  @media screen and (max-width: 1160px) {
    padding-right: 0;
  }
`;

export const RowOwnerAccess = styled.div`
  height: 106px;
  border-bottom: 1px solid #2e2e2e;
  display: flex;
  align-items: center;
`;

export const RowContainerOwnerDescription = styled.div<{ owner }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  span {
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
