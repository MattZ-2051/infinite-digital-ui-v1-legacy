import React from 'react';
import { ITransaction } from 'entities/transaction';
import * as S from './styles';

interface IProps {
  tx: ITransaction;
  icon: string;
  text: string;
}

const ActionInfo = ({ tx, icon, text }: IProps) => {
  return (
    <>
      <S.Icon src={icon} />
      <span>{text}</span>&nbsp;
      <span>{tx.transactionData.sku?.name}</span>
      <S.Link to={`/product/${tx.transactionData?.product?.[0]?._id}`}>
        #{tx.transactionData.product?.[0]?.serialNumber}
      </S.Link>
    </>
  );
};

export default ActionInfo;
