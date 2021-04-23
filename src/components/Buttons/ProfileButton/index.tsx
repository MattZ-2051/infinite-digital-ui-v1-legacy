import styled from 'styled-components';

interface IProps {
  label: string;
  handleClick?: () => void;
}

const ProfileButton = ({ label, handleClick }: IProps) => {
  return <Button onClick={handleClick}>{label}</Button>;
};

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  font-weight: 600;
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
`;

export default ProfileButton;
