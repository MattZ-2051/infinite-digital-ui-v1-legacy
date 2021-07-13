import styled from 'styled-components/macro';

export const Container = styled.div`
  positioin: absolute;
  width: 100%;
  background-color: white;
  outline: none;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate-50%-50%;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SubHeader = styled.span`
  font-size: 16px;
  color: #7d7d7d;
  font-weight: 400;
  padding-top: 24px;
`;

export const UsernameInput = styled.input`
  width: 65%;
  border: none;
  font-size: 16px;
  :focus {
    outline: none;
  }
`;

export const At = styled.span`
  padding-right: 10px;
  font-size: 16px;
  color: #7d7d7d;
`;

export const Input = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 30px;
`;

export const Button = styled.button`
  width: 220px;
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  background-color: black;
  border-radius: 35px;
  color: white;
  border: none;
  :hover {
    cursor: pointer;
    transform: scale(1.025);
  }
  :focus {
    outline: none;
  }
`;

export const Border = styled.span`
  height: 20px;
  width: 77%;
  border-bottom: 1px solid black;
`;

export const Icon = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Header = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

export const CheckIcon = styled.div`
  padding-left: 8px;
  display: flex;
  align-items: center;
  width: 30px;
`;

export const ExitIconImg = styled.img`
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const CheckIconImg = styled.img`
  height: fit-content;
`;

export const Body = styled.div`
  width: 100%;
`;
