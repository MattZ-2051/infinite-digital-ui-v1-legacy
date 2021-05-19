import React, { useState, useEffect } from 'react';
import { formatCountdown } from '../utils/dates';

export const useCountdown = (countdownDate: Date): string => {
  const [countdown, setCountdown] = useState(formatCountdown(countdownDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(formatCountdown(countdownDate));
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });
  return countdown;
};
