import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyle from 'styles/globalStyles';
import AppLayout from './layouts/AppLayout';
import Router from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './utils/Toast/styles.css';
import ScrollToTop from 'components/ScrollToTop';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Footer from 'components/Layout/Footer';
import { useState } from 'react';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'PlusJakartaSans, sans-serif',
  },
});

const App = (): JSX.Element => {
  const [footerBackground, setFooterBackground] = useState<'green' | 'black'>(
    'black'
  );
  return (
    <>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <AppLayout>
          <>
            <Router setFooterBackground={setFooterBackground} />
            <ToastContainer
              hideProgressBar={true}
              toastClassName="custom-notify"
            />
            <Footer footerBackgroundTheme={footerBackground} />
          </>
        </AppLayout>
      </ThemeProvider>
    </>
  );
};

export default App;
