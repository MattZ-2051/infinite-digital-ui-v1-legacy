import styled from 'styled-components/macro';
import CurrencyInput from 'react-currency-input-field';

export const Container = styled.div`
  height: 88px;
  width: calc(100% - 80px);
  background-color: #303030;
  margin-right: 80px;
  margin-bottom: 32px;
  border-radius: 16px;
  @media screen and (max-width: 900px) {
    height: 100%;
    width: 100%;
  }
`;

export const AmountInput = styled(CurrencyInput)`
  font-size: 16px;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 20px;
  background: black;
  width: 374px;
  height: 40px;
  padding-left: 6%;
  :focus {
    outline: none;
  }
  @media screen and (max-width: 900px) {
    width: 90%;
    margin-bottom: 54px;
    text-align: center;
    padding: 0;
  }
`;

export const PlaceBidButton = styled.button<{ active: boolean }>`
  width: 186px;
  height: 56px;
  position: absolute;
  right: 0;
  font-size: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => (props.active ? 'black' : '#3a3a3a')};
  background-color: ${(props) => (props.active ? 'white' : '#1a1a1a')};
  border: none;
  font-weight: 500;
  border-radius: 28px;
  :focus {
    outline: none;
  }
  :hover {
    ${(props) =>
      props.active && `cursor:pointer; background-color: white; color: black;`}
  }
  @media screen and (max-width: 900px) {
    position: unset;
    width: 90%;
    height: 56px;
  }
`;

export const PlaceBidButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 8px 0;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: space-between;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  @media screen and (max-width: 900px) {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-column-gap: 10px;
    padding: 16px 24px;
    grid-auto-flow: column;
  }
`;
