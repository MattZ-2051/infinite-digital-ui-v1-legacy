import React, { useState, useEffect } from 'react';
import * as S from './styles';

export interface IProps {
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  name: string;
  label: string;
}

const CheckBox = ({ defaultValue = false, onChange, name, label }) => {
  const [inputValue, setInputValue] = useState<boolean>(defaultValue);

  useEffect(() => {
    onChange && onChange(inputValue);
  }, [inputValue]);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setInputValue(newValue);
  };

  const inputProps = {
    name,
    onchange: handleChange,
  };

  return (
    <S.Label>
      <S.CheckBox type="checkbox" />
      {label}
    </S.Label>
  );
};

export default CheckBox;
