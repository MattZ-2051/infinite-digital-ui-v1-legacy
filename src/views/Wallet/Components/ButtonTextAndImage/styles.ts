import styled from 'styled-components/macro';

export const ButtonContainer = styled.div`
  padding-top: 16px;
`;

export const ActionButton = styled.button`
  width: 100%;
  height: 56px;
  color: white;
  background-color: black;
  border: none;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border-radius: 26px;
  border: 2px solid black;
  :hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
  :disabled {
    background-color: #9e9e9e;
    border: 0;
  }
  :disabled:hover {
    background-color: #9e9e9e;
    color: white;
  }
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const TextInButton = styled.div`
  padding-left: 21px;
  font-weight: 400;
  font-size: 20px;
  font-family: 'Circular';
`;

export const Icon = styled.img`
  padding-right: 20px;
`;

export const IconContainer = styled.div`
  display: flex;
`;
