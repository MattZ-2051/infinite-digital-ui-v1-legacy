import Toast from 'utils/Toast';
import { useKycClient } from 'hooks/useKycClient';

interface IProps {
  kycPending: boolean;
}

const KycRequiredText = ({ kycPending }: IProps) => {
  const kycClient = useKycClient();

  return (
    <>
      To deposit cryptocurrency, please{' '}
      {kycPending ? (
        <>wait until we validate your identity</>
      ) : (
        <>
          <a onClick={() => kycClient?.open()}>click here</a> complete the
          required account validation steps.{' '}
          <a href="https://support.suku.world/infinite/how-does-kyc-work">
            Learn more.
          </a>
        </>
      )}
    </>
  );
};

export default KycRequiredText;
