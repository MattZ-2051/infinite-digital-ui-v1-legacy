import styled from 'styled-components/macro';

export const Container = styled.div`
  margin-left: 5px;
`;

export const Pill = styled.div<{ isLight?: boolean }>`
  position: relative;
  width: 265px;
  height: 56px;
  border-radius: 35px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.isLight ? 'black' : '#c4c4c4')};
  justify-content: space-between;
  padding: 0 25px;
  bottom: 25px;
`;

export const PillText = styled.span<{ isLight?: boolean }>`
  font-weight: 700;
  font-size: 16px;
  line-height: 20.24px;
  color: ${(props) => (props.isLight ? 'black' : '#c4c4c4')};
  height: 20px;
`;

export const PillInfo = styled.span<{ isLight?: boolean }>`
  font-weight: 600;
  font-size: 22px;
  line-height: 32px;
  height: 32px;
  color: ${(props) => (props.isLight ? 'black' : 'white')};
`;

export const Upcoming = styled.span<{ isLight?: boolean }>`
  font-weight: 700;
  backgound-color: black;
  margin: auto;
  color: ${(props) => (props.isLight ? 'black' : 'white')};
  font-size: 20px;
  line-height: 32px;
  height: 32px;
`;

export const NotForSale = styled.span<{ isLight?: boolean }>`
  font-weight: 700;
  backgound-color: #e5e5e5;
  margin: auto;
  color: ${(props) => (props.isLight ? 'black' : '#9e9e9e')};
  font-size: 20px;
  line-height: 32px;
  height: 32px;
`;
