import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  height: 56px;
  background: #f8f8f8;
  border-radius: 20px;
  border: none;
  outline: none;
  font-family: Circular, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #000000;
  ::placeholder {
    color: #888888;
  }
  text-align: center;
`;

export const InputMoneyContainer = styled.div`
  position: relative;
  width: 100%;
  span {
    position: absolute;
    left: 19px;
    font-family: Circular, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    color: #888888;
    line-height: 56px;
  }
`;

export const InputMoney = styled(Input)`
  padding: 0 20px 0 35px;
`;
