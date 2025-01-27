import React from 'react';
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
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export default ProfileButton;
