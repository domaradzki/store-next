import styled from 'styled-components';
import Registration from './Registration';
import SignIn from './SignIn';
import SignOut from './SignOut';

import { useUser } from './User';

const Container = styled.div`
  position: fixed;
  top: calc(100vh / 2 - 100px);
  left: calc(100vw / 2 - 170px);
  z-index: 1;
  transition: all 0.2s ease 0s;
  border: 1px solid var(--lightBlack);
  border-radius: 3px;
  width: 340px;
  min-height: 130px;
  background: #fff;
  padding: 10px;
`;

export default function LoginRegisterModule({ module }) {
  const user = useUser();
  console.log(module);

  return (
    <Container>
      {module === 'login' && <SignIn />}
      {module === 'register' && <Registration />}
    </Container>
  );
}
