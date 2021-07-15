import React from 'react';
import { IPlaidAccount } from 'entities/plaidAccount';
import * as S from './styles';

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
        <S.BankImg
          alt="logo"
          src={item.plaidInfo.institution_logo}
          backgroundColor={
            item.plaidInfo.institution_primary_color
              ? `#${item.plaidInfo.institution_primary_color}`
              : 'white'
          }
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <S.Text color="black" fontSize="16px" fontWeight={600}>
          {item.plaidInfo.metadata.institution.name}
        </S.Text>
        <S.Text color="#9e9e9e" fontSize="16px" fontWeight={500}>
          xxxx{item.plaidInfo.metadata.account.mask}
        </S.Text>
      </div>
    </div>
  );
};

AchAccountInfoBox.displayName = 'AchAccountInfoBox';

export default AchAccountInfoBox;
