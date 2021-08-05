import { ReactText } from 'react';
import { toast } from 'react-toastify';

const success = (message, toastId?: string) =>
  toast.success(<>{message}</>, { toastId });
const error = (message, toastId?: string) =>
  toast.error(<>{message}</>, { toastId });
const dark = (message, toastId?: string) =>
  toast.dark(<>{message}</>, { toastId });
const warning = (message, toastId?: string) =>
  toast.warning(<>{message}</>, { toastId });

const dismiss = (toastId: 'string' | ReactText): void => toast.dismiss(toastId);

export default { success, error, warning, dark, dismiss };
