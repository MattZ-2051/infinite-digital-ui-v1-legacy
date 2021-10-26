import styled from 'styled-components/macro';

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px;
  width: 100%;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;

export const Title = styled.p`
  font-size: 24px;
  margin: 0;
  font-weight: 600;
  @media screen and (max-width: 600px) {
    font-size: 22px;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const Button = styled.button`
  cursor: pointer;
  margin-top: 25px;
  color: white;
  font-size: 18px;
  font-weight: 500;
  width: 320px;
  height: 48px;
  border-radius: 30px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  :hover {
    background-color: #ddf874;
    border-color: #ddf874;
    color: black;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;
    margin-top: 13px;
  }
`;
