import styled from 'styled-components/macro';

export const Text = styled.span`
  color: #7d7d7d;
  font-size: 16px;
`;

export const OtherPaymenButton = styled.span`
  font-size: 20px;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
`;

export const MarketPlaceButton = styled.button`
  width: 410px;
  height: 56px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 35px;
  font-size: 20px;
  font-weigth: 600;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export const HeaderText = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

export const ContentContainer = styled.div`
  width: 410px;
  // background-color: white;
`;