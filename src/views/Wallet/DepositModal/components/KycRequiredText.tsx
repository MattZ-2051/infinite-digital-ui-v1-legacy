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
        <>wait until we validate your identity.</>
      ) : (
        <>validate your identity.</>
      )}
    </>
  );
};

export default KycRequiredText;
