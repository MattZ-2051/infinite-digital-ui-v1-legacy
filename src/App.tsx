import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyle from 'styles/globalStyles';
import AppLayout from './layouts/AppLayout';
import Router from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './utils/Toast/styles.css';

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <GlobalStyle />
      <AppLayout>
        <>
          <Router />
          <ToastContainer
            hideProgressBar={true}
            toastClassName="custom-notify"
          />
        </>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
