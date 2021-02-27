import React from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "styles/globalStyles";
import { useAppSelector, useAppDispatch } from "hooks/store";
import { increment } from "store/global/globalSlice";
import AppLayout from "./layouts/AppLayout";
import Router from "./router";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  dispatch(increment());

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
