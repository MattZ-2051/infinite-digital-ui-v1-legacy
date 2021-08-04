import React, { useState } from 'react';
import WithdrawItem from './WihdrawalItem';
import UsdcIcon from 'assets/img/icons/usdc-icon.png';
import bankIcon from 'assets/img/icons/bank.png';
import * as S from './styles';
import { useMediaQuery } from '@material-ui/core';
interface IProps {
  setStatus: (value: number) => void;
}

const ListWithdrawal = ({ setStatus }: IProps) => {
  const matchesMobile = useMediaQuery('(max-width:1140px)', { noSsr: true });
  const availableMethods = [
    {
      title: 'ACH',
      src: bankIcon,
      action: () => setStatus(1),
    },
    {
      title: 'USDC',
      src: UsdcIcon,
      subtext: 'Account verification in required.',
      action: () => setStatus(2),
    },
  ];
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
      <div>
        <div>
          <S.Header>Withdraw funds to</S.Header>
          <S.GrayLine style={{ width: '100%' }} />
        </div>
        <p style={{ color: '#7D7D7D' }}>
          Select a method to withdraw your founds to...
        </p>
      </div>
      <div
        style={{
          flex: 1,
          maxHeight: 330,
          overflowY: 'auto',
        }}
      >
        {availableMethods.map((el) => (
          <WithdrawItem key={el.title} item={el} onClick={() => el.action()} />
        ))}
      </div>
    </S.BodyContent>
  );
};

export default ListWithdrawal;
