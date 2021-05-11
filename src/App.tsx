import { BrowserRouter } from 'react-router-dom';
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

const theme = createMuiTheme({
  typography: {
    fontFamily: 'PlusJakartaSans, sans-serif',
  },
});

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
