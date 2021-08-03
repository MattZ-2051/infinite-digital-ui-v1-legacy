import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import * as S from './styles';

const WithdrawalItem = ({ item, onClick }) => {
  return (
    <S.Row
      onClick={onClick}
      style={{
        gridTemplateColumns: '18% 76% 40%',
        cursor: 'pointer',
        alignItems: 'center',
      }}
    >
      <S.FlexAlignCenter>
        <img src={item.src} alt={item.title} width={48} />
      </S.FlexAlignCenter>
      <S.FlexColumn>
        <S.RowText style={{ color: '#000000', fontWeight: 500 }}>
          {item.title}
        </S.RowText>
        <S.RowSubText>{item.subtext}</S.RowSubText>
      </S.FlexColumn>
      <ArrowForwardIosIcon />
    </S.Row>
  );
};

export default WithdrawalItem;
