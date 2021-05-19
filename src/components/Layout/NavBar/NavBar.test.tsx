import '../../../../jest/matchMedia.mock';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './index';

describe('<NavBar />', () => {
  const wrapper = (isSmall: boolean) => {
    return (
      <BrowserRouter>
        <NavBar isSmall={isSmall} />
      </BrowserRouter>
    );
  };

  test('should display the drawer button in small screen', async () => {
    render(wrapper(true));
    expect(screen.getByTestId('navbar_toggle-drawer')).toBeVisible();
  });

  test('toggle the drawer', async () => {
    render(wrapper(true));
    const drawerBtn = screen.getByTestId('navbar_toggle-drawer');
    expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();

    fireEvent.click(drawerBtn);
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
  });
});
