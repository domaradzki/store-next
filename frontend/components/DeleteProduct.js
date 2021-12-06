import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const DeleteButton = styled.button`
  cursor: pointer;
`;

function update(cache, payload) {
  console.log(payload);
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <DeleteButton
      type="DeleteButton"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete the product')) {
          // console.log('delete');
          deleteProduct().catch((err) => alert(err));
        }
      }}
    >
      {children}
    </DeleteButton>
  );
}
