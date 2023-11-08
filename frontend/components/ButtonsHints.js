import { ShoppingBag, Person, Favorite } from '@styled-icons/material';
import styled from 'styled-components';
import SignOut from './SignOut';

import { useUser } from './User';

const Container = styled.div`
  position: absolute;
  top: 40px;
  z-index: 1;
  transition: all 0.2s ease 0s;
  left: auto;
  right: 0px;
  border: 1px solid var(--lightBlack);
  border-radius: 3px;
  width: 340px;
  min-height: 130px;
  background: #fff;
  padding: 10px;
`;

const Hello = styled.h3`
  padding: 10px;
  text-align: center;
  color: var(--blue);
`;

const ButtonsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 10px;
  margin-bottom: 10px;
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
`;

const Box = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: center;
  border-top: 1px solid var(--lightBlack);
  padding: 5px;
  .box-title {
    a {
      text-decoration: none;
      color: var(--blue);
      position: relative;
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -2px;
        left: 0;
        right: 0;
        margin: 0 auto;
        background-color: var(--blue);
        visibility: hidden;
        transform: scaleX(0);
        transition: all 0.2s ease-in-out 0s;
      }
      &:hover:before {
        visibility: visible;
        transform: scaleX(1);
      }
    }
  }
`;

export default function ButtonsHints({
  className,
  onMouseEnter,
  onFocus,
  onMouseLeave,
  setModule,
}) {
  const user = useUser();

  const handleLogin = (e) => {
    setModule(e.target.name);
  };
  return (
    <Container
      className={className}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onMouseLeave={onMouseLeave}
    >
      {user ? (
        <>
          <Hello>Dzień dobry, {user.name}</Hello>
          <ButtonsContainer>
            <SignOut />
          </ButtonsContainer>
          <Box>
            <Person size="24" color="var(--blue)" title="Profil" />
            <div className="box-title">
              <a>Profil</a>
            </div>
          </Box>
          <Box>
            <Favorite size="24" color="var(--blue)" title="Profil" />
            <div className="box-title">
              <a>Ulubione</a>
            </div>
          </Box>
          <Box>
            <ShoppingBag size="24" color="var(--blue)" title="Profil" />
            <div className="box-title">
              <a>Zamówienia</a>
            </div>
          </Box>
        </>
      ) : (
        <>
          <Hello>Dzień dobry, Piękności !!!</Hello>
          <ButtonsContainer>
            <Button name="login" onClick={handleLogin}>
              Zaloguj się
            </Button>
            <Button name="register" onClick={handleLogin} color="var(--white)">
              Rejestracja
            </Button>
          </ButtonsContainer>
        </>
      )}
    </Container>
  );
}
