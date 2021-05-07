import { toast } from 'react-toastify';

const success = (message) => toast.success(<>{message}</>);
const error = (message) => toast.error(<>{message}</>);
const dark = (message) => toast.dark(<>{message}</>);
const warning = (message) => toast.warning(<>{message}</>);

export default { success, error, warning, dark };
