import React, { useState } from 'react';
import AchAccountAdd from '../AchAccountAdd';
import AchAccountList from '.';
import { useMediaQuery } from '@material-ui/core';
import Toast from 'utils/Toast';
import { withdraw } from 'utils/messages';
import * as S from '../AvailableMethods/styles';

interface IProps {
  valueIsAdding: boolean;
  setIsAdding: (value: boolean) => void;
  handleClose: () => void;
}

const BankMethod = ({ valueIsAdding, setIsAdding, handleClose }: IProps) => {
  const matchesMobile = useMediaQuery('(max-width:1140px)', { noSsr: true });
  return (
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
  );
};

export default BankMethod;
