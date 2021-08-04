import styled from 'styled-components';

export const InputMobile = styled.input`
  position: absolute;
  top: 37px;
  right: 40px;
  border: solid 1px;
  border-radius: 15px;
  color: grey;
  width: 200px;
  text-indent: 15px;
  height: 40px;
  background-color: white;
  margin-left: 7px;
`;
export const InputDiv = styled.div`
  padding-bottom: 2px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  @media screen and (min-width: 960px) {
    margin-right: 32px;
    width: 269px;
  }
`;

export const Input = styled.input`
  border: none;
  outline: none;
  text-indent: 15px;
  height: 40px;
  background-color: white;
  width: inherit;
  margin-left: 7px;
`;
