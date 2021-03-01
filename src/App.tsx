import React from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "styles/globalStyles";
import AppLayout from "./layouts/AppLayout";
import Router from "./router";

const App: React.FC = () => {
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
