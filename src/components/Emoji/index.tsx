import React from 'react';

interface IProps {
  label?: string;
  symbol: any;
  size?: string;
}

const Emoji = ({ label, symbol, size }: IProps) => (
  <span
    style={{ fontSize: size }}
    className="emoji"
    role="img"
    aria-label={label || ''}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
);
export default Emoji;
