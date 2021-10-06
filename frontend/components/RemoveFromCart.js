import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

const REMOVE_FROM_MUTATION = gql`
  mutation REMOVE_FROM_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--blue);
    cursor: pointer;
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <BigButton
      disabled={loading}
      type="button"
      title="Remove this item from cart"
      onClick={removeFromCart}
    >
      &times;
    </BigButton>
  );
}
