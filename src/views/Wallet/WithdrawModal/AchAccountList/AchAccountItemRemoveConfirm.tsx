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
<<<<<<< HEAD
        alignItems: 'center',
        paddingTop: '100px',
=======
        // justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
>>>>>>> integration
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
<<<<<<< HEAD
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
=======
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
>>>>>>> integration
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
<<<<<<< HEAD
=======
          flex: 1,
>>>>>>> integration
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
