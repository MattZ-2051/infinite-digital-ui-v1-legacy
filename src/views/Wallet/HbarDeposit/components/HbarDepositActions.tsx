import { ActionButton } from '../styles';

interface IHbarDepositActions {
  paymentsChecked: boolean;
  handleCheck: () => void;
  handleBackToWallet: () => void;
}

const HbarDepositActions = ({
  paymentsChecked,
  handleCheck,
  handleBackToWallet,
}: IHbarDepositActions): JSX.Element => {
  return (
    <>
      <ActionButton onClick={handleCheck}>
        Check for new HBAR deposits
      </ActionButton>
      {paymentsChecked && (
        <ActionButton className="button__text" onClick={handleBackToWallet}>
          Back to Wallet
        </ActionButton>
      )}
    </>
  );
};

export default HbarDepositActions;
