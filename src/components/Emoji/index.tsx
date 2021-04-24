import React from 'react';

interface IProps {
  label?: string;
  symbol: any;
}

const Emoji = ({ label, symbol }: IProps) => (
  <span
    className="emoji"
    role="img"
    aria-label={label || ''}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
);
export default Emoji;
