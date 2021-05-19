import React from 'react';
import '../jest/matchMedia.mock';
import { Provider } from 'react-redux';
import store from 'store';
import { render } from '@testing-library/react';
import App from './App';

test('renders <App /> without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
