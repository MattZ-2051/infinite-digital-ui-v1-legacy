import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyle from 'styles/globalStyles';
import AppLayout from './layouts/AppLayout';
import Router from './router';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <GlobalStyle />
      <AppLayout>
        <Router />
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
