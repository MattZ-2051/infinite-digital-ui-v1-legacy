import styled from 'styled-components/macro';

export const Tab = styled.span`
  font-weight: 600;
  font-size: 22px;
  line-height: 27.83px;
  padding-bottom: 12px;
  border: none;
  position: relative;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export const TabButton = styled.div<{
  selectedTab: number;
  highlightOption: number;
}>`
  margin-bottom: -14px;
  margin-right: 20px;
  padding-bottom: 12px;
  border-bottom: ${(pps) =>
    pps.selectedTab === pps.highlightOption ? `2px solid black` : `none`};
  color: ${(pps) =>
    pps.selectedTab === pps.highlightOption ? `black` : `#9e9e9e`};
`;

export const TabOptions = styled.div`
  position: relative;
  display: flex;
`;
