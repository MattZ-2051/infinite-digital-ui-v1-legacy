import Toast from 'utils/Toast';
import { Link } from 'react-router-dom';

export const insuficientFounds = (userBalance, priceWithFee, history) => {
  Toast.error(
    <>
      Whoops, insufficient funds! Your available balance is ${userBalance} and
      you need ${priceWithFee} to cover the bid and marketplace fee. Click{' '}
      <a
        onClick={() =>
          history.push({
            pathname: `/wallet`,
            state: { modalOpen: true },
          })
        }
      >
        click here
      </a>{' '}
      to deposit more funds.
    </>
  );
};

export const bidIsEmpty = () => {
  Toast.error(
    `Whoops! Please let us know how much you'd like to bid for this collectible. `
  );
};

export const higherBidNeeded = (bidIncrement) => {
  Toast.error(
    'Whoops! Your bid amount is lower than the current highest bid. Please place a higher bid to participate in this auction. '
  );
};

export const loginWarning = (loginWithRedirect) => {
  return Toast.warning(
    <>
      Please <a onClick={() => loginWithRedirect()}>sign in</a> to complete your
      purchase.
    </>
  );
};

export const loginWarningClaim = (loginWithRedirect) => {
  return Toast.warning(
    <>
      You need to be <a onClick={() => loginWithRedirect()}>logged in</a> in
      order to claim.
    </>
  );
};

export const repeatedListingError = () => {
  return Toast.error(
    <>
      Another active or upcoming sale listing for this collectible already
      exists. Please <Link to="/help">contact support</Link> if you believe this
      is an error.
    </>
  );
};

export const needToSignUp = loginWarning;

export const showStatusBarWarningMessage = (message) => {
  return Toast.warning(message);
};
