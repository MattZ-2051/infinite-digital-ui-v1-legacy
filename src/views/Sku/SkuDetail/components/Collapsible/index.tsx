import { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import * as S from './styles';

export interface IProps {
  title: string;
  body: JSX.Element;
}

const Collapsible = ({ title, body }: IProps): JSX.Element => {
  const [descriptionVisible, setDescriptionVisible] = useState<boolean>(false);
  const theme = useTheme();
  const isSmall: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
  };

  return (
    <>
      <S.Title>
        {title}
        {isSmall && (
          <S.ToggleArrow onClick={toggleDescription}>
            {!descriptionVisible ? (
              <S.DownArrow style={{ color: 'black' }} />
            ) : (
              <S.UpArrow style={{ color: 'black' }} />
            )}
          </S.ToggleArrow>
        )}
      </S.Title>

      {(descriptionVisible || !isSmall) && body}
    </>
  );
};

export default Collapsible;
