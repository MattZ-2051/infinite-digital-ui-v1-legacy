import styled from 'styled-components/macro';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const EditIconContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  flex-direction: column;
  position: relative;

  @media screen and (max-width: 960px) {
    height: 250px;
    min-height: 0;
  }

  @media screen and (max-width: 640px) {
    height: 130px;
    min-height: 0;
  }
`;

export const EditIcon = styled.img`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  background-color: #252525;
  width: 232px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  :hover {
    cursor: pointer;
  }
`;

export const AccountIcon = styled.div`
  font-size: 120px;
`;

export const UsernameIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
`;

export const ExitIcon = styled.img`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const UsernameInput = styled.input`
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  text-align: center;
  :focus {
    outline: none;
  }
  width: fit-content;
`;
