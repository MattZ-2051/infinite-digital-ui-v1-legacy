import React from 'react';
import { IPlaidAccount } from 'entities/plaidAccount';

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
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
      </div>
    </div>
  );
};

AchAccountInfoBox.displayName = 'AchAccountInfoBox';

export default AchAccountInfoBox;
