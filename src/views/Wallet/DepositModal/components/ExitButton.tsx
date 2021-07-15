import { Dispatch, SetStateAction } from 'react';
import * as S from '../styles';
import exitIcon from 'assets/img/icons/exit-icon.png';

interface IExitButton {
  exitAction: (() => void) | Dispatch<SetStateAction<string>>;
}

const ExitButton = ({ exitAction }: IExitButton): JSX.Element => (
  <S.ExitIcon style={{ alignSelf: 'flex-end' }}>
    <img
      src={exitIcon}
      onClick={exitAction as () => void}
      className="icon__exit"
    />
  </S.ExitIcon>
);

export default ExitButton;
