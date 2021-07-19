import styled from 'styled-components/macro';

export const Container = styled.div`
  padding: 0 80px 0 48px;
  height: 146px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;

  @media screen and (max-width: 600px) {
    height: auto;
    padding: 24px;
    flex-direction: column;
  }
`;

export const SoldOutAuctionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

export const Text = styled.p<{
  fontWeight: number;
  color: string;
  fontSize: string;
}>`
  margin: 0;
  font-weight: ${(props) => `${props.fontWeight}`};
  font-size: ${(props) => `${props.fontSize}`};
  color: ${(props) => `${props.color}`};
`;

export const BoxColumn = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  small {
    font-weight: 400;
  }
  span {
    // letter-spacing: -2px;
  }

  /* @media screen and (max-width: 600px) {

} */
`;

export const Button = styled.button`
  background-color: ${(props) => (props.disabled ? '#2D2D2D' : '#FFFFFF')};
  color: ${(props) => (props.disabled ? '#5F5F5F' : '#000000')};
  border: 0;
  height: 56px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 22px;
  width: 186px;
  outline: none;
  font-size: 20px;
  font-weight: 600;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin-top: 24px;
  }
`;

export const Detail = styled.div<{ width?: string }>`
  display: flex;
  width: ${(props) => (props.width ? `${props.width}` : `52%`)};
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 600px) {
    justify-content: space-between;
    width: 100%;
  }
`;

export const Price = styled.span`
  font-style: normal;
  font-size: 28px;
  font-weight: 500;
  line-height: 35px;
`;

export const CountDownTime = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
`;

export const StartDate = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  color: #8e8e8e;
`;

export const Slash = styled.span`
  font-size: 48px;
  color: #7c7c7c;
  font-weight: 500;
`;

export const SerialNumber = styled.span`
  font-size: 48px;
  color: white;
  font-weight: 600;
`;

export const BoxTitle = styled.span`
  font-style: normal;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;

  color: '#8E8E8E';
`;

export const BoxSubtitle = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;
  color: #7c7c7c;
`;
