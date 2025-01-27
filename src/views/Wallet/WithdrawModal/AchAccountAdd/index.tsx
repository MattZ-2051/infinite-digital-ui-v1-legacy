import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import BillingFormForAch, {
  IBillingForAch,
  validate as validateBilling,
} from 'components/BillingFormForAch';
import PlaidRegister from './PlaidRegister';
import { getPlaidLinkToken } from 'services/api/walletService';
import { useAuth0 } from '@auth0/auth0-react';
import { PulseLoader } from 'react-spinners';
import * as S from '../styles';
import * as S2 from '../styles';

interface IAchAccountAddProps {
  onSuccess: (IPlaidAccount) => any;
  onError: (Error) => any;
  onCancel: () => any;
}

const initialBillingState = {
  name: '',
  city: '',
  country: null,
  district: null,
  line1: '',
  line2: '',
  postalCode: '',
  phone: '',
  email: '',
};

const AchAccountAdd = ({
  onSuccess,
  onError,
  onCancel,
}: IAchAccountAddProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const [valueLinkToken, setLinkToken] = useState<string>('');
  const [valueBilling, setBilling] =
    useState<IBillingForAch>(initialBillingState);
  const [valueBillingSubmitted, setBillingSubmitted] =
    useState<IBillingForAch | null>(null);
  const [valueFormSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [valueError, setError] = useState<Error | null>(null);
  const [valueIsAdding, setIsAdding] = useState<boolean>(false);
  const billingErrors = validateBilling(valueBilling);
  const isBillingWithError = Object.values(billingErrors).some(Boolean);
  const loggedInUser = useAppSelector((state) => state.session.user);

  useEffect(() => {
    setBilling((prev) => ({ ...prev, email: loggedInUser.email }));
  }, [loggedInUser.email]);

  const resetState = () => {
    setLinkToken('');
    setFormSubmitted(false);
    setBilling(initialBillingState);
    setBillingSubmitted(null);
  };

  const registerOnError = useCallback((err) => {
    resetState();
    setIsAdding(false);
    setError(err);
  }, []);
  const registerOnSuccess = useCallback((arg) => {
    resetState();
    setIsAdding(false);
    onSuccess(arg);
  }, []);
  const registerOnExitPlaid = useCallback(() => {
    setIsAdding(false);
    setBillingSubmitted(null);
  }, []);

  if (valueIsAdding) {
    return (
      <>
        {valueBillingSubmitted && valueLinkToken && (
          <PlaidRegister
            linkToken={valueLinkToken}
            billing={valueBillingSubmitted}
            email={loggedInUser.email}
            onError={registerOnError}
            onSuccess={registerOnSuccess}
            onExit={registerOnExitPlaid}
          />
        )}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <PulseLoader size={20} />
          <p>Connecting to Plaid</p>
        </div>
      </>
    );
  }
  if (valueError) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <span
          style={{
            fontSize: 22,
            textAlign: 'center',
            lineHeight: '28px',
            fontWeight: 600,
          }}
        >
          {String.fromCodePoint(...[9888, 65039])} Whoops, something went wrong.
        </span>
        <p style={{ textAlign: 'center', color: '#7D7D7D' }}>
          There was an issue processing your request. Please try again or visit
          the <Link to="/help">Help Page</Link> if this issue persists.{' '}
        </p>
        <S2.Button
          type="button"
          style={{ width: '100%' }}
          onClick={() => {
            setError(null);
            onError(valueError?.message);
          }}
        >
          Try Again
        </S2.Button>
      </div>
    );
  }
  return (
    <>
      <div>
        <S.Header>Add new bank account</S.Header>
        <S.GrayLine style={{ width: '100%' }} />
      </div>
      <p style={{ color: '#7D7D7D' }}>
        Complete this form to add a new bank account.
      </p>
      <BillingFormForAch
        showValidations={valueFormSubmitted}
        validation={billingErrors}
        onChange={setBilling}
        value={valueBilling}
        extraProps={{
          name: {
            label: 'Account holder name',
          },
        }}
        style={{ padding: 'initial', marginBottom: 40 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <S.Button
          style={{
            width: '100%',
          }}
          type="button"
          onClick={async () => {
            setFormSubmitted(true);
            if (isBillingWithError) {
              return;
            }
            setIsAdding(true);
            setBillingSubmitted(valueBilling);
            let linkTokenIn;
            let err;
            try {
              linkTokenIn = await getPlaidLinkToken(
                await getAccessTokenSilently()
              );
            } catch (error) {
              err = error;
            }
            if (err) {
              onError(err);
              setIsAdding(false);
            } else {
              setLinkToken(linkTokenIn.linkToken);
            }
          }}
          disabled={valueIsAdding}
        >
          Confirm
        </S.Button>
        <S.SubButton type="button" onClick={onCancel}>
          Go Back
        </S.SubButton>
      </div>
    </>
  );
};

AchAccountAdd.displayName = 'AchAccountAdd';

export default AchAccountAdd;
