import React, { useState } from 'react';
import ModalComponent from 'components/Modal';
import * as S from './styles';
import exitIcon from 'assets/img/icons/exit-icon.png';
import { useMediaQuery } from '@material-ui/core';
import ListWithdrawal from './AvailableMethods/ListWithdrawal';
import BankMethod from './AchAccountList/BankMethod';
import WithdrawUSCD from './AvailableMethods/WithdrawUSCD';

interface IWithdrawModal {
  isModalOpen?: boolean;
  handleClose: () => void;
}

const WithdrawModal = ({
  isModalOpen,
  handleClose,
}: IWithdrawModal): JSX.Element => {
  const [valueIsAdding, setIsAdding] = useState<boolean>(false);
  const matchesMobile = useMediaQuery('(max-width:1140px)', { noSsr: true });
  const [status, setStatus] = useState(0);
  const onClose = () => {
    setStatus(0);
    handleClose();
  };

  const content = {
    0: <ListWithdrawal setStatus={setStatus} />,
    1: (
      <BankMethod
        handleClose={onClose}
        valueIsAdding={valueIsAdding}
        setIsAdding={setIsAdding}
      />
    ),
    2: <WithdrawUSCD setStatus={setStatus} handleClose={onClose} />,
  }[status];

  return (
    <ModalComponent
      open={isModalOpen || false}
      onClose={onClose}
      disableEnforceFocus={true}
      bodyStyle={{
        display: 'flex',
        minHeight: valueIsAdding || status === 2 ? 750 : 551,
        maxWidth: 522,
        margin: 0,
        top: 'initial',
        bottom: 'initial',
      }}
    >
      <S.BodyContainer
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          top: 'auto',
          left: 'auto',
          transform: 'initial',
          flex: 1,
        }}
      >
        <S.ExitIcon>
          <img
            src={exitIcon}
            alt="exitIcon"
            onClick={onClose}
            className="icon__exit"
          />
        </S.ExitIcon>
        {content}
      </S.BodyContainer>
    </ModalComponent>
  );
};

export default WithdrawModal;
