import React from 'react';
import { IPlaidAccount } from 'entities/plaidAccount';
<<<<<<< HEAD
import * as S from './styles';
=======
>>>>>>> integration

interface IAchAccountInfoBoxProps {
  item: IPlaidAccount;
}

const AchAccountInfoBox = ({ item }: IAchAccountInfoBoxProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
<<<<<<< HEAD
        <S.BankImg
          alt="logo"
          src={item.plaidInfo.institution_logo}
          backgroundColor={
            item.plaidInfo.institution_primary_color
              ? `#${item.plaidInfo.institution_primary_color}`
              : 'white'
          }
=======
        <img
          alt="logo"
          src={item.plaidInfo.institution_logo}
          style={{
            backgroundColor: item.plaidInfo.institution_primary_color
              ? `#${item.plaidInfo.institution_primary_color}`
              : 'white',
            borderRadius: '100%',
            height: 48,
            marginRight: 25,
          }}
>>>>>>> integration
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
<<<<<<< HEAD
        <S.Text color="black" fontSize="16px" fontWeight={600}>
          {item.plaidInfo.metadata.institution.name}
        </S.Text>
        <S.Text color="#9e9e9e" fontSize="16px" fontWeight={500}>
          xxxx{item.plaidInfo.metadata.account.mask}
        </S.Text>
=======
        <span
          style={{
            color: '#000000',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {item.plaidInfo.metadata.institution.name}
        </span>
        <span
          style={{
            fontSize: 16,
            color: '#9e9e9e',
          }}
        >
          xxxx{item.plaidInfo.metadata.account.mask}
        </span>
>>>>>>> integration
      </div>
    </div>
  );
};

AchAccountInfoBox.displayName = 'AchAccountInfoBox';

export default AchAccountInfoBox;
