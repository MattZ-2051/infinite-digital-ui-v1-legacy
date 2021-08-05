import styled from 'styled-components/macro';

export const Container = styled.div`
  margin-left: 4px;
`;

export const Pill = styled.div<{ claimed?: boolean }>`
  position: relative;
  width: 265px;
  height: 56px;
  border-radius: 35px;
  display: flex;
  align-items: center;
  background: ${(props) => (props.claimed ? '#efefef' : '#000000')};
  justify-content: center;
  padding: 0 22px;
  bottom: 25px;
`;

export const TextClaim = styled.span<{ claimed?: boolean }>`
  font-weight: 700;
  color: ${(props) => (props.claimed ? '#9e9e9e' : '#ffffff')};
  font-size: 16px;
  line-height: 13px;
  margin-right: 20px
`;
