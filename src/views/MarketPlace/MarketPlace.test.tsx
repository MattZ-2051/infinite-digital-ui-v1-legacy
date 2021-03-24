import '../../../jest/matchMedia.mock';
import { getByTestId, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import store from 'store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MarketPlace from 'views/MarketPlace';

// describe('<MarketPlace />', () => {
//   const { debug, getByTestId } = render(<MarketPlace />)



//   test('renders search bar filter', () => {
//     expect(true).toBeTruthy();
//     console.log(debug())
//   })
// });
