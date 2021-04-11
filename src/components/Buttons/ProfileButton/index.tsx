import styled from 'styled-components';

interface IProps {
  label: string;
}

const ProfileButton = ({ label }: IProps) => {

  return (
    <Button>{label}</Button>
  )
}

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

export default ProfileButton
