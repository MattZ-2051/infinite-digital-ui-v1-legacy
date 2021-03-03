import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from 'styles/globalStyles';
import AppLayout from './layouts/AppLayout';
import Router from './router';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppLayout>
        <Router />
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
