import { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import * as S from './styles';

export interface IProps {
  title: string;
  body: JSX.Element;
  collectorsTotalNum?: number;
  borderTitle?: boolean;
}

const Collapsible = ({
  title,
  body,
  collectorsTotalNum,
  borderTitle,
}: IProps): JSX.Element => {
  const [descriptionVisible, setDescriptionVisible] = useState<boolean>(false);
  const theme = useTheme();
  const isSmall: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
  };

  return (
    <>
      <S.Title borderTitle={borderTitle}>
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
        {collectorsTotalNum && <S.Total>{collectorsTotalNum} Total</S.Total>}
      </S.Title>
      {(descriptionVisible || !isSmall) && body}
    </>
  );
};

export default Collapsible;
