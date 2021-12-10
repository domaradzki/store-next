import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import {
  FavoriteBorder,
  Favorite as FavoriteFull,
} from '@styled-icons/material';
import { CURRENT_USER_QUERY, useUser } from './User';

const UPDATE_USER_FAVORITE_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION($id: ID!) {
    toggleFavorite(productId: $id) {
      id
    }
  }
`;

const Container = styled.div`
  position: absolute;
  cursor: pointer;
  right: 8px;
  top: 5px;
`;

const Favorite = ({ id = '' }) => {
  const user = useUser();
  const [toggleFavorite, { loading }] = useMutation(
    UPDATE_USER_FAVORITE_MUTATION,
    {
      variables: { id },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  const { favorite } = user;
  const isFavorite = favorite.map((item) => item.product.id).includes(id);
  return (
    <Container disabled={loading} onClick={toggleFavorite}>
      {isFavorite ? (
        <FavoriteFull size="22" title="ulubione" color="#23263B" />
      ) : (
        <FavoriteBorder size="22" title="ulubione" color="#23263B" />
      )}
    </Container>
  );
};

export default Favorite;
