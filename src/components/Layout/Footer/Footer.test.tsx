import '../../../../jest/matchMedia.mock';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './index';

test('renders <Footer /> without crashing', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  expect(screen.getByText('FAQ')).toBeVisible();
  expect(screen.getByText('Help')).toBeVisible();
  expect(screen.getByText('Thanks')).toBeVisible();
  expect(screen.getByText('Privacy Policy')).toBeVisible();
  expect(screen.getByText('Terms & Conditions')).toBeVisible();
});
