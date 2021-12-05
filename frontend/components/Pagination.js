import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';

import { perPage } from '../config';
import ErrorMessage from './ErrorMessage';
import PaginationStyles from './styles/PaginationStyles';

export const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles data-testid="pagination">
      <Head>
        <title>
          Gruby Warkocz - Strona {page} z {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Poprzednia</a>
      </Link>
      <p>
        Strona {page} z <span data-testid="pageCount"> {pageCount}</span>
      </p>
      <p>Razem {count} produktów</p>

      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Następna →</a>
      </Link>
    </PaginationStyles>
  );
}
