import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestReset, {
  REQEST_RESET_MUTATION,
} from '../components/RequestReset';

const email = 'testing@gmail.com';
const mocks = [
  // Mutation Mock
  {
    request: {
      query: REQEST_RESET_MUTATION,
      variables: { email },
    },
    result: {
      data: {
        sendUserPasswordResetLink: null,
      },
    },
  },
];

describe('<RequestReset />', () => {
  it('Renders and matches snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('calls the mutations when submited', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );
    // type into the mail box
    userEvent.type(screen.getByPlaceholderText(/email/i), email);
    // click submit
    userEvent.click(screen.getByText(/Request Reset!/));
    const success = await screen.findByText(/Success/i);
    expect(success).toBeInTheDocument();
  });
});
