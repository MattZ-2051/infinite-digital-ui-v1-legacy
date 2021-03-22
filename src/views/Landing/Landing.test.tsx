import '../../../jest/matchMedia.mock';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import store from 'store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Landing from './index';
import { getListings } from '../../services/api/listingService';
import { getDropBoxes } from '../../services/api/dropBoxService';

jest.mock('../../services/api/listingService');
jest.mock('../../services/api/dropBoxService');

describe('<Landing />', () => {
  const setup = () =>
    act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Landing />
          </BrowserRouter>
        </Provider>
      );
    });

  const listingMock = {
    data: [
      {
        price: 4237,
        product: {
          sku: {
            name: 'ProductName',
            imageUrls: ['https://place-puppy.com/300x300'],
          },
        },
      },
    ],
  };

  const dropBoxesMock = {
    data: [
      {
        price: 4238,
        config: {
          name: 'DropBoxName'
        }
      },
    ],
  };

  test('display the initial requested and stored data', async () => {
    // getListings.mockResolvedValue(Promise.resolve(fakeData));
    getListings.mockImplementation(async () => {
      return listingMock;
    });

    getDropBoxes.mockImplementation(async () => {
      return dropBoxesMock;
    });

    await setup();
    expect(screen.getByText('ProductName')).toBeVisible();
    expect(screen.getByText('DropBoxName')).toBeVisible();
  });
});
