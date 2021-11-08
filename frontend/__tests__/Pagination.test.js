import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';
import { makePaginationMocksFor } from '../lib/testUtils';

describe('<Pagination />', () => {
  it('Displays a loading message', () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination />
      </MockedProvider>
    );
    expect(container).toHaveTextContent('Loading...');
  });
  it('Renders pagination for 18 items', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    expect(container).toHaveTextContent('Loading...');
    await screen.findByTestId('pagination');
    // debug();
    expect(container).toHaveTextContent('Page 1 of 5');
    const pageCountSpan = screen.getByTestId('pageCount');
    expect(pageCountSpan).toHaveTextContent('5');
    expect(container).toMatchSnapshot();
  });
  it('Disable the prev page on first page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(12)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText('← Prev');
    const nextButton = screen.getByText('Next →');
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
  it('Disable the next page on last page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(12)}>
        <Pagination page={3} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText('← Prev');
    const nextButton = screen.getByText('Next →');
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  });
  it('Enable pages on middle page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(12)}>
        <Pagination page={2} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText('← Prev');
    const nextButton = screen.getByText('Next →');
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
});
