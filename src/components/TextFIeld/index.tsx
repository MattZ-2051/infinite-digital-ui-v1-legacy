import React, { useState, useEffect } from 'react';
import * as S from './styles';

export interface IProps {
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'number' | 'money';
  name: string;
}

const TextField = ({
  placeholder = 'Enter text',
  defaultValue = '',
  onChange,
  type = 'text',
  name,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange && onChange(newValue);
  };

  const inputProps = {
    name,
    placeholder,
    value: defaultValue,
    onChange: handleChange,
  };

  return (
    {
      text: <S.Input {...inputProps} type="text" />,
      number: <S.Input {...inputProps} type="number" />,
      money: (
        <S.InputMoneyContainer>
          <span>$</span>
          <S.InputMoney {...inputProps} type="number" />
        </S.InputMoneyContainer>
      ),
    }[type] || <S.Input {...inputProps} type="text" />
  );
};

export default TextField;
