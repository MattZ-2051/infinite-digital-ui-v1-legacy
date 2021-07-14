import styled from 'styled-components/macro';

export const GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  padding-top: 12px;
  width: 80%;
`;

export const RowText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const RowSubText = styled.span`
  font-size: 16px;
  color: #9e9e9e;
`;

export const Header = styled.span`
  font-size: 22px;
  font-weight: 600;
  border-bottom: 2px solid black;
  padding-bottom: 14px;
`;

export const Row = styled.div<{ disabled: boolean }>`
  display: grid;
  grid-template-columns: 18% 52% 30%;
  padding-top: 40px;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 21px;

  ${(props) =>
    !props.disabled &&
    `:hover {
    border-bottom: 1px solid black;
    cursor: pointer;
  };`}

  .icon__arrow {
    color: #9e9e9e;
  }
  ${(props) =>
    !props.disabled &&
    `:hover .icon__arrow {
    color: black;
  };`}
`;

export const ExitIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 16px;
  :hover .icon__exit {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const FlexColumn = styled.div<{ padding?: string }>`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.padding};
`;

export const FlexEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const FlexAlignCenter = styled.div`
  display: flex;
  align-items: center;
`;
