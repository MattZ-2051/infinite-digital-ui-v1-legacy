import React from 'react';
import { IPlaidAccount } from 'entities/plaidAccount';
import CloseIcon from '@material-ui/icons/Close';
import * as S from '../styles';
import { PulseLoader } from 'react-spinners';

interface IAchAccountItemRemoveConfirmProps {
  onCancel?: () => any;
  onConfirm?: () => Promise<void>;
  item: IPlaidAccount;
}

const AchAccountItemRemoveConfirm = ({
  onCancel,
  onConfirm,
}: IAchAccountItemRemoveConfirmProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <CloseIcon style={{ color: 'red', fontSize: 40 }} />
        <span style={{ fontWeight: 600, fontSize: 22 }}>Delete Account?</span>
      </div>
      <p
        style={{
          flex: 1,
          paddingLeft: 10,
          paddingRight: 10,
          marginBottom: 32,
          marginTop: 55,
          textAlign: 'center',
          color: '#888888',
        }}
      >
        Lorem ipsum dolor sit amet, consectetur dolor sit ametadipiscing elit.
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
        <S.StyledLoadingButton
          type="button"
          onClick={onConfirm}
          loadingComponentRender={() => <PulseLoader color="white" />}
        >
          Yes
        </S.StyledLoadingButton>
        <S.NoButton type="button" onClick={onCancel}>
          No
        </S.NoButton>
      </div>
    </div>
  );
};

AchAccountItemRemoveConfirm.displayName = 'AchAccountItemRemoveConfirm';

export default AchAccountItemRemoveConfirm;
