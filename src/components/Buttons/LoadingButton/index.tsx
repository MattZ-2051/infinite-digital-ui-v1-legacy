import React, { useState } from 'react';

export interface IProps {
  children?: string | null | false | any; //TODO: remove any
  color?: string;
  loadingComponentRender: () => any;
  onClick: (...args: any[]) => Promise<any>;
  [rest: string]: any;
}

const LoadingButton = ({
  color,
  onClick,
  children,
  loadingComponentRender,
  ...rest
}: IProps) => {
  const [valueLoading, setLoading] = useState<boolean>(false);
  return (
    <button
      {...rest}
      color={color}
      disabled={valueLoading}
      onClick={(...pp) => {
        const res = onClick(...pp);
        setLoading(true);
        return res.then(
          (rr) => {
            setLoading(false);
            return rr;
          },
          (err) => {
            setLoading(false);
            throw err;
          }
        );
      }}
    >
      {valueLoading ? loadingComponentRender() : children}
    </button>
  );
};

export default LoadingButton;
