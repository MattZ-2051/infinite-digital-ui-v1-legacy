import React, { useEffect, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import MuiSnackbar from '@material-ui/core/Snackbar';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearError } from 'store/session/sessionSlice';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = () => {
  const errorMessage = useAppSelector((state) => state.session.error);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setTimeout(() => dispatch(clearError()), 300);
  };

  useEffect(() => {
    if (errorMessage) {
      setOpen(true);
    }
  }, [errorMessage]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity="error" onClose={handleClose}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

const Snackbar = styled(MuiSnackbar)`
  z-index: 1550;
`;

export default Notification;
