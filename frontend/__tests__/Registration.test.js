import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { email } from 'casual';
import { fakeUser } from '../lib/testUtils';

import Registration, {
  REGISTRATION_MUTATION,
} from '../components/Registration';
import { CURRENT_USER_QUERY } from '../components/User';

const me = fakeUser();

const mocks = [
  // Mutation Mock
  {
    request: {
      query: REGISTRATION_MUTATION,
      variables: { name: me.name, email: me.email, password: 'git' },
    },
    result: {
      data: {
        creaAteUser: {
          __typeName: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // Current user Mock
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        authenticatedItem: me,
      },
    },
  },
];

describe('<Registration />', () => {
  it('Renders and matches snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Registration />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('Renders and matches snapshot', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <Registration />
      </MockedProvider>
    );
    await userEvent.type(screen.getByPlaceholderText(/name/i), me.name);
    await userEvent.type(screen.getByPlaceholderText(/email/i), me.email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'git');
    // click submit
    await userEvent.click(screen.getByText('Register!'));
  });
});
