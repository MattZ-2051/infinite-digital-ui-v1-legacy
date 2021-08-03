import styled from 'styled-components/macro';


export const BodyContent = styled.div`
  padding: 0 40px 40px 40px;
  @media screen and (max-width: 550px) {
    padding: 0 10px;
  }
`;
export const GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  padding-top: 12px;
  width: 80%;
`;


export const Header = styled.span`
  font-size: 22px;
  font-weight: 600;
  border-bottom: 2px solid black;
  padding-bottom: 14px;
  @media screen and (max-width: 330px) {
    font-size: 18px;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 18% 52% 30%;
  padding-top: 40px;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 21px;
`;

export const FlexAlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const FlexColumn = styled.div<{ padding?: string }>`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.padding};
`;

export const RowText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const RowSubText = styled.span`
  font-size: 12px;
  color: #9e9e9e;
`;