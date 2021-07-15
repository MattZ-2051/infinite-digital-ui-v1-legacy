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
        alignItems: 'center',
        paddingTop: '100px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingBottom: '20px',
        }}
      >
        <CloseIcon style={{ color: 'red', fontSize: 40 }} />
        <S.Text fontWeight={600} fontSize="22px" color="black">
          Delete Account?
        </S.Text>
      </div>
      <S.Text
        fontSize="16px"
        color="#888888"
        fontWeight={500}
        textAlign="center"
        padding="0 0 28px 0"
      >
        Are you sure you want to delete this account?{' '}
      </S.Text>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
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
