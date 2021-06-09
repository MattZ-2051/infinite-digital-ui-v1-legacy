import styled from 'styled-components/macro';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';

export const Container = styled.div`
  max-width: 410px;
  height: 420px;
  width: 100%;
`;

export const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const CloseIcon = styled(CloseModal)`
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const BodyContainer = styled.div`
  padding: 0 20px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid #ebebeb;
`;

export const Header = styled.p`
  margin: 0;
  color: black;
  padding-left: 8px;
  font-size: 22px;
`;

export const SubHeader = styled.p`
  margin: 0;
  font-size: 14px;
  color: #888888;
  text-align: center;
  padding: 26px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 36px;
`;

export const Button = styled.button`
  max-width: 330px;
  border: none;
  height: 56px;
  width: 100%;
  background: black;
  font-weight: 600;
  font-size: 20px;
  color: white;
  border-radius: 35px;
  :hover {
    cursor: pointer;
    background: white;
    color: black;
    border: 2px solid black;
  }
  :focus {
    outline: none;
  }
`;
