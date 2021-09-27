import styled from 'styled-components';
import Registration from '../components/Registration';
import SignIn from '../components/SignIn';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1px));
  grid-gap: 2rem;
`;

export default function SignInPage() {
  return (
    <Grid>
      <SignIn />
      <Registration />
    </Grid>
  );
}
