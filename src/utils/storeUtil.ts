import Toast from './Toast';

export const showErrorToast = (message) => {
  return Toast.error(message);
};

export const checkStatePending = (state) => {
  if (state.loading === 'pending') {
    state.loading = 'idle';
  }
};
