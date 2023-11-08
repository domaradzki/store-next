import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const Button = styled.button`
  width: auto;
  background: ${({ color }) => color || 'var(--blue)'};
  color: ${({ color }) => (color ? 'var(--blue)' : 'var(--white)')};
  border: 2px solid var(--blue);
  font-size: 1.5rem;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
`;
export default function SignOut() {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <Button type="button" onClick={signout}>
      Wyloguj się
    </Button>
  );
}
