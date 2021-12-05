import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { ShoppingCart } from '@styled-icons/material/ShoppingCart';

import { CURRENT_USER_QUERY } from './User';

const CartButton = styled.button`
  cursor: pointer;
  position: absolute;
  right: 15px;
  bottom: 15px;
  background: var(--blue);
  border: none;
  border-radius: 50px;
  padding: 10px;
`;

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <CartButton type="button" disabled={loading} onClick={addToCart}>
      <ShoppingCart size="18" color="#fff" title="Koszyk" />
    </CartButton>
  );
}
