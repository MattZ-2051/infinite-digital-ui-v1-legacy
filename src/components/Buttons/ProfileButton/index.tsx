import React from 'react';
import styled from 'styled-components';

interface IProps {
  label: string;
  // TODO: ADD Later - Disable for ARIA MVP -  handleClick?: () => void;
}

const ProfileButton = ({ label }: IProps) => {
  return <Button disabled={true}>{label}</Button>;
};

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  font-weight: 600;
  :focus {
    outline: none;
  }
`;

export default ProfileButton;
