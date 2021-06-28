import Toast from 'utils/Toast';
import { Link } from 'react-router-dom';

export const insuficientFounds = (userBalance, priceWithFee, history) => {
  Toast.error(
    <>
      Whoops, insufficient funds! Your available balance is ${userBalance} and
      you need ${priceWithFee} to cover the bid and marketplace fee. Click{' '}
      <a onClick={() => history.push('/wallet')}>click here</a> to deposit more
      funds.
    </>
  );
};

export const bidIsEmpty = () => {
  Toast.error(`Whoops, you forgot to write your bid!`);
};

export const higherBidNeeded = (bidIncrement) => {
  Toast.error(
    `Whoops, new bids must be at least $${bidIncrement} greater than the current highest bid.`
  );
};

export const loginWarning = (loginWithRedirect) => {
  return Toast.warning(
    <>
      You need to{' '}
      <a onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Log in</a>{' '}
      in order to complete the purchase
    </>
  );
};

export const repeatedListingError = () => {
  return Toast.error(
    <>
      Another active or upcoming sale listing for this product already exists.
      Please <Link to="/help">contact support</Link> if you believe this is an
      error
    </>
  );
};

export const needToSignUp = (loginWithRedirect) => {
  return Toast.warning(
    <>
      You need to{' '}
      <a onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Log in</a>{' '}
      in order to complete the purchase
    </>
  );
};
