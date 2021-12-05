import { useRouter } from 'next/router';
import styled from 'styled-components';

import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <Container>
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </Container>
  );
}
