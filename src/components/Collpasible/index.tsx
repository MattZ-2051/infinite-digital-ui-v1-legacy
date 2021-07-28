import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as S from './styles';

interface IProps {
  title: string;
  body: JSX.Element;
  breakPointSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  themeStyle?: 'light' | 'dark';
  borderTitle?: boolean;
}

const Collapsible = ({
  title,
  body,
  breakPointSize,
  borderTitle,
  themeStyle,
}: IProps) => {
  const theme = useTheme();
  const size: boolean = useMediaQuery(theme.breakpoints.up(breakPointSize));
  const [displayContent, setDisplayContent] = useState<boolean>(false);
  const toggle = () => setDisplayContent(!displayContent);
  return (
    <>
      <S.Title themeStyle={themeStyle} borderTitle={borderTitle}>
        <div style={{ flex: 1 }}>{title}</div>
        {size && (
          <S.ToggleArrow onClick={toggle}>
            {!displayContent ? (
              <S.DownArrow themeStyle={themeStyle} />
            ) : (
              <S.UpArrow themeStyle={themeStyle} />
            )}
          </S.ToggleArrow>
        )}
      </S.Title>
      {size && displayContent && body}
    </>
  );
};

export default Collapsible;
