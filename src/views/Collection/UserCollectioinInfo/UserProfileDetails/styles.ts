import styled from 'styled-components/macro';
import { ReactComponent as editSVG } from 'assets/svg/icons/edit-profile-icon.svg';
import { ReactComponent as resetSVG } from 'assets/svg/icons/lock-reset.svg';

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
  > * + * {
    margin-top: 30px;
  }
  > :first-child {
    margin-top: 40px;
  }
`;

export const SubHeader = styled.span`
  font-size: 16px;
  color: #7d7d7d;
  font-weight: 400;
  padding-top: 24px;
`;

export const UsernameInput = styled.input`
  border: none;
  font-size: 16px;
  :focus {
    outline: none;
  }
`;

export const At = styled.span`
  font-size: 16px;
  color: #7d7d7d;
`;

export const Input = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
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
  padding: 0 20px 40px 20px;
  font-family: Circular, sans-serif;
`;

export const ModalSectionTitle = styled.h3`
  font-size: 14px;
  line-height: 18px;
  color: #7d7d7d;
  font-weight: 400;
`;

export const ModalSection = styled.section`
  width: 100%;
  color: #7d7d7d;
  > * + * {
    margin-top: 2px;
  }
  @media screen and (min-width: 460px) {
    min-width: 330px;
  }
`;

export const FlexSpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextWithIcon = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ToggleButton = styled.button`
  background-color: #000;
  padding: 5px;
  width: fit-content;
  height: fit-content;
  border-radius: 42%;
  border: 0;
  margin-left: 9px;
  display: flex;
  align-items: center;
`;

export const EditIcon = styled(editSVG)`
  width: 20px;
  height: 20px;
  stroke: #fff;
  fill: none;
  :hover {
    stroke: white;
    cursor: pointer;
  }
`;

export const ResetIcon = styled(resetSVG)`
  width: 20px;
  height: 20px;
  fill: #fff;
  :hover {
    fill: #fff;
    cursor: pointer;
  }
`;
