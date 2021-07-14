import React, { useState } from 'react';
import ModalComponent from 'components/Modal';
import * as S from './styles';
import AchAccountAdd from './AchAccountAdd';
import AchAccountList from './AchAccountList';
import exitIcon from 'assets/img/icons/exit-icon.png';
import Toast from 'utils/Toast';
import { withdraw } from 'utils/messages';
import { useMediaQuery } from '@material-ui/core';

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
  return (
    <ModalComponent
      open={isModalOpen || false}
      onClose={handleClose}
      disableEnforceFocus={true}
      bodyStyle={{
        display: 'flex',
        minHeight: valueIsAdding ? 750 : 551,
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
            onClick={handleClose}
            className="icon__exit"
          />
        </S.ExitIcon>
        <S.BodyContent
          style={{
            padding: matchesMobile ? '0px' : '0px 56px 20px 56px',
            flex: 1,
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {!valueIsAdding ? (
            <AchAccountList
              onError={(err) => {
                Toast.error(withdraw.error);
              }}
              onAddNew={() => setIsAdding(true)}
              onClose={handleClose}
            />
          ) : (
            <AchAccountAdd
              onError={(err) => {
                Toast.error(withdraw.error);
              }}
              onSuccess={() => {
                Toast.success(withdraw.achAdded);
                setIsAdding(false);
              }}
              onCancel={() => {
                setIsAdding(false);
              }}
            />
          )}
        </S.BodyContent>
      </S.BodyContainer>
    </ModalComponent>
  );
};

export default WithdrawModal;
